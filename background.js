const SESSION_KEY = 'fgt_global_session';
const SESSION_ALARM = 'fgt_session_heartbeat';
const SIDEBAR_MENU_ID = 'fgt-open-sidebar';

function defaultSessionState() {
  const now = Date.now();
  return {
    startedAt: now,
    totalMs: 0,
    isTracking: false,
    lastTick: now,
    lastUpdatedAt: now,
  };
}

async function getSessionState() {
  try {
    const data = await chrome.storage.local.get([SESSION_KEY]);
    const stored = data && data[SESSION_KEY];
    if (!stored || typeof stored !== 'object') return defaultSessionState();
    return {
      startedAt: Number(stored.startedAt) || Date.now(),
      totalMs: Number(stored.totalMs) || 0,
      isTracking: !!stored.isTracking,
      lastTick: Number(stored.lastTick) || Date.now(),
      lastUpdatedAt: Number(stored.lastUpdatedAt) || Date.now(),
    };
  } catch {
    return defaultSessionState();
  }
}

async function saveSessionState(nextState) {
  try {
    await chrome.storage.local.set({ [SESSION_KEY]: nextState });
  } catch {
    // ignore storage failures
  }
}

async function shouldTrackActiveBrowsing() {
  try {
    const win = await chrome.windows.getLastFocused({ populate: true });
    if (!win || !win.focused || !Array.isArray(win.tabs)) return false;
    const activeTab = win.tabs.find((tab) => tab && tab.active);
    if (!activeTab) return false;
    const url = String(activeTab.url || activeTab.pendingUrl || '');
    if (!url) return false;
    return /^https?:\/\//i.test(url) || /^chrome:\/\/newtab/i.test(url);
  } catch {
    return false;
  }
}

async function tickSessionTracking() {
  const now = Date.now();
  const state = await getSessionState();
  const shouldTrack = await shouldTrackActiveBrowsing();
  const elapsed = Math.max(0, now - (Number(state.lastTick) || now));
  const next = {
    ...state,
    lastTick: now,
    lastUpdatedAt: now,
    isTracking: shouldTrack,
  };
  if (shouldTrack) {
    next.totalMs = (Number(state.totalMs) || 0) + elapsed;
  }
  await saveSessionState(next);
}

async function ensureSessionAlarm() {
  try {
    const existing = await chrome.alarms.get(SESSION_ALARM);
    if (!existing) {
      chrome.alarms.create(SESSION_ALARM, { periodInMinutes: 1 });
    }
  } catch {
    // ignore
  }
}

async function openSidebar(windowId) {
  if (!chrome.sidePanel) return;
  try {
    await chrome.sidePanel.setOptions({
      enabled: true,
      path: 'newtab.html',
    });
    await chrome.sidePanel.open({ windowId });
  } catch {
    // ignore
  }
}

async function openSidebarForCurrentWindow() {
  try {
    const win = await chrome.windows.getCurrent();
    if (!win || typeof win.id !== 'number') return;
    await openSidebar(win.id);
  } catch {
    // ignore
  }
}

let bootstrapPromise = null;

function bootstrapExtension() {
  // Guard against concurrent invocations: onInstalled, onStartup, and the
  // unconditional call at the bottom of this file can all fire in the same
  // script tick (e.g. right when the service worker starts). Without this
  // guard, two overlapping runs both call contextMenus.removeAll() then
  // contextMenus.create() and race each other, which is what produced the
  // "duplicate id fgt-open-sidebar" error. Sharing one in-flight promise
  // means every caller waits on the same single setup run.
  if (bootstrapPromise) return bootstrapPromise;

  bootstrapPromise = (async () => {
    await ensureSessionAlarm();
    await tickSessionTracking();

    if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
      try {
        await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
      } catch {
        // ignore
      }
    }

    if (chrome.contextMenus) {
      try {
        await chrome.contextMenus.removeAll();
        await new Promise((resolve) => {
          chrome.contextMenus.create(
            {
              id: SIDEBAR_MENU_ID,
              title: 'Open Fusion Sidebar',
              contexts: ['page', 'action', 'selection', 'link'],
            },
            () => {
              // Explicitly read chrome.runtime.lastError so Chrome doesn't
              // log it as "Unchecked runtime.lastError". A duplicate-id
              // failure here is harmless (the item already exists from an
              // earlier run) so there's nothing else to do with it.
              void chrome.runtime.lastError;
              resolve();
            }
          );
        });
      } catch {
        // ignore
      }
    }
  })();

  return bootstrapPromise;
}

chrome.runtime.onInstalled.addListener(() => {
  void bootstrapExtension();
});

chrome.runtime.onStartup.addListener(() => {
  void bootstrapExtension();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (!alarm || alarm.name !== SESSION_ALARM) return;
  void tickSessionTracking();
});

chrome.tabs.onActivated.addListener(() => {
  void tickSessionTracking();
});

chrome.tabs.onUpdated.addListener(() => {
  void tickSessionTracking();
});

chrome.windows.onFocusChanged.addListener(() => {
  void tickSessionTracking();
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-sidebar') {
    void openSidebarForCurrentWindow();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info || info.menuItemId !== SIDEBAR_MENU_ID) return;
  if (tab && typeof tab.windowId === 'number') {
    void openSidebar(tab.windowId);
    return;
  }
  void openSidebarForCurrentWindow();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message !== 'object') return;
  if (message.type === 'fgt-open-sidebar') {
    const winId = sender && sender.tab ? sender.tab.windowId : undefined;
    if (typeof winId === 'number') {
      void openSidebar(winId);
    } else {
      void openSidebarForCurrentWindow();
    }
    sendResponse({ ok: true });
    return;
  }
  if (message.type === 'fgt-get-global-session') {
    getSessionState().then((state) => sendResponse({ ok: true, state })).catch(() => sendResponse({ ok: false }));
    return true;
  }
});

void bootstrapExtension();

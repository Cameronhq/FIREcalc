type EventName =
  | "page_view"
  | "onboarding_start"
  | "onboarding_step"
  | "onboarding_complete"
  | "result_view"
  | "result_cta_click"
  | "dashboard_view"
  | "dashboard_model_change"
  | "dashboard_param_change"
  | "pro_paywall_view"
  | "pro_paywall_cta_click"
  | "pro_paywall_dismiss"
  | "pro_waitlist_submit"
  | "result_share"
  | "nav_click";

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

const EVENT_LOG: Array<{ event: EventName; payload: EventPayload; ts: number }> = [];

export function track(event: EventName, payload: EventPayload = {}) {
  const entry = { event, payload, ts: Date.now() };
  EVENT_LOG.push(entry);

  if (typeof window !== "undefined") {
    console.log(
      `%c[FIREPATH] %c${event}`,
      "color: #4ade80; font-weight: bold",
      "color: #fafafa",
      payload
    );

    try {
      const stored = JSON.parse(localStorage.getItem("fp_events") || "[]");
      stored.push(entry);
      localStorage.setItem("fp_events", JSON.stringify(stored.slice(-500)));
    } catch {
      // storage full or unavailable
    }
  }

  // Production: forward to real analytics endpoint
  // sendToServer(entry);
}

export function getStoredEvents() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("fp_events") || "[]");
  } catch {
    return [];
  }
}

export function getProPaywallStats() {
  const events = getStoredEvents();
  const views = events.filter((e: { event: string }) => e.event === "pro_paywall_view").length;
  const clicks = events.filter((e: { event: string }) => e.event === "pro_paywall_cta_click").length;
  return { views, clicks, conversionRate: views > 0 ? (clicks / views * 100).toFixed(1) + "%" : "0%" };
}

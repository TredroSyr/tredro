export const COOKIE_CONSENT_KEY = "cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";

export type ConsentValue = "granted" | "denied" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

// The inline init script in layout.tsx sets this attribute before hydration so
// the banner never flashes for returning visitors; keep it in sync afterwards.
function syncConsentAttribute(known: boolean) {
  if (known) {
    document.documentElement.setAttribute("data-cookie-consent", "known");
  } else {
    document.documentElement.removeAttribute("data-cookie-consent");
  }
}

export function setConsent(value: "granted" | "denied") {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  syncConsentAttribute(true);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

export function clearConsent() {
  window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  syncConsentAttribute(false);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
  };
}

export function getConsentServerSnapshot(): ConsentValue {
  return null;
}

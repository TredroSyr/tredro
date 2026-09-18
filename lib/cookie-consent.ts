export const COOKIE_CONSENT_KEY = "cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";

export type ConsentValue = "granted" | "denied" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

export function setConsent(value: "granted" | "denied") {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

export function clearConsent() {
  window.localStorage.removeItem(COOKIE_CONSENT_KEY);
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

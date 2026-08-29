export class GeoPermissionError extends Error {
  constructor() {
    super("permission-denied");
    this.name = "GeoPermissionError";
  }
}

/** الموقع غير متاح لأن الصفحة مش مفتوحة عبر HTTPS (أو localhost). */
export class GeoInsecureContextError extends Error {
  constructor() {
    super("insecure-context");
    this.name = "GeoInsecureContextError";
  }
}

function assertSecureContext() {
  if (typeof window === "undefined") return;
  // isSecureContext بتكون true لـ https وكمان لـ localhost وقت التطوير
  if (window.isSecureContext === false) {
    throw new GeoInsecureContextError();
  }
}

/** One-shot high-accuracy fix via the browser Geolocation API. Resolves to [lat, lng]. */
export async function getCurrentPosition(): Promise<[number, number]> {
  assertSecureContext();
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    throw new GeoPermissionError();
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
      () => reject(new GeoPermissionError()),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  });
}

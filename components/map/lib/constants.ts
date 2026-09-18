// Falls back to 0px because this repo's phone-mockup preview never defines
// --bottom-nav-height (that variable only exists in the real mandoub app's
// globals.css). Without the fallback, `bottom: var(--bottom-nav-height)`
// is invalid here and drawers lose their bottom anchor entirely.
export const BOTTOM_NAV_H_CSS = "var(--bottom-nav-height, 0px)";
export const PANEL_WIDTH_CLASS =
  "md:inset-x-auto md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2";
export const OVERLAY_Z = "z-[2600]";

export const NAV_H_ESTIMATE = 64;

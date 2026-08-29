"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DayKey,
  DAYS,
  ALEPPO_CENTER,
  distanceKm,
  Shop,
  CustomerListItem,
  INITIAL_SHOPS,
  INITIAL_CUSTOMER_ITEMS,
} from "./lib/tour-data";
import { fetchRoute, RouteResult, bearing as bearingBetween } from "./lib/routing";
import {
  getCurrentPosition,
  GeoInsecureContextError,
} from "./lib/geo";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import { TourMap } from "./components/tour-map";
import { DaySelector } from "./components/day-selector";
import { ShopListDrawer } from "./components/shop-list-drawer";
import { CustomerDetailDrawer } from "./components/customer-detail-drawer";
import { AddCustomerDrawer } from "./components/add-customer-drawer";
import { CustomerFormValues } from "./components/customer-form";
import { NavigationPanel } from "./components/navigation-panel";
import { DrawerPortalContainer } from "@/components/ui/drawer";
import {
  BOTTOM_NAV_H_CSS,
  PANEL_WIDTH_CLASS,
  OVERLAY_Z,
} from "./lib/constants";

function todayKey(): DayKey {
  const map: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "sat", "sat"];
  return map[new Date().getDay()] ?? "sun";
}

const LOCATION_ERROR_MESSAGES: Record<"denied" | "insecure", string> = {
  denied:
    "لم تمنحنا صلاحية الوصول لموقعك. يرجى تفعيلها من إعدادات المتصفح أو التطبيق.",
  insecure:
    "يتطلب تحديد الموقع اتصالاً آمناً (https). يرجى فتح الموقع عبر رابط https:// والمحاولة مرة أخرى.",
};

export default function MapCpmnainer() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [listItems, setListItems] = useState<CustomerListItem[]>(
    INITIAL_CUSTOMER_ITEMS,
  );

  const [day, setDay] = useState<DayKey>(todayKey());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(true);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locState, setLocState] = useState<
    "off" | "live" | "denied" | "insecure"
  >("off");
  const [locMsgVisible, setLocMsgVisible] = useState(false);
  const [focus, setFocus] = useState<{
    center: [number, number];
    zoom?: number;
    nonce: number;
  } | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [picking, setPicking] = useState(false);
  const [pickingForEdit, setPickingForEdit] = useState<CustomerListItem | null>(
    null,
  );
  const [pickedPoint, setPickedPoint] = useState<[number, number] | null>(null);
  const [pickingLocLoading, setPickingLocLoading] = useState(false);
  const [navShop, setNavShop] = useState<Shop | null>(null);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(false);
  const [bearing, setBearing] = useState(0);
  const [heading, setHeading] = useState(0);
  const [follow, setFollow] = useState(true);
  const nonce = useRef(0);
  const locMsgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dayShops = useMemo(
    () => shops.filter((s) => s.day === day),
    [shops, day],
  );
  const origin = userPos ?? ALEPPO_CENTER;
  const selectedListItem =
    listItems.find((item) => item.id === selectedId) ?? null;
  const overlayOpen =
    addOpen || !!selectedListItem || listOpen || !!pickingForEdit;

  const flyTo = (center: [number, number], zoom = 16) =>
    setFocus({ center, zoom, nonce: ++nonce.current });

  const flashLocationError = (state: "denied" | "insecure") => {
    setLocState(state);
    setLocMsgVisible(true);
    if (locMsgTimer.current) clearTimeout(locMsgTimer.current);
    locMsgTimer.current = setTimeout(() => setLocMsgVisible(false), 5000);
  };

  const handleGeoError = useCallback((err: unknown) => {
    if (err instanceof GeoInsecureContextError) {
      flashLocationError("insecure");
    } else {
      flashLocationError("denied");
    }
  }, []);

  const locate = useCallback(() => {
    getCurrentPosition()
      .then((pos) => {
        setUserPos(pos);
        setLocState("live");
        flyTo(pos, 15);
      })
      .catch(handleGeoError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGeoError]);

  const useMyLocationForShop = useCallback(() => {
    setPickingLocLoading(true);
    getCurrentPosition()
      .then((pos) => {
        setUserPos(pos);
        setLocState("live");
        setPickedPoint(pos);
        flyTo(pos, 17);
      })
      .catch(handleGeoError)
      .finally(() => setPickingLocLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGeoError]);

  const updateCustomerLocation = (
    customerId: string,
    lat: number,
    lng: number,
  ) => {
    const rlat = Number(lat.toFixed(6));
    const rlng = Number(lng.toFixed(6));
    const item = listItems.find((i) => i.id === customerId);

    setListItems((prev) =>
      prev.map((i) =>
        i.id === customerId
          ? { ...i, hasCoordinates: true, lat: rlat, lng: rlng }
          : i,
      ),
    );
    setShops((prev) => {
      if (prev.some((s) => s.id === customerId)) {
        return prev.map((s) =>
          s.id === customerId ? { ...s, lat: rlat, lng: rlng } : s,
        );
      }
      if (!item) return prev;
      const promoted: Shop = {
        type: "branch",
        id: item.id,
        name: item.name,
        address: "",
        phone: item.phone,
        day: item.day,
        lat: rlat,
        lng: rlng,
        orders: [],
        invoices: [],
        payments: [],
      };
      return [...prev, promoted];
    });
    setSelectedId(null);
    setPickingForEdit(null);
    setPicking(false);
  };

  const handleAddCustomerSuccess = () => {
    setAddOpen(false);
    setPickedPoint(null);
    setPicking(false);
    setListOpen(true);
  };

  const handleCreateCustomer = (values: CustomerFormValues) => {
    const id = `cust-${Date.now()}`;
    const primaryDay = values.workDays[0] ?? day;
    const workDays = values.workDays.length ? values.workDays : [primaryDay];

    const newItem: CustomerListItem = {
      id,
      name: values.name,
      phone: values.phone,
      email: values.email || undefined,
      day: primaryDay,
      workDays,
      isActive: true,
      hasCoordinates: !!values.pickedPoint,
      lat: values.pickedPoint?.[0] ?? null,
      lng: values.pickedPoint?.[1] ?? null,
    };
    setListItems((prev) => [...prev, newItem]);

    if (values.pickedPoint) {
      const newShop: Shop = {
        type: "branch",
        id,
        name: values.name,
        address: values.address,
        phone: values.phone,
        day: primaryDay,
        lat: values.pickedPoint[0],
        lng: values.pickedPoint[1],
        orders: [],
        invoices: [],
        payments: [],
      };
      setShops((prev) => [...prev, newShop]);
    }

    handleAddCustomerSuccess();
  };

  useEffect(() => {
    setSelectedId(null);
  }, [day]);

  useEffect(() => {
    if (!navShop) {
      setRoute(null);
      setRouteError(false);
      return;
    }
    const ac = new AbortController();
    setRouteLoading(true);
    setRouteError(false);
    fetchRoute(origin, [navShop.lat, navShop.lng], ac.signal)
      .then((r) => {
        setRoute(r);
        setRouteError(false);
      })
      .catch((e) => {
        if ((e as Error).name !== "AbortError") setRouteError(true);
      })
      .finally(() => setRouteLoading(false));
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navShop, origin[0].toFixed(3), origin[1].toFixed(3)]);

  const lastFollowFlyAt = useRef(0);

  useEffect(() => {
    if (!navShop || !follow || !userPos) return;
    const now = Date.now();
    if (now - lastFollowFlyAt.current < 700) return;
    lastFollowFlyAt.current = now;

    const pts = route?.coords ?? [
      [navShop.lat, navShop.lng] as [number, number],
    ];
    const ahead =
      pts.find((c) => distanceKm(userPos, c) > 0.04) ??
      pts[pts.length - 1] ??
      userPos;
    const b = bearingBetween(userPos, ahead);
    setHeading(b);
    setBearing(b);
    flyTo(userPos, 17);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navShop, follow, userPos, route]);

  const remaining = useMemo(() => {
    if (!navShop) return null;
    if (route) return { dist: route.distance, dur: route.duration };
    const km = distanceKm(origin, [navShop.lat, navShop.lng]);
    return { dist: km * 1000, dur: km * 180 };
  }, [navShop, route, origin]);

  const openListItem = (item: CustomerListItem) => {
    setSelectedId(item.id);
    // Only fly to if has coordinates
    if (item.hasCoordinates && item.lat != null && item.lng != null) {
      flyTo([item.lat, item.lng], 16);
    }
    setListOpen(false);
  };

  const startNavigation = (shop: Shop) => {
    setNavShop(shop);
    setFollow(true);
    if (!userPos) locate();
    flyTo([shop.lat, shop.lng], 17);
  };

  // These values are tied to the drawer heights in the JSX (h-[46%], h-[75%]).
  // For Leaflet's fitBounds, we need pixel estimates. Since this map is embedded
  // in a small phone-mockup frame (not a real full-height viewport), these are
  // scaled to that frame's actual size rather than assuming a tall phone screen.
  const bottomInset = listOpen ? 280 : 60;
  const floatingBottom = listOpen ? `calc(46% + 0.7rem)` : `0rem`;

  return (
    <main
      ref={setContainer}
      className="relative h-full w-full overflow-hidden bg-background"
    >
      <DrawerPortalContainer container={container}>
      <TourMap
        shops={dayShops}
        selectedId={selectedId}
        onSelect={(id) => {
          const item = listItems.find((x) => x.id === id);
          if (item) openListItem(item);
        }}
        picking={picking}
        onPick={(lat, lng) => {
          if (pickingForEdit) {
            updateCustomerLocation(pickingForEdit.id, lat, lng);
          } else {
            setPickedPoint([lat, lng]);
            setPicking(false);
            setAddOpen(true);
          }
        }}
        pickedPoint={pickedPoint}
        userPos={userPos}
        focus={focus}
        bottomInset={bottomInset}
        route={route?.coords ?? null}
        bearing={bearing}
        onBearingChange={(deg) => {
          setBearing(deg);
          if (navShop && Math.abs(deg - heading) > 8) setFollow(false);
        }}
        heading={heading}
        navMode={!!navShop}
        overlayOpen={overlayOpen}
      />

      {(locState === "denied" || locState === "insecure") && locMsgVisible && (
        <div
          className={`pointer-events-none absolute inset-x-3 top-3 z-[2100] flex justify-center ${PANEL_WIDTH_CLASS}`}
        >
          <div className="pointer-events-auto glass-panel flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-semibold shadow-float">
            <IconRenderer
              name="warning_outlined"
              className="w-5 h-5 shrink-0 text-warning-foreground"
            />
            <span className="min-w-0">{LOCATION_ERROR_MESSAGES[locState]}</span>
            <button
              onClick={() => setLocMsgVisible(false)}
              aria-label="إغلاق"
              className="shrink-0 opacity-60"
            >
              <IconRenderer name="close_outlined" className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {!navShop && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-[2200] p-3 ${PANEL_WIDTH_CLASS}`}
        >
          <DaySelector day={day} onDayChange={setDay} items={listItems} />
        </div>
      )}

      {!navShop && !addOpen && !picking && (
        <>
          <div
            className="absolute z-[2200] transition-all duration-300"
            style={{
              insetInlineEnd: "0.75rem",
              bottom: floatingBottom,
            }}
          >
            <Button
              onClick={locate}
              aria-label="موقعي الحالي"
              variant="glass"
              className="h-11 w-11 rounded-full border border-glass-border bg-card/95 p-0 text-primary shadow-sheet backdrop-blur-xl hover:bg-card"
            >
              <IconRenderer name="location_outlined" className="w-5 h-5" />
            </Button>
          </div>

          <div
            className="absolute z-[2200] transition-all duration-300"
            style={{
              insetInlineStart: "0.75rem",
              bottom: floatingBottom,
            }}
          >
            <Button
              onClick={() => {
                setPicking(true);
                setAddOpen(false);
                setListOpen(false);
              }}
              className="h-11 w-11 rounded-full p-0 text-primary shadow-sheet backdrop-blur-xl hover:bg-card"
            >
              <IconRenderer
                name="plus_outlined"
                className="w-5 h-5 text-primary-foreground"
              />
            </Button>
          </div>
        </>
      )}

      {picking && (
        <div
          className={`absolute inset-x-3 z-[2200] glass-panel flex items-center gap-3 rounded-3xl p-3 shadow-float ${PANEL_WIDTH_CLASS}`}
          style={{ bottom: "1rem" }}
        >
          <IconRenderer
            name="pin_outlined"
            className={`w-7 h-7 shrink-0 ${pickingForEdit ? "text-warning" : "text-primary"}`}
          />
          <p className="min-w-0 flex-1 text-xs font-bold">
            {pickingForEdit
              ? `اضغط على الخريطة لتحديد موقع: ${pickingForEdit.name}`
              : "اضغط على الخريطة لتحديد موقع المحل الجديد"}
          </p>
          <Button
            onClick={() => {
              setPicking(false);
              setPickingForEdit(null);
              setAddOpen(true);
            }}
            variant="secondary"
            size="sm"
            className="shrink-0 rounded-xl"
          >
            إلغاء
          </Button>
        </div>
      )}

      {!navShop && !listOpen && !addOpen && !picking && (
        <div
          className={`pointer-events-none absolute inset-x-0 z-[2200] flex justify-center ${PANEL_WIDTH_CLASS}`}
          style={{ bottom: "0.75rem" }}
        >
          <Button
            onClick={() => setListOpen(true)}
            variant="glass"
            className="pointer-events-auto gap-2 rounded-full px-4 py-2 text-xs shadow-float"
          >
            <IconRenderer name="category_outlined" className="w-5 h-5" />
            محلات {DAYS.find((d) => d.key === day)?.label}
            <span className="font-mono text-[10px] opacity-70">
              {dayShops.length}
            </span>
          </Button>
        </div>
      )}

      <ShopListDrawer
        open={!navShop && listOpen}
        onOpenChange={setListOpen}
        day={day}
        items={listItems}
        selectedId={selectedId}
        origin={origin}
        onSelectItem={openListItem}
        bottomNavHeight={BOTTOM_NAV_H_CSS}
        panelWidthClass={PANEL_WIDTH_CLASS}
        overlayZ={OVERLAY_Z}
      />

      <CustomerDetailDrawer
        open={!!selectedListItem && !navShop}
        onOpenChange={(open) => !open && setSelectedId(null)}
        item={selectedListItem}
        origin={origin}
        onStartNavigation={startNavigation}
        onEditLocation={(item) => {
          setSelectedId(null);
          setPicking(true);
          setPickingForEdit(item);
        }}
        bottomNavHeight={BOTTOM_NAV_H_CSS}
        panelWidthClass={PANEL_WIDTH_CLASS}
        overlayZ={OVERLAY_Z}
      />

      <AddCustomerDrawer
        open={addOpen}
        onOpenChange={setAddOpen}
        pickedPoint={pickedPoint}
        defaultDay={day}
        onPickLocation={() => setPicking(true)}
        onUseMyLocation={useMyLocationForShop}
        isLoadingLocation={pickingLocLoading}
        onSubmit={handleCreateCustomer}
        bottomNavHeight={BOTTOM_NAV_H_CSS}
        panelWidthClass={PANEL_WIDTH_CLASS}
        overlayZ={OVERLAY_Z}
      />

      {navShop && (
        <NavigationPanel
          shop={navShop}
          origin={origin}
          route={route}
          routeLoading={routeLoading}
          routeError={routeError}
          remaining={remaining}
          follow={follow}
          onStopNavigation={() => setNavShop(null)}
          onCenterOnUser={() => {
            setFollow(true);
            if (userPos) flyTo(userPos, 17);
            else locate();
          }}
          panelWidthClass={PANEL_WIDTH_CLASS}
          bottomNavHeight={BOTTOM_NAV_H_CSS}
        />
      )}
      </DrawerPortalContainer>
    </main>
  );
}

"use client";

import * as React from "react";
import { Dialog as DrawerPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

/**
 * By default drawers portal to <body>, like a normal full-page sheet.
 * Set this to confine every drawer under it (overlay + popup) to a
 * local container instead — e.g. a phone-mockup screen that clips
 * with overflow-hidden, so drawers can't escape it.
 */
const DrawerPortalContainerContext =
  React.createContext<HTMLElement | null>(null);

function DrawerPortalContainer({
  container,
  children,
}: {
  container: HTMLElement | null;
  children: React.ReactNode;
}) {
  return (
    <DrawerPortalContainerContext.Provider value={container}>
      {children}
    </DrawerPortalContainerContext.Provider>
  );
}

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  const container = React.useContext(DrawerPortalContainerContext);
  return (
    <DrawerPrimitive.Portal
      data-slot="drawer-portal"
      container={container ?? undefined}
      {...props}
    />
  );
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  const contained = React.useContext(DrawerPortalContainerContext) !== null;
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        contained ? "absolute inset-0" : "fixed inset-0",
        "z-50 bg-black/30 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  showOverlay = true,
  ...props
}: DrawerPrimitive.Popup.Props & { showOverlay?: boolean }) {
  const contained = React.useContext(DrawerPortalContainerContext) !== null;
  return (
    <DrawerPortal>
      {showOverlay && <DrawerOverlay />}
      <DrawerPrimitive.Popup
        data-slot="drawer-content"
        className={cn(
          contained ? "absolute inset-x-0 bottom-0" : "fixed inset-x-0 bottom-0",
          "z-50 flex flex-col gap-0 rounded-t-3xl border-t bg-background shadow-lg transition duration-200 ease-out data-ending-style:translate-y-6 data-ending-style:opacity-0 data-starting-style:translate-y-6 data-starting-style:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Popup>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-base font-bold text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerPortalContainer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
};

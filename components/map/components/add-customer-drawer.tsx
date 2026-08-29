"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import { DayKey } from "../lib/tour-data";
import { CustomerForm, CustomerFormValues } from "./customer-form";

interface AddCustomerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickedPoint: [number, number] | null;
  onPickLocation: () => void;
  onUseMyLocation: () => void;
  isLoadingLocation: boolean;
  defaultDay: DayKey;
  onSubmit: (values: CustomerFormValues) => void;
  bottomNavHeight?: string;
  panelWidthClass?: string;
  overlayZ?: string;
}

export function AddCustomerDrawer({
  open,
  onOpenChange,
  pickedPoint,
  onPickLocation,
  onUseMyLocation,
  isLoadingLocation,
  defaultDay,
  onSubmit,
  bottomNavHeight = "var(--bottom-nav-height)",
  panelWidthClass = "md:inset-x-auto md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2",
  overlayZ = "z-[2600]",
}: AddCustomerDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className={`${overlayZ} mt-0 h-[75%] rounded-t-[1.75rem] border-t border-glass-border bg-card/95 shadow-sheet backdrop-blur-xl ${panelWidthClass} md:rounded-b-[1.75rem]`}
        style={{ bottom: bottomNavHeight }}
      >
        <DrawerHeader className="flex justify-between flex-row w-full items-center gap-3 px-5 pb-3 pt-1 text-start">
          <DrawerTitle className="truncate text-base">محل جديد</DrawerTitle>
          <DrawerClose render={<Button variant="secondary" size="icon-sm" />}>
            <IconRenderer name="close_outlined" className="w-3 h-3" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <CustomerForm
            pickedPoint={pickedPoint}
            defaultDay={defaultDay}
            onPickLocation={() => {
              onOpenChange(false);
              onPickLocation();
            }}
            onUseMyLocation={onUseMyLocation}
            isLoadingLocation={isLoadingLocation}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

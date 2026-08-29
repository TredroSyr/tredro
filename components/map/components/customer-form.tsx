"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/tredro/phone-input";
import { IconRenderer } from "@/assets/icons/iconRenderer";
import { DayKey, DAYS } from "../lib/tour-data";
import { cn } from "@/lib/utils";

export type CustomerFormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  workDays: DayKey[];
  pickedPoint: [number, number] | null;
};

interface CustomerFormProps {
  pickedPoint: [number, number] | null;
  defaultDay: DayKey;
  onPickLocation: () => void;
  onUseMyLocation: () => void;
  isLoadingLocation: boolean;
  onSubmit: (values: CustomerFormValues) => void;
  onCancel?: () => void;
}

export function CustomerForm({
  pickedPoint,
  defaultDay,
  onPickLocation,
  onUseMyLocation,
  isLoadingLocation,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [workDays, setWorkDays] = useState<DayKey[]>([defaultDay]);
  const [nameError, setNameError] = useState(false);

  const toggleWorkDay = (day: DayKey) => {
    setWorkDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    onSubmit({
      name: name.trim(),
      phone,
      email: email.trim(),
      address: address.trim(),
      workDays,
      pickedPoint,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-primary">
          اسم العميل
        </label>
        <Input
          placeholder="مثال: أحمد محمد"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError(false);
          }}
        />
        {nameError && (
          <p className="mt-1 text-[11px] font-bold text-destructive">
            اسم العميل مطلوب
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-primary">
          رقم الهاتف
        </label>
        <PhoneInput value={phone} onChange={setPhone} />
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-primary">
          البريد الإلكتروني (اختياري)
        </label>
        <Input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-primary">
          العنوان (اختياري)
        </label>
        <Input
          placeholder="الحي، الشارع"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-primary">
          أيام الدورة
        </label>
        <div className="flex flex-wrap gap-1.5">
          {DAYS.map((day) => (
            <Button
              key={day.key}
              type="button"
              variant={workDays.includes(day.key) ? "default" : "secondary"}
              size="sm"
              className="rounded-xl"
              onClick={() => toggleWorkDay(day.key)}
            >
              {day.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-bold text-primary">
          الموقع على الخريطة
        </label>
        <div className="space-y-2">
          <Button
            type="button"
            onClick={onPickLocation}
            variant="outline"
            className="w-full border-2 border-dashed border-primary bg-primary/8 py-3 text-xs text-primary"
          >
            <IconRenderer name="pin_outlined" className="w-6 h-6" />
            {pickedPoint ? "تعديل الموقع" : "حدد الموقع بالضغط على الخريطة"}
          </Button>
          <Button
            type="button"
            onClick={onUseMyLocation}
            disabled={isLoadingLocation}
            variant="secondary"
            className="w-full py-3 text-xs"
          >
            <IconRenderer
              name={isLoadingLocation ? "refresh_outlined" : "cursor_outlined"}
              className={cn("w-6 h-6", isLoadingLocation && "animate-spin")}
            />
            {isLoadingLocation ? "جاري جلب موقعك…" : "استخدم موقعي الحالي"}
          </Button>
        </div>
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          {pickedPoint
            ? `${pickedPoint[0].toFixed(5)}, ${pickedPoint[1].toFixed(5)}`
            : "لم يتم تحديد الموقع بعد"}
        </p>
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 py-3.5 text-sm"
          >
            إلغاء
          </Button>
        )}
        <Button type="submit" className="flex-1 py-3.5 text-sm">
          <IconRenderer name="tick_outlined" className="w-6 h-6" />
          حفظ العميل
        </Button>
      </div>
    </form>
  );
}

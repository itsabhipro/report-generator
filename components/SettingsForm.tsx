"use client";

import { CompanySettings } from "@/lib/types";
import { Save } from "lucide-react";

interface Props {
  settings: CompanySettings;
  onChange: (s: CompanySettings) => void;
  onSave: () => void;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      )}
    </label>
  );
}

export default function SettingsForm({ settings, onChange, onSave }: Props) {
  const set = (key: keyof CompanySettings, value: string) =>
    onChange({ ...settings, [key]: value });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Logo, emblem, signature and address used on all generated reports
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-800">Company identity</h2>
        <Field label="Company name" value={settings.companyName} onChange={(v) => set("companyName", v)} />
        <Field label="Address" value={settings.address} onChange={(v) => set("address", v)} multiline />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City" value={settings.city} onChange={(v) => set("city", v)} />
          <Field label="Country" value={settings.country} onChange={(v) => set("country", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Phone" value={settings.phone} onChange={(v) => set("phone", v)} />
          <Field label="Email" value={settings.email} onChange={(v) => set("email", v)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Tax / CR number" value={settings.taxId} onChange={(v) => set("taxId", v)} />
          <Field label="Currency (e.g. KWD, USD)" value={settings.currency} onChange={(v) => set("currency", v)} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="font-semibold text-slate-800">Branding assets</h2>
        <p className="text-xs text-slate-400">
          Paste image URLs (or leave empty for text-only header). In production you can upload to blob storage.
        </p>
        <Field label="Logo URL" value={settings.logoUrl} onChange={(v) => set("logoUrl", v)} placeholder="https://…/logo.png" />
        <Field label="Emblem / stamp URL" value={settings.emblemUrl} onChange={(v) => set("emblemUrl", v)} placeholder="https://…/emblem.png" />
        <Field label="Signature image URL" value={settings.signatureUrl} onChange={(v) => set("signatureUrl", v)} placeholder="https://…/signature.png" />
        <Field label="Signatory name" value={settings.signatureName} onChange={(v) => set("signatureName", v)} />
      </div>

      <button
        type="button"
        onClick={onSave}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
      >
        <Save size={16} />
        Save settings
      </button>
    </div>
  );
}

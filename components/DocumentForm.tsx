"use client";

import { DocumentData, DocType, docTypeLabels, LineItem } from "@/lib/types";
import { Plus, Trash2, Printer, Eye } from "lucide-react";

interface Props {
  doc: DocumentData;
  onChange: (d: DocumentData) => void;
  onPreview: () => void;
  onPrint: () => void;
}

export default function DocumentForm({ doc, onChange, onPreview, onPrint }: Props) {
  const set = <K extends keyof DocumentData>(key: K, value: DocumentData[K]) =>
    onChange({ ...doc, [key]: value });

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    set(
      "items",
      doc.items.map((it) => (it.id === id ? { ...it, ...patch } : it))
    );
  };

  const addItem = () => {
    set("items", [
      ...doc.items,
      { id: String(Date.now()), description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    set(
      "items",
      doc.items.filter((it) => it.id !== id)
    );
  };

  const isService = doc.type === "service_report";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{docTypeLabels[doc.type]}</h1>
          <p className="text-sm text-slate-500 mt-1">Fill details then preview or print</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onPreview} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50">
            <Eye size={16} /> Preview
          </button>
          <button type="button" onClick={onPrint} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">
            <Printer size={16} /> Print / PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Document type</span>
            <select value={doc.type} onChange={(e) => set("type", e.target.value as DocType)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {(Object.keys(docTypeLabels) as DocType[]).map((t) => (
                <option key={t} value={t}>{docTypeLabels[t]}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Number</span>
            <input value={doc.number} onChange={(e) => set("number", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Date</span>
            <input type="date" value={doc.date} onChange={(e) => set("date", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
        </div>

        {!isService && (
          <label className="block max-w-xs">
            <span className="text-xs font-medium text-slate-500">Due date</span>
            <input type="date" value={doc.dueDate} onChange={(e) => set("dueDate", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Client / customer name</span>
            <input value={doc.clientName} onChange={(e) => set("clientName", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Client email</span>
            <input value={doc.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-medium text-slate-500">Client address</span>
          <input value={doc.clientAddress} onChange={(e) => set("clientAddress", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </label>
      </div>

      {isService ? (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-800">Service details</h2>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Service title</span>
            <input value={doc.serviceTitle} onChange={(e) => set("serviceTitle", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Technician</span>
            <input value={doc.technician} onChange={(e) => set("technician", e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Work performed</span>
            <textarea value={doc.workDone} onChange={(e) => set("workDone", e.target.value)} rows={4} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Recommendations</span>
            <textarea value={doc.recommendations} onChange={(e) => set("recommendations", e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </label>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Line items</h2>
            <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
              <Plus size={16} /> Add line
            </button>
          </div>
          {doc.items.map((it) => (
            <div key={it.id} className="grid grid-cols-12 gap-2 items-end">
              <label className="col-span-12 sm:col-span-6 block">
                <span className="text-xs text-slate-500">Description</span>
                <input value={it.description} onChange={(e) => updateItem(it.id, { description: e.target.value })} className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
              </label>
              <label className="col-span-4 sm:col-span-2 block">
                <span className="text-xs text-slate-500">Qty</span>
                <input type="number" min={0} value={it.quantity} onChange={(e) => updateItem(it.id, { quantity: Number(e.target.value) })} className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
              </label>
              <label className="col-span-5 sm:col-span-3 block">
                <span className="text-xs text-slate-500">Unit price</span>
                <input type="number" min={0} step={0.001} value={it.unitPrice} onChange={(e) => updateItem(it.id, { unitPrice: Number(e.target.value) })} className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
              </label>
              <button type="button" onClick={() => removeItem(it.id)} className="col-span-3 sm:col-span-1 p-2 text-slate-400 hover:text-red-500" aria-label="Remove">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <label className="block max-w-[140px]">
            <span className="text-xs text-slate-500">Tax %</span>
            <input type="number" min={0} value={doc.taxPercent} onChange={(e) => set("taxPercent", Number(e.target.value))} className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm" />
          </label>
        </div>
      )}

      <label className="block bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <span className="text-xs font-medium text-slate-500">Notes / terms</span>
        <textarea value={doc.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
      </label>
    </div>
  );
}

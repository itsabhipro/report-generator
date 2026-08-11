"use client";

import { CompanySettings, DocumentData, docTypeLabels } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Props {
  settings: CompanySettings;
  doc: DocumentData;
}

export default function DocumentPreview({ settings, doc }: Props) {
  const subtotal = doc.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
  const tax = subtotal * (doc.taxPercent / 100);
  const total = subtotal + tax;
  const isService = doc.type === "service_report";

  return (
    <div id="print-area" className="bg-white shadow-lg rounded-sm border border-slate-200 mx-auto max-w-[800px] p-8 sm:p-10 text-slate-800">
      <div className="flex flex-wrap justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="flex items-start gap-4">
          {settings.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logoUrl} alt="Logo" className="h-14 w-auto object-contain" />
          ) : (
            <div className="h-14 w-14 rounded-lg bg-brand-600 text-white flex items-center justify-center text-lg font-bold">
              {settings.companyName.slice(0, 2).toUpperCase() || "CO"}
            </div>
          )}
          <div>
            <h1 className="text-lg font-bold text-slate-900">{settings.companyName}</h1>
            <p className="text-xs text-slate-500 mt-1 whitespace-pre-line">
              {settings.address}
              {settings.city && `\n${settings.city}`}
              {settings.country && `, ${settings.country}`}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {settings.phone}
              {settings.email && ` · ${settings.email}`}
            </p>
            {settings.taxId && <p className="text-xs text-slate-400 mt-0.5">Tax/CR: {settings.taxId}</p>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-brand-700 uppercase tracking-wide">{docTypeLabels[doc.type]}</p>
          <p className="text-sm text-slate-600 mt-1">#{doc.number}</p>
          <p className="text-xs text-slate-500 mt-2">Date: {formatDate(doc.date)}</p>
          {!isService && doc.dueDate && (
            <p className="text-xs text-slate-500">Due: {formatDate(doc.dueDate)}</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Bill to</p>
          <p className="font-semibold text-slate-900 mt-1">{doc.clientName}</p>
          <p className="text-sm text-slate-600 whitespace-pre-line">{doc.clientAddress}</p>
          {doc.clientEmail && <p className="text-sm text-slate-500">{doc.clientEmail}</p>}
        </div>
        {settings.emblemUrl && (
          <div className="flex justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.emblemUrl} alt="Emblem" className="h-16 w-auto object-contain opacity-80" />
          </div>
        )}
      </div>

      {isService ? (
        <div className="mt-8 space-y-4 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Service</p>
            <p className="font-semibold text-base">{doc.serviceTitle}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Technician</p>
            <p>{doc.technician}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Work performed</p>
            <p className="whitespace-pre-line text-slate-700 mt-1">{doc.workDone}</p>
          </div>
          {doc.recommendations && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Recommendations</p>
              <p className="whitespace-pre-line text-slate-700 mt-1">{doc.recommendations}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="py-2 font-medium">Description</th>
                <th className="py-2 font-medium text-right w-16">Qty</th>
                <th className="py-2 font-medium text-right w-24">Price</th>
                <th className="py-2 font-medium text-right w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {doc.items.map((it) => (
                <tr key={it.id} className="border-b border-slate-100">
                  <td className="py-2.5">{it.description || "—"}</td>
                  <td className="py-2.5 text-right">{it.quantity}</td>
                  <td className="py-2.5 text-right">{formatCurrency(it.unitPrice, settings.currency)}</td>
                  <td className="py-2.5 text-right font-medium">{formatCurrency(it.quantity * it.unitPrice, settings.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <div className="w-56 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span>{formatCurrency(subtotal, settings.currency)}</span>
              </div>
              {doc.taxPercent > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax ({doc.taxPercent}%)</span>
                  <span>{formatCurrency(tax, settings.currency)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-base">
                <span>Total</span>
                <span>{formatCurrency(total, settings.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {doc.notes && (
        <div className="mt-8 text-xs text-slate-500 border-t border-slate-100 pt-4">
          <p className="font-medium text-slate-600 mb-1">Notes</p>
          <p className="whitespace-pre-line">{doc.notes}</p>
        </div>
      )}

      <div className="mt-12 flex justify-end">
        <div className="text-center w-48">
          {settings.signatureUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.signatureUrl} alt="Signature" className="h-12 w-auto mx-auto object-contain mb-1" />
          ) : (
            <div className="h-12 border-b border-slate-300 mb-1" />
          )}
          <p className="text-xs font-medium text-slate-700">{settings.signatureName}</p>
          <p className="text-[10px] text-slate-400">Authorized signature</p>
        </div>
      </div>
    </div>
  );
}

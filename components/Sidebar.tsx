"use client";

import { FileText, Settings, Receipt, ClipboardList, FileCheck, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DocType, docTypeLabels } from "@/lib/types";

const docs: { id: DocType; icon: typeof Receipt }[] = [
  { id: "invoice", icon: Receipt },
  { id: "bill", icon: FileText },
  { id: "quotation", icon: FileCheck },
  { id: "service_report", icon: ClipboardList },
];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  onSelectDoc: (type: DocType) => void;
  currentDoc: DocType;
}

export default function Sidebar({ active, onNavigate, onSelectDoc, currentDoc }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow border no-print"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 bg-slate-900 text-white flex flex-col transition-transform lg:translate-x-0 no-print",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-5 py-5 border-b border-slate-700">
          <p className="font-bold text-sm">Report Generator</p>
          <p className="text-xs text-slate-400">Bills · Invoices · Reports</p>
        </div>

        <div className="px-3 py-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 px-2 mb-2">Documents</p>
          {docs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                onSelectDoc(id);
                onNavigate("create");
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5",
                active === "create" && currentDoc === id
                  ? "bg-brand-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              )}
            >
              <Icon size={16} />
              {docTypeLabels[id]}
            </button>
          ))}
        </div>

        <div className="px-3 py-2 border-t border-slate-800 mt-auto">
          <button
            onClick={() => {
              onNavigate("settings");
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm",
              active === "settings" ? "bg-brand-600 text-white" : "text-slate-300 hover:bg-slate-800"
            )}
          >
            <Settings size={16} />
            Company settings
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden no-print" onClick={() => setOpen(false)} />}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import SettingsForm from "@/components/SettingsForm";
import DocumentForm from "@/components/DocumentForm";
import DocumentPreview from "@/components/DocumentPreview";
import {
  CompanySettings,
  DocumentData,
  DocType,
  defaultDocument,
  defaultSettings,
} from "@/lib/types";
import { loadSettings, saveSettings } from "@/lib/storage";
import { X } from "lucide-react";

export default function Home() {
  const [view, setView] = useState<"create" | "settings">("create");
  const [settings, setSettings] = useState<CompanySettings>(defaultSettings);
  const [doc, setDoc] = useState<DocumentData>(defaultDocument("invoice"));
  const [showPreview, setShowPreview] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleSaveSettings = () => {
    saveSettings(settings);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleSelectDoc = (type: DocType) => {
    setDoc(defaultDocument(type));
    setShowPreview(false);
  };

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => window.print(), 300);
  };

  return (
    <div className="min-h-screen">
      <Sidebar
        active={view}
        onNavigate={(id) => setView(id as "create" | "settings")}
        onSelectDoc={handleSelectDoc}
        currentDoc={doc.type}
      />

      <main className="lg:pl-60 min-h-screen no-print">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pt-16 lg:pt-6">
          {view === "settings" ? (
            <>
              <SettingsForm settings={settings} onChange={setSettings} onSave={handleSaveSettings} />
              {savedMsg && (
                <p className="mt-3 text-sm text-emerald-600 font-medium">Settings saved locally.</p>
              )}
            </>
          ) : (
            <DocumentForm
              doc={doc}
              onChange={setDoc}
              onPreview={() => setShowPreview(true)}
              onPrint={handlePrint}
            />
          )}
        </div>
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 no-print">
          <div className="relative w-full max-w-[840px] my-8">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-white shadow border text-slate-600 hover:bg-slate-50"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <DocumentPreview settings={settings} doc={doc} />
            <div className="mt-4 flex justify-center gap-3 no-print">
              <button type="button" onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium">
                Print / Save as PDF
              </button>
              <button type="button" onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border bg-white text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden print:block">
        <DocumentPreview settings={settings} doc={doc} />
      </div>
    </div>
  );
}

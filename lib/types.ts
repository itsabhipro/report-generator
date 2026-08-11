export type DocType = "invoice" | "bill" | "quotation" | "service_report";

export interface CompanySettings {
  companyName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  taxId: string;
  logoUrl: string;
  emblemUrl: string;
  signatureUrl: string;
  signatureName: string;
  currency: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface DocumentData {
  type: DocType;
  number: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  items: LineItem[];
  notes: string;
  taxPercent: number;
  serviceTitle: string;
  technician: string;
  workDone: string;
  recommendations: string;
}

export const defaultSettings: CompanySettings = {
  companyName: "Dasco Services Co.",
  address: "Block 5, Street 12, Industrial Area",
  city: "Kuwait City",
  country: "Kuwait",
  phone: "+965 2200 0000",
  email: "billing@dasco.example",
  taxId: "KW-TAX-123456",
  logoUrl: "",
  emblemUrl: "",
  signatureUrl: "",
  signatureName: "Authorized Signatory",
  currency: "KWD",
};

export const defaultDocument = (type: DocType = "invoice"): DocumentData => ({
  type,
  number:
    type === "invoice"
      ? "INV-2026-001"
      : type === "bill"
        ? "BILL-2026-001"
        : type === "quotation"
          ? "QT-2026-001"
          : "SR-2026-001",
  date: new Date().toISOString().slice(0, 10),
  dueDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
  clientName: "Client Company LLC",
  clientAddress: "Salmiya, Block 10, Kuwait",
  clientEmail: "accounts@client.example",
  items: [
    { id: "1", description: "Service / Product item", quantity: 1, unitPrice: 150 },
    { id: "2", description: "Additional materials", quantity: 2, unitPrice: 25 },
  ],
  notes: "Thank you for your business.",
  taxPercent: 0,
  serviceTitle: "On-site maintenance",
  technician: "Ahmed Al-Rashid",
  workDone: "Inspected equipment, replaced filters, tested operation.",
  recommendations: "Schedule next service in 6 months.",
});

export const docTypeLabels: Record<DocType, string> = {
  invoice: "Invoice",
  bill: "Bill",
  quotation: "Quotation",
  service_report: "Service Report",
};

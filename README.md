# Report Generator

Generate professional **bills**, **invoices**, **quotations**, and **service reports** with your company branding.

## Features

### Document types
- **Invoice** — numbered, due date, line items, tax, totals
- **Bill** — same commercial layout as invoice
- **Quotation** — estimate / quote layout
- **Service report** — work performed, technician, recommendations

### Company settings (used on every document)
- Company name & full address
- Phone, email, tax / CR number
- Currency (e.g. KWD, USD)
- **Logo** URL
- **Emblem / stamp** URL
- **Signature** image URL + signatory name

Settings are stored in the browser (`localStorage`) so they persist between sessions.

### Output
- Live **preview** modal
- **Print / Save as PDF** via the browser print dialog

---

## Tech stack

- Next.js 14 · React 18 · TypeScript · Tailwind CSS

---

## Getting started

```bash
git clone https://github.com/itsabhipro/report-generator.git
cd report-generator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

1. Open **Company settings** — set name, address, logo, emblem, signature  
2. Choose **Invoice / Bill / Quotation / Service Report**  
3. Fill client & line items (or service fields)  
4. **Preview** → **Print / Save as PDF**

---

## Project structure

```
app/                 # Next.js App Router
components/
  Sidebar.tsx
  SettingsForm.tsx
  DocumentForm.tsx
  DocumentPreview.tsx
lib/
  types.ts           # Settings + document models
  storage.ts         # localStorage for settings
  utils.ts
```

---

## Author

**Abhishek Kumar** — [GitHub](https://github.com/itsabhipro)

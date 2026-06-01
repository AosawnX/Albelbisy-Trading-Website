# Albelbisy Trading Website

A premium business catalogue website built with Next.js 14, Tailwind CSS, and Framer Motion.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the required variables:

- `GOOGLE_SHEET_WEBHOOK_URL`: The URL of your Google Apps Script web app for storing form queries.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: The WhatsApp number for the floating chat button.

## Google Sheets Setup Instructions

To receive form submissions directly into a Google Sheet:

1. Create a new Google Sheet.
2. Set up the following columns in the first row:
   `Timestamp | Name | Company | Email | Phone | Product Interest | Message`
3. Go to **Extensions → Apps Script**.
4. Paste the following script:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.company,
    data.email,
    data.phone,
    data.interest,
    data.message
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({status:'ok'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click **Deploy** → **New Deployment**.
6. Choose type: **Web App**.
7. Execute as: **Me**, Who has access: **Anyone**.
8. Click **Deploy** and authorize the script.
9. Copy the generated **Web App URL** and set it as `GOOGLE_SHEET_WEBHOOK_URL` in your `.env.local` file or Vercel Environment Variables.

## Local Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

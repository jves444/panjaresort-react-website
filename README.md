# Panja Resort Palawan — Website

Modern React website for Panja Resort Palawan with direct booking that saves to Google Sheets and sends email confirmations via Gmail.

---

## Stack

- **React 18** — UI
- **Google Apps Script** — booking backend (Sheets + Gmail, no server needed)
- **GitHub Pages / Netlify / Vercel** — hosting

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/panja-resort.git
cd panja-resort
npm install
cp .env.example .env.local
# Fill in .env.local (see Setup below)
npm start
```

---

## Setup: Google Sheets + Gmail (Booking Backend)

### Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it **Panja Resort Bookings**
3. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/**THIS_IS_THE_ID**/edit`

### Step 2 — Deploy the Apps Script

1. Go to [script.google.com](https://script.google.com) → **New project**
2. Paste the contents of `google-apps-script/Code.gs`
3. Edit the `CONFIG` block at the top:
   ```js
   const CONFIG = {
     SHEET_ID: 'paste-your-sheet-id-here',
     SHEET_NAME: 'Bookings',
     RESORT_EMAIL: 'panjaresortpalawan@gmail.com',
     RESORT_NAME: 'Panja Resort Palawan',
   };
   ```
4. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise the permissions (Gmail + Sheets)
6. Copy the **Web App URL** — looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### Step 3 — Add URL to environment

In `.env.local`:
```
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

> **Note:** The script runs under your Google account, so it sends emails from your Gmail and writes to your Sheet — no API keys or billing required.

---

## Deploying to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/panja-resort",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Then:
```bash
npm run deploy
```

## Deploying to Netlify

1. Push to GitHub
2. Connect repo in [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variable `REACT_APP_GOOGLE_SCRIPT_URL` in Site settings → Environment

## Deploying to Vercel

```bash
npm i -g vercel
vercel --prod
```
Add `REACT_APP_GOOGLE_SCRIPT_URL` in Vercel project settings → Environment Variables.

---

## How to Make Changes

All resort content is in **one file**: `src/data/content.js`

| What to change | Where |
|---|---|
| Resort name, phone, email, social links | `RESORT` object at the top |
| Room names, prices, descriptions, photos | `ROOMS` array |
| Food/dining items | `FOOD_ITEMS` array |
| Amenities list | `AMENITIES` array |
| Guest reviews | `REVIEWS` array |
| Nearby attractions | `NEARBY` array |

### Changing room prices
```js
// src/data/content.js
{
  id: 'standard-double',
  price: 2921,  // ← change this number
  ...
}
```

### Adding a new room
Copy an existing object in the `ROOMS` array and change the fields. The site picks it up automatically.

### Changing photos
Replace the `image` and `gallery` URLs in `ROOMS` or `FOOD_ITEMS`. Use direct image URLs (Unsplash, your own CDN, etc.).

---

## Project Structure

```
src/
├── App.jsx               ← root, wires all sections together
├── index.css             ← design tokens + global reset
├── components/
│   ├── Navbar.jsx/css    ← sticky nav with mobile menu
│   ├── Hero.jsx/css      ← full-height hero
│   ├── RoomCard.jsx/css  ← clickable card + detail modal
│   ├── FoodCard.jsx/css  ← clickable card + detail modal
│   ├── BookingModal.jsx  ← booking form + Google Sheets submit
│   ├── BookingModal.css
│   ├── SectionHeader.jsx ← reusable heading component
│   └── Footer.jsx/css
├── pages/
│   ├── RoomsSection.jsx
│   ├── DiningSection.jsx
│   ├── AmenitiesSection.jsx
│   ├── ReviewsSection.jsx
│   ├── LocationSection.jsx
│   └── Sections.css      ← all section layout styles
├── data/
│   └── content.js        ← ✅ ALL CONTENT LIVES HERE
└── utils/
    └── booking.js        ← Google Sheets submit + helpers

google-apps-script/
└── Code.gs               ← paste this into script.google.com
```

---

## Design Tokens (colors, fonts)

All design values are in `src/index.css` under `:root`. Change them there to retheme the whole site.

```css
:root {
  --g-800: #1a4a2e;   /* dark green – headings, nav */
  --g-600: #2e7844;   /* mid green – buttons, accents */
  --g-300: #8ecba0;   /* light green – muted text on dark */
  --serif: 'DM Serif Display', serif;   /* headlines */
  --sans:  'DM Sans', sans-serif;       /* body */
}
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `REACT_APP_GOOGLE_SCRIPT_URL` | Yes (for bookings) | Apps Script Web App URL |
| `REACT_APP_GOOGLE_MAPS_KEY` | Optional | Embeds already work without a key |

In development without the script URL, bookings log to the console and show a success screen — so you can design/test locally without any backend.

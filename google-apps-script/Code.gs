/**
 * PANJA RESORT PALAWAN — Google Apps Script
 * ============================================
 * Deploy this as a Web App:
 *   1. Open script.google.com → New project → paste this code
 *   2. Edit the CONFIG below
 *   3. Deploy → New deployment → Web app
 *      • Execute as: Me
 *      • Who has access: Anyone
 *   4. Copy the Web App URL into your .env.local as REACT_APP_GOOGLE_SCRIPT_URL
 *
 * The script:
 *   - Appends each booking to a Google Sheet
 *   - Emails a confirmation to the guest
 *   - Emails a notification to the resort inbox
 */

// ─── CONFIG — edit these ─────────────────────────────────────
const CONFIG = {
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',       // from the Sheet URL
  SHEET_NAME: 'Bookings',                  // tab name in the sheet
  RESORT_EMAIL: 'panjaresortpalawan@gmail.com',
  RESORT_NAME: 'Panja Resort Palawan',
};
// ────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const bookingId = 'PJR-' + Date.now();
    data.bookingId = bookingId;

    // 1. Save to sheet
    appendToSheet(data);

    // 2. Email guest
    sendGuestConfirmation(data);

    // 3. Notify resort
    sendResortNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, bookingId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET for connectivity checks
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Panja Resort booking service is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── SHEET ──────────────────────────────────────────────────
function appendToSheet(data) {
  const ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow([
      'Booking ID', 'Submitted At', 'First Name', 'Last Name',
      'Email', 'Phone', 'Room', 'Check In', 'Check Out',
      'Nights', 'Guests', 'Total (PHP)', 'Special Requests', 'Status',
    ]);
    sheet.getRange(1, 1, 1, 14).setFontWeight('bold');
  }

  sheet.appendRow([
    data.bookingId,
    data.submittedAt,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.room,
    data.checkin,
    data.checkout,
    data.nights,
    data.guests,
    data.totalPrice,
    data.notes || '',
    'Pending',
  ]);
}

// ─── GUEST EMAIL ─────────────────────────────────────────────
function sendGuestConfirmation(data) {
  const subject = `Your booking at ${CONFIG.RESORT_NAME} is received! [${data.bookingId}]`;

  const body = `
Hi ${data.firstName},

Thank you for choosing Panja Resort Palawan! 🌿

We've received your reservation and our team will confirm it within a few hours.

─────────────────────────────
BOOKING SUMMARY
─────────────────────────────
Booking ID   : ${data.bookingId}
Room         : ${data.room}
Check-in     : ${data.checkin} (from 2:00 PM)
Check-out    : ${data.checkout} (by 12:00 PM)
Nights       : ${data.nights}
Guests       : ${data.guests}
Total        : ₱${Number(data.totalPrice).toLocaleString()} (incl. breakfast)
─────────────────────────────

${data.notes ? 'Your special requests: ' + data.notes + '\n\n' : ''}We'll call or email you shortly to finalize your booking.

Questions? Call us at 0917 376 4835 or reply to this email.

Warm regards,
The Panja Resort Team

Bay Vista Rd, Bgy. Tagburos, Puerto Princesa City, Palawan
Facebook: facebook.com/panjaresortpalawanofficial
  `;

  GmailApp.sendEmail(data.email, subject, body, {
    name: CONFIG.RESORT_NAME,
    replyTo: CONFIG.RESORT_EMAIL,
  });
}

// ─── RESORT NOTIFICATION ─────────────────────────────────────
function sendResortNotification(data) {
  const subject = `[New Booking] ${data.firstName} ${data.lastName} — ${data.room} (${data.checkin})`;

  const body = `
New booking received via the website.

Booking ID   : ${data.bookingId}
Name         : ${data.firstName} ${data.lastName}
Email        : ${data.email}
Phone        : ${data.phone}
Room         : ${data.room}
Check-in     : ${data.checkin}
Check-out    : ${data.checkout}
Nights       : ${data.nights}
Guests       : ${data.guests}
Total (PHP)  : ₱${Number(data.totalPrice).toLocaleString()}
Special Req  : ${data.notes || 'None'}
Submitted    : ${data.submittedAt}

View all bookings: https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}
  `;

  GmailApp.sendEmail(CONFIG.RESORT_EMAIL, subject, body);
}

/**
 * Submit a booking to Google Sheets via Apps Script Web App.
 * The Apps Script also sends a confirmation email to the guest
 * and a notification to the resort.
 */
export async function submitBooking(formData) {
  const scriptUrl = process.env.REACT_APP_GOOGLE_SCRIPT_URL;

  if (!scriptUrl || scriptUrl.includes('YOUR_DEPLOYMENT_ID')) {
    // Development fallback – log and simulate success
    console.log('[DEV] Booking submitted (no script URL set):', formData);
    await new Promise(r => setTimeout(r, 1200));
    return { success: true, bookingId: 'DEV-' + Date.now() };
  }

  const payload = {
    ...formData,
    submittedAt: new Date().toISOString(),
    source: 'Website',
  };

  const response = await fetch(scriptUrl, {
    method: 'POST',
    // Apps Script CORS requires no-cors for POST; we get back a redirect/opaque
    // Use mode: 'no-cors' and assume success if no network error
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // no-cors returns opaque – treat any non-throw as success
  return { success: true };
}

/**
 * Calculate number of nights between two date strings (YYYY-MM-DD).
 */
export function calcNights(checkin, checkout) {
  if (!checkin || !checkout) return 0;
  const diff = new Date(checkout) - new Date(checkin);
  return Math.max(0, Math.round(diff / 86400000));
}

/**
 * Format Philippine Peso
 */
export function formatPHP(amount) {
  return '₱' + Number(amount).toLocaleString('en-PH');
}

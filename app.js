// Wunderbuild Email Signature Generator
// Everything runs locally in the browser. Nothing is uploaded anywhere.

const els = {
  form: document.getElementById("sigForm"),
  fullName: document.getElementById("fullName"),
  position: document.getElementById("position"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  preview: document.getElementById("preview"),
  htmlOut: document.getElementById("htmlOut"),
  copyBtn: document.getElementById("copyBtn"),
  copyHtmlBtn: document.getElementById("copyHtmlBtn"),
  downloadRtfBtn: document.getElementById("downloadRtfBtn"),
  resetBtn: document.getElementById("resetBtn"),
  status: document.getElementById("status"),
};

const DEFAULTS = {
  fullName: "Kristine Nogra",
  position: "Marketing & Communications Specialist",
  email: "kristine@wunderbuild.com",
  phone: "1300 161 626",
};

// ---- Helpers

function escapeHtml(str) {
  return (str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeEmail(email) {
  return (email ?? "").trim();
}

function normalizePhoneForDisplay(phone) {
  return (phone ?? "").trim();
}

function normalizePhoneForTel(phone) {
  // Keep digits and leading +
  const raw = (phone ?? "").trim();
  const cleaned = raw.replace(/[^\d+]/g, "");
  // Ensure only one leading + max
  return cleaned.replace(/^(\+?)(\+)+/, "$1");
}

function setStatus(msg, kind = "info") {
  els.status.textContent = msg;
  els.status.dataset.kind = kind;
  if (!msg) return;
  window.clearTimeout(setStatus._t);
  setStatus._t = window.setTimeout(() => (els.status.textContent = ""), 4000);
}

// ---- Signature template

function buildSignatureHTML(data) {
  const name = escapeHtml(data.fullName || "");
  const title = escapeHtml(data.position || "");
  const email = escapeHtml(normalizeEmail(data.email || ""));
  const phoneDisplay = escapeHtml(normalizePhoneForDisplay(data.phone || ""));
  const phoneTel = escapeHtml(normalizePhoneForTel(data.phone || ""));

  // Keep inline styles for email-client compatibility.
  // Note: This is the user's original HTML with a few placeholders.
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333;">
  <tbody>
    <tr>
    <br>
      <td style="padding-right: 15px; vertical-align: top;">
        <img src="https://i.imgur.com/BfGzul8.png" alt="Photo" width="60" style="display: block; border-radius: 100px;">
      </td>
      <td style="vertical-align: top;">
        <div style="margin-bottom: 15px; line-height: 1.2;">
          <div style="font-size: 16px; font-weight: bold; color: #1d1c1b; margin-bottom: 4px;">${name}</div>
          <div style="font-size: 12px; color: #555555;">${title}</div>
        </div>

        <div style="margin-bottom: 15px; line-height: 1.2;">
          <div style="margin-bottom: 5px;">
            <span style="color: #1d1c1b; font-size: 14px; margin-right: 2.5px;">
              <img src="https://i.imgur.com/i7HIjXC.png" alt="Email" width="15" height="15" style="display: inline-block; border: 0; vertical-align: middle;">
            </span>
            <a href="mailto:${email}" style="color: #555555; text-decoration: unset; font-size: 12px; vertical-align: middle;">${email}</a>
          </div>

          <div style="margin-bottom: 5px;">
            <span style="color: #1d1c1b; font-size: 14px; margin-right: 2.5px;">
              <img src="https://i.imgur.com/AkDtLl0.png" alt="Phone" width="15" height="15" style="display: inline-block; border: 0; vertical-align: middle;">
            </span>
            <a href="tel:${phoneTel}" style="color: #555555; text-decoration: unset; font-size: 12px; vertical-align: middle;">${phoneDisplay}</a>
          </div>

          <div style="margin-bottom: 5px;">
            <span style="color: #1d1c1b; font-size: 14px; margin-right: 2.5px;">
              <img src="https://i.imgur.com/JjEze1y.png" alt="Website" width="15" height="15" style="display: inline-block; border: 0; vertical-align: middle;">
            </span>
            <a href="https://www.wunderbuild.com" style="color: #555555; text-decoration: unset; font-size: 12px; vertical-align: middle;">www.wunderbuild.com</a>
          </div>

          <div>
            <span style="color: #1d1c1b; font-size: 14px; margin-right: 2.5px;">
              <img src="https://i.imgur.com/p0tGZv9.png" alt="Address" width="15" height="15" style="display: inline-block; border: 0; vertical-align: middle;">
            </span>
            <a href="https://maps.app.goo.gl/8zUPPZ8FU3o5C8LS9" style="color: #555555; text-decoration: unset; font-size: 12px; vertical-align: middle;">L6, 607 Bourke St, Melbourne VIC 3000, AUS</a>
          </div>
        </div>

        <div style="margin-bottom: 15px; line-height: 1.2;">
          <a href="https://www.facebook.com/wunderbuild" style="text-decoration: unset; margin-right: 5px;">
            <img src="https://i.imgur.com/8603q2P.png" alt="Facebook" width="18" height="18" style="display: inline-block; border: 0;">
          </a>
          <a href="https://www.instagram.com/wunderbuild/" style="text-decoration: unset; margin-right: 5px;">
            <img src="https://i.imgur.com/4lIISFe.png" alt="Instagram" width="18" height="18" style="display: inline-block; border: 0;">
          </a>
          <a href="https://www.linkedin.com/company/wunderbuildglobal/" style="text-decoration: unset; margin-right: 5px;">
            <img src="https://i.imgur.com/d2IlWrH.png" alt="LinkedIn" width="18" height="18" style="display: inline-block; border: 0;">
          </a>
          <a href="https://x.com/wunder_build" style="text-decoration: unset; margin-right: 5px;">
            <img src="https://i.imgur.com/vsrTRQ0.png" alt="X" width="18" height="18" style="display: inline-block; border: 0;">
          </a>
          <a href="https://www.youtube.com/@wunderbuild" style="text-decoration: unset; margin-right: 0px;">
            <img src="https://i.imgur.com/ai8vQ8v.png" alt="YouTube" width="18" height="18" style="display: inline-block; border: 0;">
          </a>
        </div>

        <div>
          <a href="https://www.wunderbuild.com/book-a-demo/" style="display: inline-block; padding: 10px 20px; background-color: #b4ff50; color: #1d1c1b; text-decoration: unset; border-radius: 100px; font-size: 12px; font-weight: 600; border: 1px solid #b4ff50; margin-right: 5px; line-height: 1.4;">Book a demo</a>
          <a href="https://app.wunderbuild.com/sign-up" style="display: inline-block; padding: 10px 20px; background-color: #ffffff; color: #1d1c1b; text-decoration: unset; border-radius: 100px; font-size: 12px; font-weight: 600; border: 1px solid #1d1c1b; line-height: 1.4;">Start your free trial</a>
        </div>
      </td>
    </tr>
  </tbody>
</table>`.trim();
}

function buildPlainText(data) {
  const name = (data.fullName || "").trim();
  const title = (data.position || "").trim();
  const email = normalizeEmail(data.email || "");
  const phone = normalizePhoneForDisplay(data.phone || "");
  return `${name}\n${title}\n${email}\n${phone}\nwww.wunderbuild.com`;
}

// Minimal RTF (good enough for “download and paste” workflows).
// Not every app respects RTF on the clipboard, so this is primarily for the download button.
function buildRtf(data) {
  const name = (data.fullName || "").trim();
  const title = (data.position || "").trim();
  const email = normalizeEmail(data.email || "");
  const phone = normalizePhoneForDisplay(data.phone || "");

  function rtfEscape(s) {
    return (s ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/{/g, "\\{")
      .replace(/}/g, "\\}")
      .replace(/\n/g, "\\par ");
  }

  const lines = [
    `\\b ${rtfEscape(name)}\\b0`,
    rtfEscape(title),
    `\\ul ${rtfEscape(email)}\\ul0`,
    rtfEscape(phone),
    rtfEscape("www.wunderbuild.com"),
  ].join("\\par ");

  return `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Arial;}}\\fs22 ${lines} }`;
}

// ---- Rendering & events

function getFormData() {
  return {
    fullName: els.fullName.value,
    position: els.position.value,
    email: els.email.value,
    phone: els.phone.value,
  };
}

function render() {
  const data = getFormData();
  const html = buildSignatureHTML(data);
  els.preview.innerHTML = html;
  els.htmlOut.value = html;
}

async function copyForGmail() {
  const data = getFormData();
  const html = buildSignatureHTML(data);
  const plain = buildPlainText(data);
  const rtf = buildRtf(data);

  // Prefer modern clipboard write (requires HTTPS and a user gesture).
  // Falls back if blocked.
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const itemData = {
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([plain], { type: "text/plain" }),
      };

      // Optional RTF if supported
      if (typeof ClipboardItem.supports === "function" && ClipboardItem.supports("text/rtf")) {
        itemData["text/rtf"] = new Blob([rtf], { type: "text/rtf" });
      }

      await navigator.clipboard.write([new ClipboardItem(itemData)]);
      setStatus("Copied! Paste into Gmail → Settings → Signature.", "ok");
      return;
    }
    throw new Error("Clipboard API not available");
  } catch (err) {
    // Fallback: select HTML in a hidden, editable container and copy.
    try {
      const sandbox = document.createElement("div");
      sandbox.setAttribute("contenteditable", "true");
      sandbox.style.position = "fixed";
      sandbox.style.left = "-9999px";
      sandbox.style.top = "0";
      sandbox.innerHTML = html;
      document.body.appendChild(sandbox);

      const range = document.createRange();
      range.selectNodeContents(sandbox);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      const ok = document.execCommand("copy");
      document.body.removeChild(sandbox);
      sel.removeAllRanges();

      if (ok) {
        setStatus("Copied (fallback mode). Paste into Gmail → Settings → Signature.", "ok");
        return;
      }
      throw new Error("execCommand copy failed");
    } catch (err2) {
      setStatus("Copy blocked by browser. Use “Download .rtf” instead.", "warn");
    }
  }
}

async function copyHtml() {
  const html = els.htmlOut.value || "";
  try {
    await navigator.clipboard.writeText(html);
    setStatus("HTML copied to clipboard.", "ok");
  } catch {
    // last resort
    els.htmlOut.select();
    document.execCommand("copy");
    setStatus("HTML copied (fallback).", "ok");
  }
}

function downloadRtf() {
  const data = getFormData();
  const rtf = buildRtf(data);
  const blob = new Blob([rtf], { type: "application/rtf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "wunderbuild-email-signature.rtf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  setStatus("Downloaded .rtf. Open it, then copy/paste into Gmail if needed.", "ok");
}

function resetToDefaults() {
  els.fullName.value = DEFAULTS.fullName;
  els.position.value = DEFAULTS.position;
  els.email.value = DEFAULTS.email;
  els.phone.value = DEFAULTS.phone;
  render();
  setStatus("Reset to default example details.", "info");
}

// Wire up
["input", "change"].forEach(evt => {
  els.form.addEventListener(evt, render);
});

els.copyBtn.addEventListener("click", copyForGmail);
els.copyHtmlBtn.addEventListener("click", copyHtml);
els.downloadRtfBtn.addEventListener("click", downloadRtf);
els.resetBtn.addEventListener("click", resetToDefaults);

// Start
resetToDefaults();

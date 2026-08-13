/**
 * Extra Levels Marketing — Global JS
 * Handles: WhatsApp widget, Event popup, Launch sidebar, countdown
 */

// ─── WhatsApp Config ──────────────────────────────────────
const WA_NUMBER = "254792465156"; // EL WhatsApp number (no +)
const WA_MESSAGES = [
  { label: "📦 Enquire About Packages", text: "Hi! I'd like to know more about your marketing packages." },
  { label: "🌐 Website Launchpad Offer", text: "Hi! I want to pre-book the Ksh 8,999 website launch offer." },
  { label: "🎟️ Book Dinner Ticket", text: "Hi! I'd like to buy a ticket for the Maralal Connect Business Dinner." },
  { label: "💬 General Enquiry", text: "Hi! I have a general enquiry about Extra Levels Marketing." },
];

// ─── Build WhatsApp Widget ─────────────────────────────────
function buildWhatsApp() {
  const widget = document.createElement("div");
  widget.id = "wa-widget";
  widget.innerHTML = `
    <div id="wa-bubble" title="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87 1.02 1.04-3.76-.24-.39A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.66 0 5.16 1.04 7.04 2.92A9.92 9.92 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.45-7.6c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
      <span class="wa-pulse"></span>
    </div>
    <div id="wa-chat" class="hidden">
      <div class="wa-header">
        <div class="wa-avatar"><i class="ph-fill ph-chat-circle-dots"></i></div>
        <div>
          <div class="wa-name">Extra Levels Marketing</div>
          <div class="wa-status">🟢 Usually replies within minutes</div>
        </div>
        <button class="wa-close" id="wa-close-btn">✕</button>
      </div>
      <div class="wa-body">
        <div class="wa-msg">
          👋 Hi there! Welcome to <strong>Extra Levels Marketing</strong>.<br><br>
          How can we help you today? Pick a topic below or type your message directly on WhatsApp.
        </div>
        <div class="wa-options" id="wa-options"></div>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // Populate quick-reply options
  const opts = document.getElementById("wa-options");
  WA_MESSAGES.forEach(m => {
    const btn = document.createElement("a");
    btn.className = "wa-option-btn";
    btn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m.text)}`;
    btn.target = "_blank";
    btn.textContent = m.label;
    opts.appendChild(btn);
  });

  // Toggle
  document.getElementById("wa-bubble").addEventListener("click", () => {
    document.getElementById("wa-chat").classList.toggle("hidden");
  });
  document.getElementById("wa-close-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("wa-chat").classList.add("hidden");
  });
}

// ─── Event Popup ───────────────────────────────────────────
function buildEventPopup() {
  if (sessionStorage.getItem("el_popup_done")) return;

  const overlay = document.createElement("div");
  overlay.id = "event-popup-overlay";
  overlay.innerHTML = `
    <div id="event-popup">
      <button id="popup-close">✕</button>
      <div class="popup-badge">🎉 THIS FRIDAY — LIMITED SLOTS</div>
      <h2>Maralal Connect<br><span>Business Dinner</span></h2>
      <div class="popup-meta">
        <span><i class="ph ph-calendar"></i> Friday, Aug 15</span>
        <span><i class="ph ph-map-pin"></i> New Seasons Hotel, Maralal</span>
        <span><i class="ph ph-ticket"></i> Flat Rate: <strong>Ksh 1,500</strong></span>
      </div>
      <p class="popup-desc">An exclusive networking dinner for 50 SMEs. Connect, collaborate &amp; grow. <strong>First come, first served.</strong></p>

      <form id="popup-register-form">
        <input type="text" id="pr-name" placeholder="Your Full Name" required class="popup-input">
        <input type="tel" id="pr-phone" placeholder="WhatsApp Number (07XX XXX XXX)" required class="popup-input">
        <input type="text" id="pr-business" placeholder="Business Name" required class="popup-input">
        <button type="submit" class="popup-submit-btn">🎟️ Register &amp; Get Ticket Info</button>
      </form>

      <div id="popup-success" class="hidden">
        <div class="popup-success-msg">
          ✅ <strong>You're registered!</strong><br>
          Send <strong>Ksh 1,500</strong> via M-Pesa to:<br>
          <div class="mpesa-box">
            <span>Till Number:</span> <strong>5663919</strong><br>
            <span>Account Name:</span> <strong>Samburu ICT Centre</strong>
          </div>
          Then send your payment screenshot to <strong>0792 465 156</strong> on WhatsApp to confirm your seat.
        </div>
        <a href="https://wa.me/254792465156?text=${encodeURIComponent("Hi! I've registered for the Maralal Connect Business Dinner and made payment. Please confirm my seat.")}"
           class="popup-wa-btn" target="_blank">
          📲 Send Screenshot on WhatsApp
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("popup-close").addEventListener("click", closePopupShowSidebar);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closePopupShowSidebar(); });

  document.getElementById("popup-register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("popup-register-form").classList.add("hidden");
    document.getElementById("popup-success").classList.remove("hidden");
    // After 3s close popup and show sidebar
    setTimeout(closePopupShowSidebar, 4500);
  });
}

function closePopupShowSidebar() {
  const overlay = document.getElementById("event-popup-overlay");
  if (overlay) overlay.classList.add("fade-out");
  setTimeout(() => {
    if (overlay) overlay.remove();
    sessionStorage.setItem("el_popup_done", "1");
    showLaunchSidebar();
  }, 400);
}

// ─── Launch Offer Sidebar ──────────────────────────────────
function showLaunchSidebar() {
  if (sessionStorage.getItem("el_sidebar_done")) return;

  const sidebar = document.createElement("div");
  sidebar.id = "launch-sidebar";
  sidebar.innerHTML = `
    <button id="sidebar-close">✕</button>
    <div class="sidebar-badge">🔥 FRIDAY ONLY</div>
    <h3>Website Launchpad</h3>
    <div class="sidebar-price"><span>Ksh </span>8,999</div>
    <div class="sidebar-old-price">Normal: Ksh 25,000+</div>
    <ul class="sidebar-features">
      <li>✅ Built at the event, live the same day</li>
      <li>✅ Free domain name (.co.ke / .com)</li>
      <li>✅ 1 Year hosting included</li>
      <li>✅ WhatsApp &amp; social integration</li>
    </ul>
    <div class="mpesa-box sidebar-mpesa">
      Pay via M-Pesa Till: <strong>5663919</strong><br>
      <small>Samburu ICT Centre</small>
    </div>
    <a href="packages.html#prebook" class="sidebar-btn">Pre-Book Free Slot →</a>
    <button id="sidebar-close-bottom">No thanks, close</button>
  `;
  document.body.appendChild(sidebar);

  // Slide in
  requestAnimationFrame(() => {
    setTimeout(() => sidebar.classList.add("open"), 50);
  });

  const closeSidebar = () => {
    sidebar.classList.remove("open");
    setTimeout(() => sidebar.remove(), 400);
    sessionStorage.setItem("el_sidebar_done", "1");
  };

  document.getElementById("sidebar-close").addEventListener("click", closeSidebar);
  document.getElementById("sidebar-close-bottom").addEventListener("click", closeSidebar);
}

// ─── Countdown Timer ───────────────────────────────────────
function startCountdown(ids) {
  if (!ids.days) return;

  function getNextFriday() {
    const now = new Date();
    const day = now.getDay();
    const diff = (5 - day + 7) % 7 || 7;
    const friday = new Date(now);
    friday.setDate(now.getDate() + diff);
    friday.setHours(18, 0, 0, 0);
    return friday;
  }

  function update() {
    const diff = getNextFriday() - new Date();
    if (diff <= 0) {
      Object.values(ids).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "00";
      });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    if (document.getElementById(ids.days)) document.getElementById(ids.days).textContent = String(d).padStart(2, "0");
    if (document.getElementById(ids.hours)) document.getElementById(ids.hours).textContent = String(h).padStart(2, "0");
    if (document.getElementById(ids.mins)) document.getElementById(ids.mins).textContent = String(m).padStart(2, "0");
    if (document.getElementById(ids.secs)) document.getElementById(ids.secs).textContent = String(s).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

// ─── Navbar scroll ─────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });
}

// ─── Scroll Reveal ─────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("active"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => observer.observe(el));
}

// ─── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildWhatsApp();
  initNavbar();
  initReveal();

  // Show popup after 2.5s (first visit only)
  if (!sessionStorage.getItem("el_popup_done")) {
    setTimeout(buildEventPopup, 2500);
  } else if (!sessionStorage.getItem("el_sidebar_done")) {
    setTimeout(showLaunchSidebar, 1000);
  }

  // Countdown — used on packages page
  startCountdown({ days: "cd-days", hours: "cd-hours", mins: "cd-mins", secs: "cd-secs" });
});

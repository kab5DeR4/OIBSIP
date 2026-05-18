const fs = require('fs');

let msg = '';
try {
  msg = fs.readFileSync(0, 'utf-8').trim(); // read from stdin
} catch (e) {
  process.exit(0);
}

const map = {
  "docs: Enhance repository credibility with comprehensive architecture documentation and testing readiness": "added readme and test folder",
  "feat: Setup automated email notifications and environment utilities": "added email sending after payment",
  "feat: Architecture overhaul for Admin and User Layout separation": "fixed admin and user pages",
  "feat: Integrate Razorpay checkout flow in frontend Cart": "added razorpay checkout to cart",
  "feat: Implement Razorpay backend integration and API routes": "added backend code for razorpay",
  "chore: Setup root package.json for monorepo deployments": "added main package.json",
  "Implement global state for Cart and Orders": "added state for cart",
  "Fix React Rules of Hooks violation in Navbar causing white screen on navigation": "fixed navbar white screen bug",
  "Fix routing, add Admin Auth, fix builder summary and missing images": "fixed routes and admin login",
  "UX Improvements: Local Images, Admin interactivity, Scroll fix": "added images and fixed scroll",
  "UI Overhaul Phase 2: Global Header/Footer, Dashboard Sections, Image-Rich Custom Builder": "updated ui with new pizza images",
  "UI Overhaul: Professional light theme with vast real pizza images and animations": "changed theme to light mode",
  "Initial commit with dark mode": "first commit with basic ui",
  "Initial commit": "first commit"
};

// Find matching message or default to original
let newMsg = msg;
for (const [oldMsg, replacement] of Object.entries(map)) {
  if (msg.includes(oldMsg) || oldMsg.includes(msg)) {
    newMsg = replacement;
    break;
  }
}

console.log(newMsg);

import fs from 'fs';
import path from 'path';

const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html'];

const nav_html = `  <!-- Launch Banner -->
  <div class="launch-banner">
    🚀 <strong>LAUNCH EVENT THIS FRIDAY!</strong> Get your business website built &amp; live for Ksh 8,999 &mdash; <a href="packages.html#launch-offer">Pre-Book Now &rarr;</a>
  </div>

  <!-- Navbar -->
  <nav class="navbar" style="top: 44px;">
    <div class="container navbar-container">
      <a href="index.html">
        <img src="logo.jpeg" alt="Extra Levels Marketing" class="logo-img">
      </a>
      
      <ul class="nav-menu">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="about.html" class="nav-link">About Us</a></li>
        <li><a href="services.html" class="nav-link">Services</a></li>
        <li><a href="packages.html" class="nav-link">Packages</a></li>
        <li><a href="event.html" class="nav-link">Event</a></li>
        <li><a href="contact.html" class="nav-link">Contact</a></li>
      </ul>
      
      <a href="contact.html" class="btn btn-primary">Book Discovery Call</a>
    </div>
  </nav>
  <div style="height: 44px;"></div>`;

const social_proof = `
  <!-- Social Proofing -->
  <div class="social-proof" style="background:var(--bg-light); padding:4rem 0; text-align:center;">
    <div class="container">
      <p style="font-weight:700; color:var(--text-gray); margin-bottom:2rem; text-transform:uppercase; letter-spacing:0.1em; font-size:0.9rem;">Trusted By Ambitious Brands &amp; Businesses in Kenya</p>
      <div style="display:flex; justify-content:center; gap:2rem; flex-wrap:wrap; opacity:0.7;">
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:600;"><i class="ph-fill ph-buildings" style="font-size:1.5rem; color:var(--brand-orange);"></i> Real Estate</div>
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:600;"><i class="ph-fill ph-shopping-bag" style="font-size:1.5rem; color:var(--brand-orange);"></i> Retail &amp; E-commerce</div>
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:600;"><i class="ph-fill ph-hospital" style="font-size:1.5rem; color:var(--brand-orange);"></i> Healthcare</div>
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:600;"><i class="ph-fill ph-graduation-cap" style="font-size:1.5rem; color:var(--brand-orange);"></i> Education</div>
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:600;"><i class="ph-fill ph-storefront" style="font-size:1.5rem; color:var(--brand-orange);"></i> SMEs &amp; Startups</div>
      </div>
    </div>
  </div>
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix encoding errors
  content = content.replace(/ðŸš€/g, '🚀')
                 .replace(/âœ…/g, '✅')
                 .replace(/🎟ï¸\x8f/g, '🎟️')
                 .replace(/🎟ï¸/g, '🎟️')
                 .replace(/ðŸ“±/g, '📱')
                 .replace(/ðŸ’Ž/g, '💎')
                 .replace(/ðŸ”¥/g, '🔥')
                 .replace(/ðŸ‘”/g, '👗')
                 .replace(/ðŸ¤µ/g, '🤵')
                 .replace(/💳/g, '💳')
                 .replace(/âœ/g, '✔');
                 
  // Replace nav (from <body...> to the first <header> or <section> or <!-- Event Hero --> or <!-- Header -->)
  content = content.replace(/(<body[^>]*>)[\s\S]*?(<(?:header|section|!-- Event Hero|!-- Packages|!-- Header))/i, `$1\n${nav_html}\n  $2`);
  
  // Reset all active classes
  content = content.replace(/class="nav-link active"/g, 'class="nav-link"');
  // Set current active
  content = content.replace(new RegExp(`href="${file}" class="nav-link"`, 'g'), `href="${file}" class="nav-link active"`);
  
  // Clean old social proof
  content = content.replace(/<!-- Social Proofing -->[\s\S]*?<!-- Footer -->/i, '<!-- Footer -->');
  
  // Insert social proof if missing
  if (!content.includes('Trusted By Ambitious Brands')) {
    content = content.replace('<!-- Footer -->', `${social_proof}\n  <!-- Footer -->`);
  }
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("HTML files updated successfully");

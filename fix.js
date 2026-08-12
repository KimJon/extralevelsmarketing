const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html'];

const nav_html =   <!-- Launch Banner -->
  <div class="launch-banner">
    ?? <strong>LAUNCH EVENT THIS FRIDAY!</strong> Get your business website built &amp; live for Ksh 8,999 � <a href="packages.html#launch-offer">Pre-Book Now &rarr;</a>
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
  <div style="height: 44px;"></div>;

const social_proof = 
  <!-- Social Proofing -->
  <div class="social-proof">
    <div class="container">
      <p class="proof-label">Trusted By Ambitious Brands & Businesses in Kenya</p>
      <div class="proof-logos">
        <div class="proof-item"><i class="ph-fill ph-buildings"></i> Real Estate</div>
        <div class="proof-item"><i class="ph-fill ph-shopping-bag"></i> Retail & E-commerce</div>
        <div class="proof-item"><i class="ph-fill ph-hospital"></i> Healthcare</div>
        <div class="proof-item"><i class="ph-fill ph-graduation-cap"></i> Education</div>
        <div class="proof-item"><i class="ph-fill ph-storefront"></i> SMEs & Startups</div>
      </div>
    </div>
  </div>
;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix encoding errors
  content = content.replace(/🚀/g, '??').replace(/✅/g, '?').replace(/??️/g, '???').replace(/📱/g, '??');
  
  // Replace nav
  content = content.replace(/(<body[^>]*>)[\s\S]*?(<header|<section)/i, $1\n\n  );
  
  // Active class
  content = content.replace(new RegExp(href="" class="nav-link", 'g'), href="" class="nav-link active");
  
  // Social proof
  if (!content.includes('social-proof')) {
    content = content.replace('<!-- Footer -->', ${social_proof}\n  <!-- Footer -->);
  }
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("HTML files updated successfully");

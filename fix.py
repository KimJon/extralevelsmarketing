import os
import re

files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html']
nav_html = '''  <!-- Launch Banner -->
  <div class="launch-banner">
    ?? <strong>LAUNCH EVENT THIS FRIDAY!</strong> Get your business website built &amp; live for Ksh 8,999 — <a href="packages.html#launch-offer">Pre-Book Now &rarr;</a>
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
  <div style="height: 44px;"></div>'''

social_proof = '''
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
'''

for file in files:
    with open(file, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    
    # Fix encoding errors
    content = content.replace('ðŸš€', '??').replace('âœ…', '?').replace('??ï¸\x8f', '???').replace('??', '??').replace('??', '?').replace('??', '??').replace('??', '??').replace('??', '??').replace('??', '??').replace('?', '?').replace('??', '??').replace('??', '??').replace('??', '??').replace('???', '???')
    
    # Replace anything between <body> and the end of </nav> (or <div style="height: 44px;"></div>)
    # Using regex to find the navbar part
    content = re.sub(r'(<body[^>]*>).*?(<header|<section)', r'\1\n' + nav_html + r'\n  \2', content, flags=re.DOTALL)
    
    # Add active class back
    active_str = f'href="{file}" class="nav-link"'
    active_rep = f'href="{file}" class="nav-link active"'
    content = content.replace(active_str, active_rep)
    
    # Add social proof before Footer if not present
    if 'social-proof' not in content:
        content = content.replace('<!-- Footer -->', social_proof + '\n  <!-- Footer -->')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files updated")

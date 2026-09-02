import fs from 'fs';

// 1. Remove the Launch Banner from all HTML pages
const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the entire launch banner block
    content = content.replace(/<!-- Launch Banner -->[\s\S]*?<\/div>\s*<!-- Navbar -->/, '<!-- Navbar -->');
    
    // In case the navbar still has top: 44px, remove it so it snaps to top
    content = content.replace(/<nav class="navbar" style="top: 44px;">/, '<nav class="navbar">');
    content = content.replace(/<div style="height: 44px;"><\/div>/, '');
    
    fs.writeFileSync(file, content, 'utf8');
  }
});

// 2. Disable Popup and Sidebar in main.js
const mainJs = 'js/main.js';
if (fs.existsSync(mainJs)) {
  let content = fs.readFileSync(mainJs, 'utf8');
  
  // Replace the initialization logic
  content = content.replace(/\/\/ Show popup after 2\.5s \(first visit only\)[\s\S]*?\/\/ Countdown — used on packages page/, '// Event is over - popups disabled\n\n  // Countdown — used on packages page');
  
  fs.writeFileSync(mainJs, content, 'utf8');
}

console.log("Popup and banners removed successfully");

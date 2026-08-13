import fs from 'fs';

const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html', 'js/main.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the WhatsApp format (no spaces, with country code)
    content = content.replace(/254703393126/g, '254792465156');
    
    // Replace the display format (spaced)
    content = content.replace(/0703 393 126/g, '0792 465 156');
    
    // Replace any potential unspaced display format
    content = content.replace(/0703393126/g, '0792 465 156');
    
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log("Phone numbers updated successfully");

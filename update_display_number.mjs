import fs from 'fs';

const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html', 'js/main.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the display format (0792 465 156) with (0703 393 126)
    content = content.replace(/0792 465 156/g, '0703 393 126');
    
    // Ensure the wa.me links and WA_NUMBER still use 254792465156
    // They shouldn't be affected by the above, but let's double check.
    
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log("Phone numbers updated successfully");

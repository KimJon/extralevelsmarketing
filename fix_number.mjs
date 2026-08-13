import fs from 'fs';

const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace dual numbers in footers
  content = content.replace(/0703 393 126 \/ 0703 267 865/g, '0703 393 126');
  
  // Replace stacked numbers in contact.html
  content = content.replace(/0703 267 865\s*<br>\s*0703 393 126/g, '0703 393 126');
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Phone numbers updated successfully");

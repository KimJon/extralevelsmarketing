import fs from 'fs';

const files = ['index.html', 'about.html', 'services.html', 'packages.html', 'event.html', 'contact.html'];

const newSocialLinks = `          <div class="social-links">
            <a href="https://www.tiktok.com/@extralevelske" target="_blank" rel="noopener noreferrer"><i class="ph-fill ph-tiktok-logo"></i></a>
          </div>`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the social links block
    content = content.replace(/<div class="social-links">[\s\S]*?<\/div>/g, newSocialLinks);
    
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log("Social links updated successfully");

import fs from 'fs';
import path from 'path';

const componentsDir = '/root/oddsmaster-new/src/app/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace section paddings with uniform py-20 md:py-32
  // We'll look for `<section className="py-... md:py-... ` or similar
  // and replace it with `<section className="py-20 md:py-32 `
  content = content.replace(/<section([^>]*)className="py-\d+\s+md:py-\d+/g, '<section$1className="py-20 md:py-32');
  
  // Also handle cases where there are other classes first
  content = content.replace(/<section([^>]*)className="([^"]*)py-\d+\s+md:py-\d+([^"]*)"/g, '<section$1className="$2py-20 md:py-32$3"');
  
  // Update files
  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
}

import fs from 'fs';
import path from 'path';

const componentsDir = '/root/oddsmaster-new/src/app/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the py-20 md:py-32 padding back to a more balanced py-12 md:py-20
  content = content.replace(/py-20\s+md:py-32/g, 'py-12 md:py-20');
  
  fs.writeFileSync(filePath, content);
}
console.log('Fixed padding');

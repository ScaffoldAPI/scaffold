// fix-imports.js
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');

function fixImports(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fixImports(filePath);
        } else if (file.endsWith('.js')) {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/(from\s+["'])(\.\/.*?)(["'])/g, (match, p1, p2, p3) => {
                if (!p2.endsWith('.js')) {
                    return `${p1}${p2}.js${p3}`;
                }
                return match;
            });
            fs.writeFileSync(filePath, content);
        }
    });
}

fixImports(buildDir);
const fs = require('fs');
const path = require('path');

const dirsToDel = [
    'e:/zootopia/src/app/components/ui',
    'e:/zootopia/src/app/components/figma'
];

const filesToDel = [
    'e:/zootopia/src/imports/pasted_text/petcare-ui-design.md',
    'e:/zootopia/src/app/components/Nav.tsx',
    'e:/zootopia/src/app/components/Footer.tsx',
    'e:/zootopia/src/app/components/Logo.tsx'
];

dirsToDel.forEach(d => {
    if (fs.existsSync(d)) {
        fs.rmSync(d, { recursive: true, force: true });
        console.log('Deleted directory:', d);
    }
});

filesToDel.forEach(f => {
    if (fs.existsSync(f)) {
        fs.rmSync(f, { force: true });
        console.log('Deleted file:', f);
    }
});

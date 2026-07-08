const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'app', 'pages');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(f => {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    if (content.includes('../components/DashboardShell')) {
        content = content.replace(/\.\.\/components\/DashboardShell/g, '../components/ui/DashboardShell');
        fs.writeFileSync(p, content);
        console.log('Fixed', f);
    }
});

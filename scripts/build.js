const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const SRC_DIR = path.join(__dirname, '../src');
const DOCS_DIR = path.join(__dirname, '../docs');

// Ensure docs directory exists
if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR);
}

const BOOKMARKLETS = [
    {
        file: 'check-feature-in-ulap.js',
        name: 'Check Feature in ULAP',
        description: 'Opens the ULAP web app viewer centered on the coordinates of the first hazard assessment row found.'
    },
    {
        file: 'parse-request-coords.js',
        name: 'Parse Request for Coords',
        description: 'Scans the page for DMS coordinates or KMZ/KML links and copies them to the clipboard.'
    }
];

async function build() {
    const generated = [];

    for (const b of BOOKMARKLETS) {
        const code = fs.readFileSync(path.join(SRC_DIR, b.file), 'utf8');

        // Minify
        const minified = await minify(code, {
            compress: { drop_console: false }, // keep alerts
            mangle: true
        });

        if (minified.error) {
            console.error(`Error minifying ${b.file}:`, minified.error);
            process.exit(1);
        }

        // URI Encode and format as bookmarklet
        // We strictly encode everything to be safe in href
        const encoded = 'javascript:' + encodeURIComponent(minified.code);

        // Also keep a simpler version for manual copy-paste if needed, or just use the encoded one.
        // Ideally, for bookmarklets, 'javascript:(function(){...})()' is enough, but URL encoding 
        // ensures special chars don't break the bookmark field.

        generated.push({ ...b, href: encoded });
        console.log(`✅ Built ${b.name}`);
    }

    // Generate HTML Page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HasAdmin Bookmarklets</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .bookmarklet-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #fafafa; }
        .bookmarklet-link { display: inline-block; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; cursor: grab; }
        .bookmarklet-link:hover { background: #0056b3; }
        .instructions { background: #eef; padding: 15px; border-radius: 6px; margin-bottom: 30px; }
        code { background: #eee; padding: 2px 5px; border-radius: 3px; font-family: monospace; }
        footer { margin-top: 50px; font-size: 0.9em; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
    </style>
</head>
<body>
    <h1>HasAdmin Bookmarklets</h1>
    
    <div class="instructions">
        <h3>📥 How to Install</h3>
        <p>Drag the blue buttons below directly to your browser's <strong>Bookmarks Bar</strong>.</p>
        <p>Don't see the bar? Press <code>Ctrl+Shift+B</code> (Windows/Linux) or <code>Cmd+Shift+B</code> (Mac).</p>
    </div>

    ${generated.map(g => `
    <div class="bookmarklet-card">
        <h2>${g.name}</h2>
        <p>${g.description}</p>
        <p>
            <a href="${g.href}" class="bookmarklet-link" onclick="return false;">${g.name}</a>
        </p>
        <p><small><em>Drag this button to your bookmarks bar</em></small></p>
    </div>
    `).join('\n')}

    <footer>
        <p>Generated on ${new Date().toISOString().split('T')[0]}</p>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), html);
    console.log(`🎉 Installation page generated at docs/index.html`);
}

build().catch(console.error);

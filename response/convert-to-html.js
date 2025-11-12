#!/usr/bin/env node
// Convert Markdown files to beautiful, printable HTML

const fs = require('fs');
const path = require('path');

// Simple markdown-to-html converter without dependencies
function simpleMarkdownToHtml(markdown) {
  let html = markdown;

  // Code blocks
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, '<pre class="mermaid">$1</pre>');
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links - handle markdown links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Lists
  html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');

  // Paragraphs (simple version)
  html = html.split('\n\n').map(para => {
    para = para.trim();
    if (para && !para.startsWith('<') && para.length > 0) {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');

  // Tables - basic support
  const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, header, rows) => {
    const headers = header.split('|').map(h => h.trim()).filter(h => h);
    const rowData = rows.trim().split('\n').map(row =>
      row.split('|').map(cell => cell.trim()).filter(cell => cell)
    );

    let table = '<table class="proposal-table">\n<thead>\n<tr>\n';
    headers.forEach(h => { table += `<th>${h}</th>\n`; });
    table += '</tr>\n</thead>\n<tbody>\n';
    rowData.forEach(row => {
      table += '<tr>\n';
      row.forEach(cell => { table += `<td>${cell}</td>\n`; });
      table += '</tr>\n';
    });
    table += '</tbody>\n</table>\n';
    return table;
  });

  return html;
}

function createHtmlTemplate(title, content, otherPages) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        /* Print-friendly styles */
        * {
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: #f5f5f5;
        }

        .container {
            background: white;
            padding: 3rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 8px;
        }

        /* Navigation */
        .nav {
            background: #17a2b8;
            color: white;
            padding: 1rem 2rem;
            margin: -3rem -3rem 2rem -3rem;
            border-radius: 8px 8px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav h1 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .nav-links {
            display: flex;
            gap: 1.5rem;
        }

        .nav a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background 0.3s;
        }

        .nav a:hover {
            background: rgba(255,255,255,0.2);
        }

        .nav a.active {
            background: rgba(255,255,255,0.3);
            font-weight: 600;
        }

        /* Typography */
        h1 {
            color: #23272b;
            border-bottom: 3px solid #17a2b8;
            padding-bottom: 0.5rem;
            margin-top: 2rem;
        }

        h2 {
            color: #17a2b8;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.5rem;
        }

        h3 {
            color: #23272b;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
        }

        /* Links */
        a {
            color: #17a2b8;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Code */
        code {
            background: #f4f4f4;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }

        pre {
            background: #f4f4f4;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #17a2b8;
        }

        pre code {
            background: none;
            padding: 0;
        }

        /* Tables */
        .proposal-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.95rem;
        }

        .proposal-table th {
            background: #17a2b8;
            color: white;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
        }

        .proposal-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #e0e0e0;
        }

        .proposal-table tr:nth-child(even) {
            background: #f9f9f9;
        }

        .proposal-table tr:hover {
            background: #f0f8ff;
        }

        /* Lists */
        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }

        li {
            margin: 0.5rem 0;
        }

        /* Blockquotes */
        blockquote {
            border-left: 4px solid #17a2b8;
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: #666;
            font-style: italic;
        }

        /* Horizontal rules */
        hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 2rem 0;
        }

        /* Mermaid diagrams */
        .mermaid {
            background: #f9f9f9;
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem 0;
            text-align: center;
        }

        /* Print styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }

            .container {
                box-shadow: none;
                padding: 0;
            }

            .nav {
                background: #23272b !important;
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            .proposal-table th {
                background: #17a2b8 !important;
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            a {
                color: #17a2b8 !important;
                text-decoration: underline;
            }

            h1, h2 {
                page-break-after: avoid;
            }

            .proposal-table {
                page-break-inside: avoid;
            }

            @page {
                margin: 2cm;
            }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }

            .container {
                padding: 1.5rem;
            }

            .nav {
                flex-direction: column;
                gap: 1rem;
                margin: -1.5rem -1.5rem 1rem -1.5rem;
            }

            .nav-links {
                flex-direction: column;
                width: 100%;
                gap: 0.5rem;
            }

            .nav a {
                display: block;
                text-align: center;
            }

            .proposal-table {
                font-size: 0.85rem;
            }

            .proposal-table th,
            .proposal-table td {
                padding: 0.5rem;
            }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            mermaid.initialize({ startOnLoad: true, theme: 'default' });
        });
    </script>
</head>
<body>
    <div class="container">
        <nav class="nav">
            <h1>Tata Trusts Data Visualization RFP</h1>
            <div class="nav-links">
                ${otherPages.map(page =>
                    `<a href="${page.file}" class="${page.active ? 'active' : ''}">${page.title}</a>`
                ).join('\n                ')}
            </div>
        </nav>

        <main>
            ${content}
        </main>
    </div>
</body>
</html>`;
}

// Main conversion function
function convertMarkdownToHtml() {
  const files = [
    { md: 'README.md', html: 'index.html', title: 'Technical Proposal' },
    { md: 'checklist.md', html: 'checklist.html', title: 'Requirements Checklist' },
    { md: 'review.md', html: 'review.html', title: 'Review Checklist' }
  ];

  files.forEach((file, index) => {
    const mdPath = path.join(__dirname, file.md);
    const htmlPath = path.join(__dirname, file.html);

    // Read markdown
    const markdown = fs.readFileSync(mdPath, 'utf-8');

    // Convert to HTML
    const content = simpleMarkdownToHtml(markdown);

    // Create navigation links
    const otherPages = files.map((f, i) => ({
      file: f.html,
      title: f.title,
      active: i === index
    }));

    // Generate full HTML
    const html = createHtmlTemplate(file.title + ' - Tata Trusts RFP', content, otherPages);

    // Write HTML file
    fs.writeFileSync(htmlPath, html, 'utf-8');
    console.log(`✓ Generated ${file.html}`);
  });

  console.log('\n✨ All HTML files generated successfully!');
  console.log('📄 Entry point: response/index.html');
}

// Run the conversion
convertMarkdownToHtml();

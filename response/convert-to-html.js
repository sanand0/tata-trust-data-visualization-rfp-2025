#!/usr/bin/env node
// Convert Markdown files to beautiful, printable HTML

const fs = require('fs');
const path = require('path');

// Simple markdown-to-html converter without dependencies
function simpleMarkdownToHtml(markdown) {
  let html = markdown;

  // Step 1: Protect code blocks from further processing
  const codeBlocks = [];
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    codeBlocks.push(`<pre class="mermaid">${code.trim()}</pre>`);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    codeBlocks.push(`<pre><code class="language-${lang || ''}">${code.trim()}</code></pre>`);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Step 2: Protect tables from further processing
  const tables = [];
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

    tables.push(table);
    return `__TABLE_${tables.length - 1}__`;
  });

  // Step 3: Process headers (must be done before paragraphs)
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Step 4: Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');

  // Step 5: Process lists properly
  const lines = html.split('\n');
  const processed = [];
  let inList = false;
  let listItems = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^[\-\*]\s+(.+)$/);

    if (listMatch) {
      listItems.push(`<li>${listMatch[1]}</li>`);
      inList = true;
    } else {
      if (inList && listItems.length > 0) {
        processed.push('<ul>');
        processed.push(...listItems);
        processed.push('</ul>');
        listItems = [];
        inList = false;
      }
      processed.push(line);
    }
  }

  if (inList && listItems.length > 0) {
    processed.push('<ul>');
    processed.push(...listItems);
    processed.push('</ul>');
  }

  html = processed.join('\n');

  // Step 6: Inline formatting (bold, italic, links, code)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Step 7: Process paragraphs (only wrap text that's not already HTML)
  const blocks = html.split('\n\n');
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';

    // Don't wrap if it's already HTML or a placeholder
    if (block.startsWith('<') || block.includes('__CODE_BLOCK_') || block.includes('__TABLE_')) {
      return block;
    }

    // Don't wrap single lines that look like they might be part of a list or header
    if (block.split('\n').length === 1 && block.length < 200) {
      return block;
    }

    // Wrap as paragraph, preserving internal line breaks
    return `<p>${block.replace(/\n/g, '<br>\n')}</p>`;
  }).join('\n\n');

  // Step 8: Restore protected blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`__CODE_BLOCK_${i}__`, block);
  });
  tables.forEach((table, i) => {
    html = html.replace(`__TABLE_${i}__`, table);
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
            line-height: 1.7;
            color: #2c3e50;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: #f5f7fa;
            font-size: 16px;
        }

        .container {
            background: white;
            padding: 3rem 4rem;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            border-radius: 8px;
        }

        p {
            margin: 1.2rem 0;
            text-align: justify;
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
                font-size: 11pt;
                line-height: 1.5;
            }

            .container {
                box-shadow: none;
                padding: 0;
                border-radius: 0;
            }

            .nav {
                background: #23272b !important;
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                page-break-after: avoid;
            }

            .nav-links {
                display: none;
            }

            .proposal-table {
                font-size: 10pt;
                page-break-inside: avoid;
            }

            .proposal-table th {
                background: #17a2b8 !important;
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            a {
                color: #17a2b8 !important;
                text-decoration: none;
            }

            a[href^="http"]:after {
                content: " (" attr(href) ")";
                font-size: 90%;
                color: #666;
            }

            h1 {
                font-size: 20pt;
                page-break-after: avoid;
                margin-top: 1.5em;
            }

            h2 {
                font-size: 16pt;
                page-break-after: avoid;
                margin-top: 1.2em;
            }

            h3 {
                font-size: 13pt;
                page-break-after: avoid;
            }

            h1, h2, h3, h4 {
                page-break-after: avoid;
            }

            p, ul, ol {
                orphans: 3;
                widows: 3;
            }

            pre, .mermaid {
                page-break-inside: avoid;
                border: 1px solid #ddd;
            }

            @page {
                margin: 2.5cm;
                size: A4;

                @bottom-right {
                    content: counter(page) " of " counter(pages);
                }
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

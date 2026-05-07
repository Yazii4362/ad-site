/* ============================================================
   publiKit — font-converter.js
   TTF → WOFF2 변환 + ZIP 패키징 (클라이언트 사이드)
   의존: ttf2woff2 (WASM), JSZip
   ============================================================ */

class FontConverter {
  constructor() {
    this.files = [];          // { file, name, baseName }
    this.results = [];        // { baseName, woff2Buffer }
  }

  /* ── 파일 등록 ── */
  addFiles(fileList) {
    const ttfFiles = Array.from(fileList).filter(f => f.name.toLowerCase().endsWith('.ttf'));
    if (ttfFiles.length === 0) return 0;
    ttfFiles.forEach(file => {
      const baseName = file.name.replace(/\.ttf$/i, '');
      this.files.push({ file, baseName });
    });
    return ttfFiles.length;
  }

  clear() {
    this.files = [];
    this.results = [];
  }

  /* ── 단일 TTF → WOFF2 변환 ── */
  async convertOne(fileEntry, onProgress) {
    const { file, baseName } = fileEntry;
    const arrayBuffer = await file.arrayBuffer();
    const input = new Uint8Array(arrayBuffer);

    onProgress?.(`${baseName} 변환 중...`);

    // ttf2woff2 글로벌 함수 사용 (CDN 로드 필요)
    if (typeof ttf2woff2 === 'undefined') {
      throw new Error('ttf2woff2 라이브러리가 로드되지 않았습니다.');
    }
    const woff2Buffer = ttf2woff2(input);
    return { baseName, woff2Buffer };
  }

  /* ── 전체 변환 ── */
  async convertAll(onProgress) {
    this.results = [];
    for (const entry of this.files) {
      const result = await this.convertOne(entry, onProgress);
      this.results.push(result);
    }
    return this.results;
  }

  /* ── @font-face CSS 생성 ── */
  static buildFontFaceCSS(baseName) {
    return `/* publiKit 생성 — @font-face */
@font-face {
  font-family: '${baseName}';
  src: url('./fonts/${baseName}.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;
  }

  /* ── demo.html 생성 ── */
  static buildDemoHTML(baseName) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${baseName} — 폰트 미리보기 (publiKit)</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: #f4f6fb;
      font-family: '${baseName}', sans-serif;
    }
    .demo-header {
      background: #fff;
      border: 2px solid #141414;
      border-radius: 16px;
      box-shadow: 6px 6px 0 #141414;
      padding: 32px 40px;
      margin-bottom: 24px;
    }
    .font-name {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1B6FFF;
      margin-bottom: 8px;
    }
    .sample-lg { font-size: 48px; line-height: 1.15; font-weight: normal; margin-bottom: 12px; }
    .sample-md { font-size: 24px; line-height: 1.4; color: #5A6078; margin-bottom: 12px; }
    .sample-sm { font-size: 16px; line-height: 1.7; color: #5A6078; }
    .charset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
      gap: 8px;
      background: #fff;
      border: 2px solid #141414;
      border-radius: 16px;
      box-shadow: 4px 4px 0 #141414;
      padding: 24px;
    }
    .char-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px; height: 48px;
      font-size: 22px;
      border: 1px solid #D8DCE8;
      border-radius: 8px;
      background: #F4F6FB;
    }
  </style>
</head>
<body>
  <div class="demo-header">
    <p class="font-name">📦 ${baseName} — publiKit 웹폰트 변환 결과</p>
    <p class="sample-lg">가나다라마바사 아자차카타파하</p>
    <p class="sample-lg">ABCDEFG abcdefg 0123456789</p>
    <p class="sample-md">The quick brown fox jumps over the lazy dog.</p>
    <p class="sample-sm">웹 퍼블리셔를 위한 CSS 자동 생성 도구, publiKit. 이 폰트는 WOFF2 형식으로 최적화되어 있습니다.</p>
  </div>
  <div class="charset-grid">
    ${Array.from('가나다라마바사아자차카타파하ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%').map(c => `<span class="char-item">${c}</span>`).join('\n    ')}
  </div>
</body>
</html>`;
  }

  /* ── ZIP 패키징 & 다운로드 ── */
  async buildAndDownloadZip(onProgress) {
    if (this.results.length === 0) throw new Error('변환된 파일이 없습니다.');
    if (typeof JSZip === 'undefined') throw new Error('JSZip 라이브러리가 로드되지 않았습니다.');

    const isSingle = this.results.length === 1;
    const zipName  = isSingle
      ? `${this.results[0].baseName}_publiKit.zip`
      : `fonts_publiKit.zip`;

    const zip = new JSZip();

    for (const { baseName, woff2Buffer } of this.results) {
      onProgress?.(`${baseName} ZIP 패키징 중...`);
      const folder = isSingle ? zip : zip.folder(baseName);

      // fonts/[baseName].woff2
      (isSingle ? zip.folder('fonts') : folder.folder('fonts'))
        .file(`${baseName}.woff2`, woff2Buffer);

      // style.css
      (isSingle ? zip : folder)
        .file('style.css', FontConverter.buildFontFaceCSS(baseName));

      // demo.html
      (isSingle ? zip : folder)
        .file('demo.html', FontConverter.buildDemoHTML(baseName));
    }

    onProgress?.('ZIP 압축 생성 중...');
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });

    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = zipName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    return zipName;
  }
}

window.FontConverter = FontConverter;
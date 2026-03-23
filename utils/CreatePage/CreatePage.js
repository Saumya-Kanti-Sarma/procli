import fs from "fs";
import path from "path";

class NextCliPageCreator {
  constructor(route) {
    this.route = route;
    this.config = this.loadConfig();
    this.pageDir = path.join("src", "app", route);

    this.fileName = this.getPageFileName();
    this.filePath = path.join(this.pageDir, this.fileName);

    this.cssFileName = this.getCssFileName();
    this.cssImportLine = this.getCssImport();
  }

  // Reads nextcli.config.json
  loadConfig() {
    const raw = fs.readFileSync("./nextcli.config.json", "utf-8");
    return JSON.parse(raw);
  }

  getPageFileName() {
    return this.config.language === "javascript" ? "page.jsx" : "page.tsx";
  }

  getCssFileName() {
    if (this.config.css === "modular") return "page.module.css";
    if (this.config.css === "common") return "page.css";
    return null; // tailwind
  }

  getCssImport() {
    if (this.config.css === "modular")
      return "import styles from './page.module.css';";
    if (this.config.css === "common")
      return "import './page.css';";
    return null;
  }

  createPageTemplate() {
    return `// route created using next-cli-toolkit; do visit us on https://npmjs.com/package/next-cli-toolkit;
//please drop a star in our github https://github.com/Saumya-Kanti-Sarma/next-cli-toolkit;

"use client";
export default function Page() {
  return (
    <div>
      <h1>${this.fileName}</h1>
    </div>
  );
}`;
  }

  createDirectory() {
    fs.mkdirSync(this.pageDir, { recursive: true });
  }

  createPageFile() {
    fs.writeFileSync(this.filePath, this.createPageTemplate());
  }

  injectCssImport() {
    if (!this.cssImportLine) return;

    const fileData = fs.readFileSync(this.filePath, "utf8");
    const lines = fileData.split("\n");

    // Insert after "use client"
    lines.splice(4, 0, this.cssImportLine);

    fs.writeFileSync(this.filePath, lines.join("\n"));
  }

  createCssFile() {
    if (!this.cssFileName) return;

    const cssContent = `/*This CSS file was created by using next-cli-toolkit
do visit us on https://npmjs.com/package/next-cli-toolkit  
please drop a star in our github https://github.com/Saumya-Kanti-Sarma/next-cli-toolkit
*/`;

    fs.writeFileSync(path.join(this.pageDir, this.cssFileName), cssContent);
  }

  // main execution method
  run() {
    this.createDirectory();
    this.createPageFile();
    this.injectCssImport();
    this.createCssFile();
  }
}

export default NextCliPageCreator;
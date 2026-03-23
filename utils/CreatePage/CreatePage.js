import fs from "fs";
export default function CreatePage(route) {
  const config = JSON.parse(fs.readFileSync("./nextcli.config.json", "utf-8"));
  const pageDir = `./src/app/${route}`;
  if (config.useTypeScript) {
    fs.writeFileSync(`${pageDir}/page.tsx`, `// route created using next-cli-toolkit; do visit us on https://npmjs.com/package/next-cli-toolkit
      "use client";
      export default function ${Page}() {
        return (
          <div>
            <h1>${pageDir}</h1>
          </div>
        );
      }
      `);
  } else {
    fs.writeFileSync(`${pageDir}/page.jsx`, `// route created using next-cli-toolkit; do visit us on https://npmjs.com/package/next-cli-toolkit
      "use client";
      export default function Page() {
        return (
          <div>
            <h1>${pageDir}</h1>
          </div>
        );
      }
      `);
  }
}
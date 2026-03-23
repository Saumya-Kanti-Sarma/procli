import fs from "fs";

export default function CreateNextCliConfig() {
  const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const configFile = {
    framework: null,
    language: "javascript",
    css: "common" // "common | modular | tailwind
  }

  configFile.language = "typescript" in packageJSON.devDependencies ? "typescript" : "javascript";
  configFile.css = "tailwindcss" in packageJSON.devDependencies ? "tailwind" : "common";
  configFile.framework = "next" in (packageJSON.dependencies ?? {}) ? "nextjs" : "vite";

  fs.writeFileSync("./nextcli.config.json", `{
  "framework": "${configFile.framework}",
  "language": "${configFile.language}",
  "css": "${configFile.css}"
}

    `)
}
#!/usr/bin/env node
import CreateNextCliConfig from "./utils/CreateNextCliConfig/CreateNextCliConfig.js";
import NextCliPageCreator from "./utils/CreatePage/CreatePage.js";
const input = process.argv;

// if input is "init" then run init.js
if (input[2] == "init") CreateNextCliConfig();
else if (input[2] == "help") {
  console.log("Usage: nextcli <command>");
  console.log("Commands:");
  console.log("  init: Initialize the CLI toolkit; It creates nextcli.config.json file that has properties of your codebase");
  console.log("  page route/to/page : Creates the page");
  console.log("  conponent route/to/page : Creates the page");
}
// if input is "page" then run page.js
else if (input[2] == "page") {
  const createpage = new NextCliPageCreator(input[3]);
  createpage.run();

}
// if input is "component" then run component.js


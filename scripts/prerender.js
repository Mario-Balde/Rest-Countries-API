/* Pre-renders the React application at build time by fetching country data, generating HTML,
and embedding the initial dataset for client-side hydration. */

import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

const apiUrl = "https://rest-countries-api-psi-five.vercel.app/api/countries";

async function prerender() {
  let vite;

  try {
    console.log("Fetching country data...");

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const countries = await response.json();

    if (!Array.isArray(countries) || countries.length === 0) {
      throw new Error("The API returned no country data.");
    }

    console.log(`Fetched ${countries.length} countries.`);

    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    console.log("Rendering React application...");

    const appHtml = render("/", countries);

    const distPath = resolve("dist");
    const indexPath = resolve(distPath, "index.html");

    let html = await readFile(indexPath, "utf-8");

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );

    const initialData = JSON.stringify(countries).replace(/</g, "\\u003c");

    html = html.replace(
      "</body>",
      `<script>window.__INITIAL_COUNTRIES__ = ${initialData};</script>
  </body>`,
    );

    await writeFile(indexPath, html);

    console.log("Pre-rendering completed successfully.");
  } finally {
    if (vite) {
      await vite.close();
    }
  }
}

prerender().catch((error) => {
  console.error("Pre-rendering failed:", error);
  process.exitCode = 1;
});

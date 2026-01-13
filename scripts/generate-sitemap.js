
const fs = require("fs");
const path = require("path");
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");



const DOMAIN = "https://www.egglesscakes.in";


const dropdownHrefs = [
  // Cakes
  "chocolate-cakes",
  "vanilla-flavor",
  "redVelvet-flavor-cakes",
  "fruit-cakes",
  "pineapple-flavor-cakes",
  "butterscotch-flavor-cakes",

  // Theme Cakes
  "cartoon-theme-cakes",
  "superhero-theme-cakes",
  "cricket-theme-cakes",
  "nature-theme-cakes",

  // Desserts
  "Cupcakes",
  "brownies",
  "cookies",
  "pastries",
  "muffins",
  "donuts",

  // Birthday
  "kids-birthday",
  "adult-birthday",
  "milestone-birthday",
  "surprise-birthday",
  "birthday-combos",
  "birthday-Specials",

  // Anniversary
  "FirstAnniversary-cakes",
  "anniversary-cakes",

  // Occasion
  "friendship-day-cakes",
  "baby-shower-cakes",
  "farewell-cakes",
  "congratulations-cakes",

  // Customized Cakes
  "photo-cakes",
  "name-cakes",
  "designer-cakes",
  "fondant-cakes",
  "custom-flavor-cakes"
];


const urls = [
  "",
  "/about-us",
  "/contact",
  ...dropdownHrefs.map(slug => `/cakes/${slug}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`).join("")}
</urlset>`;

fs.writeFileSync(outputPath, sitemap);

console.log("✅ sitemap.xml generated");

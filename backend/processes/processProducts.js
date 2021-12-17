import cheerio from "cheerio";

import Product from "../models/productModel.js";
import fetchResource from "../utils/fetchResource.js";

const saveToDB = async (result) => {
  for (let i = 0; i < result.length; i++) {
    const $ = cheerio.load(result[i]);
    let row,
      j = 2;
    do {
      row = $(`span[cel_widget_id=MAIN-SEARCH_RESULTS-${j++}]`);
      if (row.length) {
        console.log("Entry ", j);
        const title = row
          .find("a.a-text-normal")
          .first()
          .text()
          .replace(/\s+/g, " ")
          .trim(); // title
        const image = row.find("img").attr("src"); // image
        const price = row.find("a span.a-offscreen").first().text(); // price
        const rating = row.find("span.a-icon-alt").text().split(" ")[0]; // reviews

        let product = Product.build({
          title,
          image,
          price,
          rating,
        });
        await product.save(); //TODO: batch add
      }
    } while (j < 30);
  }
};

const processProducts = async (job, done) => {
  let { data } = job;
  if (!data) {
    return done(new Error("No keywords provided"));
  }

  data = data.keywords.split(",");

  let fetchPromises = [];
  for (let i = 0; i < data.length; i++) {
    fetchPromises.push(await fetchResource(data[i]));
  }

  saveToDB(fetchPromises);

  done(null, { samplerate: 48000 /* etc... */ });
};

export { processProducts };

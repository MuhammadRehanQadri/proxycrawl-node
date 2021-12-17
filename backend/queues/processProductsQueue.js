import Bull from "bull";

import { processProducts } from "../processes/processProducts.js";

const productQueue = new Bull("product", process.env.REDIS_URL);

productQueue.process(processProducts);

const processProductsByKeywords = (data) => {
  productQueue.add(data, {
    attempts: 5,
    repeat: { cron: '0 10 * * MON' }
  });
};

export { processProductsByKeywords };

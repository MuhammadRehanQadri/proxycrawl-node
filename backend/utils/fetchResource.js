import https from "https";

const fetchResource = (query) => {
  return new Promise((resolve, reject) => {
    const url = encodeURIComponent("https://www.amazon.com/s?k=" + query);
    const options = {
      hostname: process.env.HOST_NAME,
      path: `/?token=${process.env.PROXY_CRAWL_TOKEN}&url=${url}`,
    };

    https
      .request(options, (response) => {
        let body = "";
        response
          .on("data", (chunk) => (body += chunk))
          .on("end", () => {
            resolve(body);
          })
          .on("error", (err) => reject(err));
      })
      .end();
  });
};

export default fetchResource;

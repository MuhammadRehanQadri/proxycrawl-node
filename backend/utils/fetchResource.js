import https from "https";
import fs from 'fs'

const fetchResource = (query) => {
  return new Promise((resolve, reject) => {
    const url = encodeURIComponent("https://www.amazon.com/s?k=" + query);
    const options = {
      hostname: "api.proxycrawl.com",
      path: "/?token=k34DqjyeD_0KqTc0GFOoXw&url=" + url,
    };

    https
      .request(options, (response) => {
        let body = "";
        response
          .on("data", (chunk) => (body += chunk))
          .on("end", () => {
              fs.writeFile('dump.txt', body, function (err) {
                  if (err) throw err;

                  console.log('********** Saved *************');
              })
              resolve(body)
            })
          .on("error", (err) => reject(err));
      })
      .end();
  });
};

export default fetchResource;

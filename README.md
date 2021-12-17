# proxycrawl-node
ProxyCrawl Node library for scraping and crawling

Step 1:
Clone .env.test to .env

Step 2:
You must have installed redis

Step 3:
npm run dev to run the application


On application start, the application will fetch the keywords defined in the .env from amazon product SERP by adding a job to the queue. Once completed, they'll be visible on frontend home screen. You can change the keywords to your likings and the application will adapt according to it. The database used is in memory.

Please feel free to ask any questions/ambiguities at `rehan.code@gmail.com`.

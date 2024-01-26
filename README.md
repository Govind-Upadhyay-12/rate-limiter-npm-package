# Install Dependency from npm site

To install the "rate-guardian" npm package, use the following command in your terminal or command prompt:

```bash
npm install rate-guardian


//sourcr-code how to use it

const express = require("express");
const RateLimiter = require("rate-guardian");

const app = express();
const PORT = process.env.PORT || 3000;

const rateLimiter = new RateLimiter(5, 10000, 3);

app.use((req, res, next) => {
  if (rateLimiter.getToken(req.ip)) {
    next();
  } else {
    res.status(429).send("Too Many Requests");
  }
});

app.get("/api/resource", (req, res) => {
  res.json({ message: "This is your protected resource." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



Thanks

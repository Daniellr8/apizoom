const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json());

app.use("/api", require('./src/routers/meet.routes'));


app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});

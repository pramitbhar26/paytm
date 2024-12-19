const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(cors());
app.use(express.json())
const rootRouter = require("./routes/index.js");

app.listen(process.env.PORT,()=>{
    console.log("Server Started on port 3000");
});
app.use('/api/v1',rootRouter);
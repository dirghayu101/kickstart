const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")
const data = require("./data/priceCardData.json")
const bodyParser = require("body-parser");
const client = require("./database/connection");
const path = require("path");


app.use("/", express.static("./frontend"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

//Email: adminkickstart@kickstart.com
//password: adminPassword

//NOTE A security issue is that I can access any file in the directory using the /path, so I have to fix this.

app.get("/price/:fileName", (req, res) => {
  const requestKeyword = req.params.fileName;
  if (requestKeyword === "PrivateOffice") {
    res.render("template", { data: data[0] });
  } else if (requestKeyword === "HotSeat") {
    res.render("template", { data: data[1] });
  } else if (requestKeyword === "ConferenceRoom") {
    res.render("template", { data: data[2] });
  } else {
    res.render("template", { data: data[3] });
  }
});

app.use("/admin", adminRoutes)
app.use("/user", userRoutes)

const port = process.env.PORT || 3000

const start = async () => {
  try{
    await client.connect();
    app.listen(port, () => 
      console.log(`Server is listening on port ${port}`)
    )
  }catch(error){
    console.log(error);
  }
};

start();
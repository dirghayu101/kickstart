const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const client = require("./database/connection");

const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")
const priceRoutes = require("./routes/price")

app.use("/", express.static("./frontend"));
app.set("view engine", "ejs");
app.use(bodyParser.json());

//Email: adminkickstart@kickstart.com
//password: adminPassword

//NOTE A security issue is that I can access any file in the directory using the /path, so I have to fix this.

app.use("/price", priceRoutes)
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


const populateDatabase = () => {
  const dbPopulate = require("./controllers/populate")
  let seatArr = []
  dbPopulate.generateIDsForHotSeat(seatArr)
  dbPopulate.insertInHotSeat(seatArr)
  seatArr = []
  dbPopulate.generateIDsForCubicle(seatArr)
  dbPopulate.insertInCubicle(seatArr)
  seatArr = []
  dbPopulate.generateIDsForConferenceRoom(seatArr)
  dbPopulate.insertInConferenceRoom(seatArr)
  seatArr = []
  dbPopulate.generateIDsForPrivateOffice(seatArr)
  dbPopulate.insertInPrivateOffice(seatArr)
}


const deleteRowsInReservationTables = () => {
  const dbPopulate = require("./controllers/populate")
  dbPopulate.deleteRowsInAllTable()
}


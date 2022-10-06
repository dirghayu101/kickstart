const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcryptjs");
const client = require("./connection");
const ejs = require("ejs");
const { existsSync } = require("fs");
const jwt = require("jsonwebtoken");
const data = require("./data/priceCardData.json");
const adminData = require("./data/adminDataObjects");

app.use(express.static("./frontend"));
app.use(bodyParser.json());
app.set("view engine", "ejs");
client.connect();

app.get("/price:fileName", (req, res) => {
  const requestKeyword = req.params.fileName;
  if (requestKeyword === "PrivateOffice") {
    res.render("index", { data: data[0] });
  } else if (requestKeyword === "HotSeat") {
    res.render("index", { data: data[1] });
  } else if (requestKeyword === "ConferenceRoom") {
    res.render("index", { data: data[2] });
  } else {
    res.render("index", { data: data[3] });
  }
});

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "./frontend/home.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/sign-up.html"));
});

app.get("/template", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/template.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/login.html"));
});

app.get("/admin-login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/admin-login.html"));
});

app.get("/admin:path", (req, res) => {
  const requestKeyword = req.params.path;
  if (requestKeyword === "dashboard") {
    res.render("admin-panel", { data: adminData.dashboard });
  } else if (requestKeyword === "users") {
    console.log(adminData.users.table);
    res.render("admin-panel", { data: adminData.users });
  } else if (requestKeyword === "orders") {
    res.render("admin-panel", { data: adminData.orders });
  } else if (requestKeyword === "messages") {
    res.render("admin-panel", { data: adminData.messages });
  } else if (requestKeyword === "products") {
    res.render("admin-panel", { data: adminData.products });
  } else if (requestKeyword === "reports") {
    res.render("admin-panel", { data: adminData.reports });
  } else if (requestKeyword === "settings") {
    res.render("admin-panel", { data: adminData.settings });
  } else {
    if (requestKeyword === "addProducts") {
      res.render("admin-panel", { data: adminData.addProducts });
    }
  }
});

app.post("/api/signup", async (req, res) => {
  console.log(req.body);
  const {
    password: plainTextPassword,
    firstName,
    lastName,
    phoneNumber,
    emailID,
    gender,
  } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    var insertQuery = `INSERT INTO public."User"(
            "fName", "lName", "phoneNumber", password, "eMail", gender)
            VALUES ('${firstName}', '${lastName}', ${phoneNumber}, '${password}', '${emailID}', 'Male' )`;

    console.log(insertQuery);
    client.query(insertQuery, (err, result) => {
      if (!err) {
        console.log("Insertion was successful!");
      } else {
        var error = err;
        throw error;
      }
      client.end;
    });
  } catch (error) {
    if (error.code === 23505) {
      return res.json({
        status: "error",
        error: "Mobile Number or email address already exist.",
      });
    } else {
      throw error;
    }
  }
  res.json({ status: "ok" });
});

/* 

	
SELECT "eMail", password FROM public."User" WHERE "eMail" = 'dirghayujoshi48@gmail.com';
*/

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Here");
  try {
    const getQuery = `SELECT "eMail", password FROM public."User" WHERE "eMail"='${email}'`;
    const result = await client.query(getQuery);
    client.end;
    const { rows } = result;
    if (rows.length === 0) {
      throw error;
    }
    if (bcrypt.compare(password, rows[0].password)) {
      res.json({ status: "ok", data: "Coming soon..." });
    }
  } catch (error) {
    res.json({ status: "error", data: "Invalid username/password" });
  }
});

// API starts here.

app.get("/admin/users", async (req, res) => {
  const selectQuery = `SELECT "fName", "lName", "phoneNumber", "eMail"
        FROM public."User"`;

  const { rows } = await client.query(selectQuery);
  res.send(rows);
  client.end;
});

app.get("/admin/users/:id", async (req, res) => {
  const queryName = req.params.id;
  const query = `SELECT "fName", "lName", "eMail", "phoneNumber" FROM public."User" WHERE "fName"='${queryName}'`;
  const { rows } = await client.query(query);
  res.send(rows);
  client.end;
});

app.post("/admin/users", async (req, res) => {
  console.log(req.body);
    const {
    password,
    firstName,
    lastName,
    phoneNumber,
    emailID,
    gender,
  } = req.body;
  insertQuery = `INSERT INTO public."User"(
        "fName", "lName", "phoneNumber", password, "eMail", gender)
        VALUES ('${firstName}', '${lastName}', ${phoneNumber}, '${password}', '${emailID}', 'Male' )`;

        await client.query(insertQuery, (err, result) => {
            if (!err) {
              res.send("Insertion was successful!");
            } else {
              var error = err;
              throw error;
            }
            client.end;
          });
});

/*
UPDATE public."User"
	SET "fName"=?, "lName"=?, "phoneNumber"=?, password=?, "eMail"=?, gender=?
	WHERE <condition>;
*/

app.put("/admin/users/:id", async (req, res) => {
  const queryName = req.params.id;
  let user = req.body;
  let updateQuery = `UPDATE public."User" SET "fName"='${user.firstName}', "lName"='${user.lastName}' WHERE "fName"='${queryName}'`;

  await client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

// DELETE FROM public."User"
	// WHERE <condition>;

app.delete("/admin/users/:id", (req, res) => {
    const queryName = req.params.id;
 
    let insertQuery = `DELETE FROM public."User" WHERE "fName"='${queryName}'`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
// API ends here.

app.listen(3000, () => {
  console.log(adminData.dashboard.classValue);
  console.log(path.resolve(__dirname, "./frontend/home.html"));
  console.log("server is listening on port 3000....");
});

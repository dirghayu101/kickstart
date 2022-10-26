const path = require("path");
const db = require('./databaseRequests')
const jwt = require("jsonwebtoken");
const client = require("../database/connection");
const bcrypt = require("bcryptjs");

const adminLogin = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/admin-login.html"));
}

const adminLoginPost = async (req, res) => {
    const { email, password } = req.body;
    let rows = await db.getAdmin(email);
    if (rows.length === 0) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }
    if (await bcrypt.compare(password, rows[0].password)) {

    } else {
      return res.json({ status: "error", error: "Invalid username/password" });
    }
    const token = jwt.sign(
      {
        email: rows[0].email,
      },
      process.env.JWT_ADMIN
    );
  
    res.json({ status: "ok", data: token });
}

//TODO JWT verification will go to a middleware.
//TODO Table not updating fix.
//TODO Error response for resources not available.

const adminDashboardPath = async (req, res) => {
    if (!jwt.verify(req.headers.authorization, process.env.JWT_ADMIN)) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }
    const adminData = require("../data/adminDataObjects");
    const requestKeyword = req.params.path;
    if (requestKeyword === "dashboard") {
      res.render("admin-panel", { data: adminData.dashboard });
    } else if (requestKeyword === "users") {
      let users = await adminDashboardGetUsers()
      res.render("admin-panel-user", {
        data: adminData.users,
        tableValues: users,
      });
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
  }

  //TODO These all database functions should also have a middleware for JWT authorization. 

  const adminDashboardGetUsers = () => {
    return db.getAllUsers()
  }

const adminDashboardInsertUser = (req, res) => {
    db.insertUser(req.body);
}

const adminDashboardUpdateUser = (req, res) => {
    const phoneNumber = req.params.id;
    let user = req.body;
    db.updateUser(user, phoneNumber)
}

const adminDashboardDeleteUser = (req, res) => {
    const phoneNumber = req.params.id;
    db.deleteUser(phoneNumber);
}

const admin = {adminLogin, adminLoginPost, adminDashboardPath, adminDashboardGetUsers, adminDashboardInsertUser, adminDashboardUpdateUser, adminDashboardDeleteUser}

module.exports = admin
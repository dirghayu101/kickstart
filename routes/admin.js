const express = require("express");
const app = express();
const router = express.Router();
const admin = require("../controllers/admin");

router.get("/login", admin.adminLogin);

router.post("/login", admin.adminLoginPost);

router.get("/:path", admin.adminDashboardPath);

//This path is not working.
router.get("/users", admin.adminDashboardGetUsers);

router.post("/users", admin.adminDashboardInsertUser);

router.put("/users/update/:id", admin.adminDashboardUpdateUser);

router.delete("/users/delete/:id", admin.adminDashboardDeleteUser);

module.exports = router;

const express = require("express");
const cors = require("cors");
const app = express();
const ApiError = require("./app/api-error");

const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json ({
        message: err.message || "Internal Server Error",
    });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my app!" });
});


module.exports = app;
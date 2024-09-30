const express = require("express");
const dotenv = require("dotenv").config();
const auth = require("./utils/auth");

const session = require("express-session");
const passport = require("passport");

// importing routes

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(
  session({
    secret: "cats",
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send('<a href="/user/auth/google">Authenticate with Google</a>');
});

// routes
app.use("/user", userRoutes);

app.listen(5000, () => {
  console.log(`listening on port ${PORT}`);
});

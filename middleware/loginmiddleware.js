const isLoggedIn = async (req, res, next) => {
  try {
    if (req.user) {
      return next(); // Proceed if the user is logged in
    } else {
      return res.status(401).send({
        // Handle the case where user is not logged in
        success: false,
        message: "User not logged in",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in logging in",
    });
  }
};

module.exports = isLoggedIn

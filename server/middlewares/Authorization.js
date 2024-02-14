const authorizationForAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizationForAdmin };

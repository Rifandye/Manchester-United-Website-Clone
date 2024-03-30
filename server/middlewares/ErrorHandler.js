const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "EmailIsRequired":
      res.status(400).json({ message: "Email cannot empty" });
      break;
    case "PasswordIsRequired":
      res.status(400).json({ message: "Password cannot empty" });
      break;
    case "EmailNotRegistered":
      res.status(400).json({ message: "Email/Invalid is invalid" });
      break;
    case "CategoryNotFound":
      res.status(404).json({ message: "Category not Not Found" });
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "Forbidden":
      res.status(401).json({ message: "Only Admin can do this!" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Merchandise not found" });
      break;
    case "FileIsRequired":
      res.status(400).json({ message: "File Is Required" });
      break;
    case "CuisineToUpdateImage":
      res.status(400).json({ message: "Cuisine Id Not Found" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;

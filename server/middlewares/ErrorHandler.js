const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "EmailIsRequired":
      res.status(400).json({ message: "Email cannot empty" });
      break;
    case "PasswordIsRequired":
      res.status(400).json({ message: "Password cannot empty" });
      break;
    case "EmailNotRegistered":
      res.status(400).json({ message: "Email/Invalid is required" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;

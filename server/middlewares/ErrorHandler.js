const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "FirstNameRequired":
      res.status(400).json({ message: "First Name Required" });
      break;
    case "LastNameRequired":
      res.status(400).json({ message: "Last Name Required" });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Email Required" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Password Required" });
      break;
    case "InvalidLoginData":
      res.status(400).json({ message: "Invalid Email/Password" });
      break;
    case "UserNotRegistered":
      res.status(404).json({ message: "User Not Found" });
      break;
    case "InvalidMerchId":
      res.status(404).json({ message: "Merchandise Not Found" });
      break;
    case "OrderNotFound":
      res.status(404).json({ message: "Order Not Found" });
      break;
    case "CannotRemovePaidMerch":
      res.status(400).json({ message: "Cannot Remove Paid Merchandise" });
      break;
    case "CartNotFound":
      res.status(400).json({ message: "Cart Not Found" });
      break;
    case "InvalidToken":
      res.status(401).json({ message: "Invalid Token" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;

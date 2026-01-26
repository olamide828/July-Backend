const RoleAuthenticate = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401).json({ message: "You are not Authorized" });
    }
    next();
  };
};

module.exports = RoleAuthenticate;

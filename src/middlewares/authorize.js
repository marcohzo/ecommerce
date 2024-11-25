export const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }

    const userRole = req.user.role;
    console.log(userRole);

    if (userRole !== requiredRole) {
      return res.status(403).send({ status: "error", message: "Forbidden" });
    }

    next();
  };
};

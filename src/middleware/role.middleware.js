// auth.middleware.js

// gets role from previous middleware - > checks if the roles is allowed ? controller : reutrn  error for not authorise to use

export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    console.log(roles);

    // console.log(req);
    if (!roles.includes(req.role)) {
      // return if the roles in not allowed
      return res.status(403).json({
        message: `Role (${req.role}) not allowed`,
      });
    }
    next(); // pass the request to next function
  };
};

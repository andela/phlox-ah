
/**
 * @function
 * @description middleware for doing role-based permissions
 * @param {array} allowed - An array of permitted roles
 * @param {object} req The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 * @param {object} next - The next function to call if validation passes
 * @returns {object} - status Message if validation fails or proceeds to next()
 */
export default function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      next(); // if role is allowed, then continue on the next middleware
    } else {
      res.status(403).json({ success: false, message: 'No Permission to Access this Resources' });
    }
  };
}

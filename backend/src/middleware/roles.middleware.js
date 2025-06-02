export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role) {
      return res
        .status(403)
        .json({ message: 'Access denied. No role assigned.' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
}

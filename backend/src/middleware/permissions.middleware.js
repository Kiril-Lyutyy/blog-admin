export function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user || !Array.isArray(req.user.permissions)) {
      return res
        .status(403)
        .json({ message: 'Access denied: No permissions found' });
    }

    if (!req.user.permissions.includes(permission)) {
      return res
        .status(403)
        .json({ message: 'Access denied: Permission not granted' });
    }

    next();
  };
}

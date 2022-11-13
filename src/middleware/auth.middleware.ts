import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authorizePermissions = (...roles: any) => {
  console.log(roles);
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access this route' });
    }
    next();
  };
};

export default authorizePermissions;

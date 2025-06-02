import { Request, Response } from "express";

export const requireAuth = (req: Request, res: Response, next: Function) => {
  if (!req.session.id) {
    return res.redirect("/api/login");
  }
  next();
};

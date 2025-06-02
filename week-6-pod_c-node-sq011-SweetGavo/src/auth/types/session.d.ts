import { Session } from "express-session";

export interface ISession extends Session {
  id?: string;
  email?: string;
  userName?: string;
}

declare module 'express-session' {
    interface SessionData {
      id?: any;
      email?: string;
      userName?: string;
    }
  }

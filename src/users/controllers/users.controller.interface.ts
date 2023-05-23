import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../common/base.controller';

export interface IUsersController extends BaseController {
  create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  find: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  // delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

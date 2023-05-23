import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base.controller';
import { IUsersController } from './users.controller.interface';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.service.interface';
import { NextFunction, Request, Response } from 'express';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { UserRegisterDto } from '../dto/user-register.dto';
import { IUsersService } from '../service/users.service.interface';
import { HTTPError } from '../../errors/http-error';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(TYPES.Logger) private loggerService: ILogger,
    @inject(TYPES.UsersService) private readonly usersService: IUsersService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.create,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/:id',
        method: 'get',
        func: this.find,
      },
      {
        path: '/:id',
        method: 'put',
        func: this.update,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/:id',
        method: 'delete',
        func: this.delete,
      },
    ]);
  }

  async create(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const newUser = await this.usersService.create(body);

    if (!newUser) {
      return next(new HTTPError(422, 'User already exists'));
    }

    this.ok(res, newUser);
  }

  async find(
    { params }: Request<{ id?: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const findedUser = await this.usersService.find(Number(params.id));

    if (!findedUser) {
      return next(new HTTPError(404, 'User is not found!', 'UsersController'));
    }

    this.ok(res, findedUser);
  }

  async update(
    { body, params }: Request<{ id?: string }, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const updatedUser = await this.usersService.update(Number(params.id), body);

    if (!updatedUser) {
      return next(new HTTPError(404, 'Record to update not found.', 'UsersController'));
    }

    this.ok(res, updatedUser);
  }

  async delete(
    { params }: Request<{ id?: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const deletedUser = await this.usersService.delete(Number(params.id));

    if (!deletedUser) {
      return next(new HTTPError(404, 'User is not found!', 'UsersController'));
    }

    this.ok(res, deletedUser);
  }
}

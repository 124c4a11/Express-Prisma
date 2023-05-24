import { inject, injectable } from 'inversify';
import { BaseController } from '../../../common/base.controller';
import { IPostsController } from './posts.controller.interface';
import { TYPES } from '../../../types';
import { ILogger } from '../../../logger/logger.service.interface';
import { Request, Response, NextFunction } from 'express';
import { IPostsService } from '../service/posts.service.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { HTTPError } from '../../../errors/http-error';

@injectable()
export class PostsController extends BaseController implements IPostsController {
  constructor(
    @inject(TYPES.Logger) private readonly loggerService: ILogger,
    @inject(TYPES.PostsService) private readonly postsService: IPostsService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/create',
        method: 'post',
        func: this.create,
      },
      {
        path: '/:id',
        method: 'get',
        func: this.find,
      },
      {
        path: '/:id',
        method: 'delete',
        func: this.delete,
      },
    ]);
  }

  async create(
    { body }: Request<{}, {}, CreatePostDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const createdPost = await this.postsService.create(body);

    if (!createdPost) {
      return next(new HTTPError(422, 'Something went wrong!', '[PostsController]'));
    }

    this.ok(res, createdPost);
  }

  async find(
    { params }: Request<{ id?: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const findedPost = await this.postsService.find(Number(params.id));

    if (!findedPost) {
      return next(new HTTPError(404, 'Post not found!', '[PostsController]'));
    }

    this.ok(res, findedPost);
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    this.ok(res, 'Posts Controller');
  }

  async delete(
    { params }: Request<{ id?: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const deletedPost = await this.postsService.delete(Number(params.id));

    if (!deletedPost) {
      return next(new HTTPError(404, 'Post is not found!', 'PostController'));
    }

    this.ok(res, deletedPost);
  }
}

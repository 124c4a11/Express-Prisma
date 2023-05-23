export const TYPES = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('Logger'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  ConfigService: Symbol.for('ConfigService'),
  PrismaService: Symbol.for('PrismaService'),

  UsersController: Symbol.for('UsersController'),
  UsersService: Symbol.for('UsersService'),
  UsersRepository: Symbol.for('UsersRepository'),

  PostsController: Symbol.for('PostsController'),
  PostsService: Symbol.for('PostsService'),
  PostsRepository: Symbol.for('PostsRepository'),
};

import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from './types';
import { ILogger } from './logger/logger.service.interface';
import { LoggerService } from './logger/logger.service';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersController } from './users/controllers/users.controller.interface';
import { UsersController } from './users/controllers/users.controller';
import { IUsersService } from './users/service/users.service.interface';
import { UsersRepository } from './users/repository/users.repository';
import { UsersService } from './users/service/users.service';
import { IUsersRepository } from './users/repository/users.repository.interface';

interface IBootstrap {
  app: App;
  appContainer: Container;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App).inSingletonScope();
  bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
  bind<IUsersService>(TYPES.UsersService).to(UsersService).inRequestScope();
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inRequestScope();
});

export async function bootstrap(): Promise<IBootstrap> {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();

  return { app, appContainer };
}

export const boot = bootstrap();

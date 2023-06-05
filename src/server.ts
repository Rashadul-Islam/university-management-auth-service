import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database connected....!');

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database...', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERN is received');
  if (server) {
    server.close();
  }
});

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FileUploadService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AppController],
  providers: [FileUploadService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

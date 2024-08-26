import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { HttpServices } from './http.service';
import { HttpModule } from '@nestjs/axios';
import { KnexModule } from 'nest-knexjs';

@Global() // set global akses
@Module({
  imports: [
    //set up winston logger
    WinstonModule.forRoot({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    //set config module global
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: 'R00Tpostgres',
          database: 'test-gvp',
        },
      },
    }),
  ],
  providers: [
    ValidationService,
    HttpServices,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService, HttpServices],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "inptapi",
    entities: [],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

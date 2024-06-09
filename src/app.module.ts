import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import {UsersService} from "./users/users.service";
import {User, UserSchema} from "./users/schemas/user.schema";
import { HashService } from './hash/hash.service';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://osbaran10:GuqpWbo7ulWpwqME@cluster0.1rg59qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),UsersModule],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule } from "@nestjs/config";
import { FileStorageModule } from "./file-storage/file-storage.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "satao.db.elephantsql.com",
      port: 5432,
      username: "wvifadkg",
      password: "wJEHhXOwufBK_RFtTgx2MbP9XlpxNDSM",
      database: "wvifadkg",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    FileStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

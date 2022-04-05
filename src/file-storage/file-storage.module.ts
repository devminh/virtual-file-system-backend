import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileStorageController } from "./file-storage.controller";
import { FileStorage } from "./file-storage.entity";
import { FileStorageService } from "./file-storage.service";

@Module({
  imports: [TypeOrmModule.forFeature([FileStorage])],
  providers: [FileStorageService],
  controllers: [FileStorageController],
})
export class FileStorageModule {}

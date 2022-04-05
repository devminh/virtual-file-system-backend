import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
  Query,
} from "@nestjs/common";

import {
  FileStorageRequest,
  FileStorageRequestUpdate,
} from "./file-storage-body";
import { FileStorageService } from "./file-storage.service";

@Controller("api/file-storage")
export class FileStorageController {
  constructor(private fileStorageService: FileStorageService) {}

  @Get()
  find(@Query() query) {
    const { is_root, parent_id, name } = query;

    if (is_root === "true") {
      return this.fileStorageService.findAll({ is_root: true });
    }

    if (parent_id) {
      if (parent_id && name) {
        return this.fileStorageService.findAll({
          parent_id: parent_id,
          name: name,
        });
      }
      return this.fileStorageService.findAll({
        parent_id: parent_id,
      });
    }

    return this.fileStorageService.findAll({});
  }

  @Post()
  async create(@Body() body: FileStorageRequest) {
    return await this.fileStorageService
      .create(body)
      .then(() => {
        return {
          statusCode: 200,
          message: "Successfully create file/folder",
        };
      })
      .catch((err) => {
        let errorMsg = err.message;

        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: errorMsg,
          },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Put()
  async update(@Body() body: FileStorageRequestUpdate) {
    return await this.fileStorageService
      .update(body.id, body)
      .then(() => {
        return {
          statusCode: 200,
          message: "Successfully update a file/folder information",
        };
      })
      .catch((err) => {
        let errorMsg = err.message;

        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: errorMsg,
          },
          HttpStatus.BAD_REQUEST
        );
      });
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.fileStorageService.remove(id);
  }
}
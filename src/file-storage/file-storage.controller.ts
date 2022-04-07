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
import { getManager } from "typeorm";

import {
  FileStorageRequest,
  FileStorageRequestUpdate,
} from "./file-storage-body";
import { FileStorageService } from "./file-storage.service";

@Controller("api/file-storage")
export class FileStorageController {
  constructor(private fileStorageService: FileStorageService) {}

  @Get()
  find(@Query() params) {
    return this.fileStorageService.findAll(params);
  }

  @Get("count-item/:id")
  async countItem(@Param("id") id: number) {
    const entityManager = getManager();
    const result = await entityManager.query(
      `
    SELECT COUNT(*)
    FROM file_storage
    WHERE parent_id = $1
      `,
      [id]
    );
    return result[0];
  }

  @Post()
  async create(@Body() body: FileStorageRequest) {
    return await this.fileStorageService
      .create(body)
      .then((res) => {
        console.log("ress here", res);
        return {
          statusCode: 200,
          message: "Successfully create file/folder",
          id: res.identifiers[0].id,
        };
      })
      .catch((err) => {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: err.message,
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
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: err.message,
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

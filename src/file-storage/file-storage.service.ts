import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileStorage } from "./file-storage.entity";

@Injectable()
export class FileStorageService {
  constructor(
    @InjectRepository(FileStorage)
    private fileStorageRepo: Repository<FileStorage>
  ) {}

  findAll(params) {
    const { is_root, parent_id, name, type, sort_type } = params;

    if (is_root === "true") {
      return this.fileStorageRepo.find({ is_root: true });
    }
    let query = {};

    let order;

    switch (sort_type) {
      case "NAME_ASC":
        order = {
          name: "ASC",
        };
        break;
      case "NAME_DESC":
        order = {
          name: "DESC",
        };
        break;
      case "CREATED_AT_ASC":
        order = {
          created_at: "ASC",
        };
        break;
      case "CREATED_AT_DESC":
        order = {
          created_at: "DESC",
        };
        break;
      default:
        break;
    }

    if (parent_id) {
      query = { ...query, parent_id: parent_id };
    }
    if (name) {
      query = { ...query, name: name };
    }
    if (type) {
      query = { ...query, type: type };
    }

    return this.fileStorageRepo.find({
      where: query,
      order: order || {
        name: "ASC",
      },
    });
  }

  create(body: any) {
    return this.fileStorageRepo.insert(body);
  }

  async update(id: number, body: any) {
    const activityHonor = await this.fileStorageRepo.findOne({
      id: id,
    });
    this.fileStorageRepo.merge(activityHonor, body);
    return this.fileStorageRepo.save(activityHonor);
  }

  async remove(id: number) {
    await this.fileStorageRepo.delete(id);
    return true;
  }
}

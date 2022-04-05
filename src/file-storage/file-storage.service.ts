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

  findAll(query) {
    return this.fileStorageRepo.find(query);
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

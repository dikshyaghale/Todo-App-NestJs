import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiKeyEntity } from "./api-key.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private apiKeyRepository: Repository<ApiKeyEntity>
  ) {}

  create = async () => {
    return await this.apiKeyRepository.save(
      this.apiKeyRepository.create({ key: uuid() })
    );
  };

  validateKey = async (key: string) => {
    const apiKey = await this.apiKeyRepository.findOne({ where: { key: key } });
    return apiKey;
  };
}

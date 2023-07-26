import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiKeyService } from "./api-key.service";

@ApiTags("Api-Key")
@Controller("api/v1/api-key")
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}
  @Post()
  @ApiOperation({ summary: "Generate api key" })
  async create() {
    return {
      data: await this.apiKeyService.create(),
    };
  }
}

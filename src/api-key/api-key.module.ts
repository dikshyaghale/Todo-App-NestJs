import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiKeyController } from "./api-key.controller";
import { ApiKeyEntity } from "./api-key.entity";
import { ApiKeyService } from "./api-key.service";
import { ApiKeyGuard } from "./gaurd/api-key.guard";

@Module({
  imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
  controllers: [ApiKeyController],
  exports: [ApiKeyService],
  providers: [ApiKeyService, ApiKeyGuard],
})
export class ApiKeyModule {}

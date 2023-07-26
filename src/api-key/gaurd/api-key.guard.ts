import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { ApiKeyService } from "../api-key.service";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers["api-key"];

    if (apiKey) {
      console.log(apiKey, "api key");
      const validApiKey = await this.apiKeyService.validateKey(apiKey);
      if (!validApiKey)
        throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
      return true;
    }
  }
}

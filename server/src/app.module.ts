import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MySqlConfigService } from "./config/mysql.config.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpExceptionFilter } from "./exceptionFilter/http.exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService,
    }),
  ],
  providers: [HttpExceptionFilter, ClassSerializerInterceptor],
})
export class AppModule {}

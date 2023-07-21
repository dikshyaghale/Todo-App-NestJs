import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { MySqlConfigService } from "./config/mysql.config.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpExceptionFilter } from "./exceptionFilter/http.exception.filter";
import { ToDoModule } from "./to-do/to-do.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService,
    }),
    ToDoModule,
  ],
  providers: [HttpExceptionFilter, ClassSerializerInterceptor],
})
export class AppModule {}

import { Connection, EntityNotFoundError, TypeORMError } from "typeorm";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";

@Catch(TypeORMError, EntityNotFoundError)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    try {
      let message: string = (exception as any).message;
      const code: number = (exception as any).code;
      let field: string = (exception as any).field;
      const messageList = message.split(" ");
      let result;
      if (code.toString() === "ER_DUP_ENTRY") {
        const idx = messageList[messageList.length - 1]
          .replace(/['"]+/g, "")
          .split(".");
        if (idx[1]) {
          const query = `SELECT DISTINCT TABLE_NAME,INDEX_NAME,COLUMN_NAME FROM INFORMATION_SCHEMA.STATISTICS where index_name='${idx[1]}';`;
          result = await this.connection.query(query);
          if (result) {
            result = result[0];
            message = `field '${result.COLUMN_NAME}' should be unique'`;
            field = result.COLUMN_NAME;
          }
        }
      }
      const customResponse = {
        status: HttpStatus.BAD_REQUEST,
        errors: [{ code: code, message: message, field: field }],
        timestamp: new Date().toISOString(),
      };

      response.status(customResponse.status).json(customResponse);
    } catch (e) {
      const customResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        message: e.message,
      };
      response.status(customResponse.status).json(customResponse);
    }
  }
}

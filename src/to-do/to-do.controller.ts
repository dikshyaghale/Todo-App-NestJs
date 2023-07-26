import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ApiKeyGuard } from "src/api-key/gaurd/api-key.guard";
import { FilterDecorator } from "src/common/filter.decorator";
import {
  createdMessage,
  deletedMessage,
  successMessage,
  updatedMessage,
} from "src/common/messages";
import { ToDoEntity } from "./entity/to-do.entity";
import { TodoFilterDto } from "./to-do.filter.dto";
import { ToDoService } from "./to-do.service";

@Controller("api/v1/to-do")
@ApiTags("To-Do")
@ApiSecurity("Api-Key")
@UseGuards(ApiKeyGuard)
export class TodoController {
  constructor(private toDoService: ToDoService) {}

  @Post()
  @ApiOperation({ summary: "Create to-do" })
  async create(@Body() body: ToDoEntity) {
    return {
      statusCode: HttpStatus.CREATED,
      message: createdMessage("To-Do"),
      data: await this.toDoService.create(body),
    };
  }

  @Get()
  @ApiOperation({ summary: "Get all to-do" })
  async findAll(@FilterDecorator() @Query() params: TodoFilterDto) {
    return {
      statusCode: HttpStatus.OK,
      message: successMessage,
      data: await this.toDoService.findAll(params),
    };
  }

  @Put(":id")
  @ApiOperation({ summary: "Update to-do" })
  async updateOne(@Param("id") id: number, @Body() body: ToDoEntity) {
    return {
      message: updatedMessage("To-Do"),
      httpStatus: HttpStatus.OK,
      data: await this.toDoService.updateOne(id, body),
    };
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete do-do" })
  async deleteOne(@Param("id") id: number) {
    const data = await this.toDoService.deleteOne(id);
    if (data) {
      return {
        httpStatus: HttpStatus.OK,
        message: deletedMessage("To-Do"),
      };
    }
    throw new HttpException(
      "Something went wrong",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

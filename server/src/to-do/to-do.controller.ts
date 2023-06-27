import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilterDecorator } from "src/common/filter.decorator";
import { createdMessage, successMessage } from "src/common/messages";
import { ToDoEntity } from "./entity/to-do.entity";
import { TodoFilterDto } from "./to-do.filter.dto";
import { ToDoService } from "./to-do.service";

@Controller("api/v1/to-do")
@ApiTags("To-Do")
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
}

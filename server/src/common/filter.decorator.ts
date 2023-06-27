import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const FilterDecorator = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request.query.take = request.query.take || Number(process.env.TAKE);
    request.query.skip = request.query.skip || Number(process.env.SKIP);
    request.query.order = request.query.order || process.env.ORDER;

    return request.query;
  }
);

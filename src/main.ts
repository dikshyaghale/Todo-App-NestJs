import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "./exceptionFilter/http.exception.filter";
import { urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptionsDelegate = function (request, callback) {
    const host = request.headers.host;
    const origin = request.headers.origin
      ? request.headers.origin.split("://")[1]
      : host;
    if (!request.headers.origin) request.headers.origin = origin;
    if (process.env.ALLOWED_DOMAINS.split(",").includes(origin))
      callback(null, { origin: true });
    else
      callback(
        new BadRequestException(
          "Domain not allowed. Please contact administration."
        ),
        { origin: false }
      );
  };
  app.enableCors(corsOptionsDelegate);
  const httpExceptionFilter = app.get<HttpExceptionFilter>(HttpExceptionFilter);
  app.useGlobalFilters(httpExceptionFilter);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle("API documentation for ToDo App")
    .setVersion("V1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const optionsSetup = {
    explorer: false,
    customCss:
      ".swagger-ui .models, .topbar {\n" +
      "    display: none !important;\n" +
      "}\n" +
      ".topbar, .version-stamp {\n" +
      "    display: none !important;\n" +
      "}\n" +
      ".swagger-ui .scheme-container {\n" +
      "    padding: 5px 0;\n" +
      "}\n" +
      ".swagger-ui .info {\n" +
      "    margin: 10px 0 !important;\n" +
      "}",
  };
  SwaggerModule.setup("api/v1/docs", app, document, optionsSetup);
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  await app.listen(parseInt(process.env.APP_PORT) || 3002);
}

bootstrap()
  .then(() => {
    console.log(`Server running on http://localhost:${process.env.APP_PORT}/`);
    console.log(
      `For API documentation on http://localhost:${process.env.APP_PORT}/api/v1/docs`
    );
  })
  .catch((error) => {
    console.log("Error: ", error.measure || error || error.message);
  });

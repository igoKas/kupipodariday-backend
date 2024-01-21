import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { TypeORMError } from "typeorm";


@Catch(TypeORMError)
export class TypeORMErrorExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Произошла ошибка на сервере';
    const name = exception.name;
    switch (name) {
      case 'EntityNotFoundError':
        message = 'Ресурс не найден';
        status = HttpStatus.NOT_FOUND;
        break;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(status)
      .json({
        statusCode: status,
        message
      });
  }
}
import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express'

export class HttpExceptionFilter implements ExceptionFilter {
    catch(
        exception: HttpException,
        host: ArgumentsHost
    ) {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse();

        let message = 'Internal Server error';

        if(typeof exceptionResponse === 'string'){
            message = exceptionResponse;
        }

        if(typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse){
            const messageValue = exceptionResponse.message;

            if(Array.isArray(messageValue)){
                message = messageValue.join(', ');
            }
            else if(typeof messageValue === 'string'){
                message = messageValue;
            }
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message
        })
    }
}
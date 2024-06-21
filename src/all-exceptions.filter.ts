import { ArgumentsHost, Catch, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { TokenExpiredError } from "@nestjs/jwt";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
type MyResponseObject = {
    statusCode : number,
    timestamp : string,
    path : string,
    response : string | object
}
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const myResponseObject : MyResponseObject = {
            statusCode : 500,
            timestamp : new Date().toISOString(),
            path : request.url,
            response : ''
        }
        if(exception instanceof HttpException){
            myResponseObject.statusCode = exception.getStatus();
            myResponseObject.response = exception.getResponse();
        }
        else if(exception instanceof PrismaClientValidationError){
            myResponseObject.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            myResponseObject.response = exception.message.replaceAll(/\n/g,'');
        }
        else if(exception instanceof TokenExpiredError){
            myResponseObject.statusCode = HttpStatus.UNAUTHORIZED;
            myResponseObject.response = exception.message;
            exception = new UnauthorizedException();
        }
        else{
            myResponseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObject.response = "INTERNAL SERVER ERROR";
        }
        response.status(myResponseObject.statusCode).json(myResponseObject);
        super.catch(exception, host);   
    }
}
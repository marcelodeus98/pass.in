import { FastifyInstance } from "fastify";
import { badRequest } from "./routes/_erros/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({
            message: 'Error during validation',
            errors: error.flatten().fieldErrors,
        });
    }

    if(error instanceof badRequest){
        return reply.status(400).send({message: error.message});
    }
    
    return reply.status(500).send({message: 'an error happened...'})
};
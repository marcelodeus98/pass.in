import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { generateSlugify } from "../utils/generate-slug";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { badRequest } from "./_erros/bad-request";

export async function createEvent(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events', {
            // Validando as datas do corpo da requisição
            schema: {
                summary: 'Create an event',
                tags: ['events'],
                body: z.object({
                    title: z.string().min(4),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable(), 
                }),
                response: {
                    201: z.object({
                        eventId : z.string().uuid(),
                    })
                },
            },
        },async (request, reply) => {
            // Pegando os datas do corpo da requisição (request body)
            const {title, details, maximumAttendees} = request.body;
    
            const slug = generateSlugify(title);
    
            // Verificar se o slug já não foi utilizado por um outro slug
            const eventWithSameSlug = await prisma.event.findUnique({
                where: {
                    slug,
                }
            }) 
    
            // Informar que o title já está sendo utilizado em um evento
            if (eventWithSameSlug !== null) {
                throw new badRequest('Another event with same title alredy exist')
            }
    
            const event = await prisma.event.create({
                data: {
                    title,
                    details,
                    maximumAttendees,
                    slug,
                },
            });
    
            return reply.status(201).send({ eventId : event.id});
        });
}

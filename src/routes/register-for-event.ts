import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { badRequest } from "./_erros/bad-request";

export async function registerForEvent(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees', {
            schema: {
                summary: 'Register attendeee',
                tags: ['attendees'],
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email(),
                }),
                params: z.object({
                    eventId: z.string().uuid()
                }),
                response: {
                    201: z.object({
                        attendeeId: z.number(),
                    }),
                },
            },
        }, async (request, reply) => {
            const {eventId} = request.params;
            const {name, email} = request.body;

            const attendeeFromEmail = await prisma.attendee.findUnique({
                where: {
                    eventId_email: {
                        email,
                        eventId
                    },
                },
            });


            if(attendeeFromEmail !== null) {
                throw Error('This e-mail is already registered for this event!');
            };

            // Quando tenho duas ou mais promisses a qual estou aguardando que seja resolvida, posso coloca lás dentro de um array para receber a resposta 
            const [event, amountOfAttendeesForEvent] = await Promise.all([
                // Query para procurar o event especifíco fornecido como informação (eventId)
                prisma.event.findUnique({
                    where: {
                        id: eventId,
                    },
                }),
                // Query para conta o número de attendees do event ( específico)
                prisma.attendee.count({
                    where: {
                        eventId,
                    },
                }),
            ]);

            // event? => Fornece acesso acesso a propridades de um objeto mesmo se que o valor da propriedade venha null or underfined
            if(event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees){
                throw new badRequest('The maximum number of attendees for this event has been reached!')
            };

            const attendee = await prisma.attendee.create({
                data:{
                    name,
                    email,
                    eventId,
                },
            });

            return reply.status(201).send({attendeeId: attendee.id})

        });
}
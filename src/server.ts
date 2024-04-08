import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import {serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider} from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { checkIn } from './routes/check-in';
import { getAttendees } from './routes/get-event-attendees';
import { errorHandler } from './error-handler';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*',
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificações da API para o backend da aplicação pass.in, feito durante o NLW da Rocketseat',
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform,
});


app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(getAttendees);
app.register(checkIn);


app.setErrorHandler(errorHandler);

app.listen({port: 3000, host: '0.0.0.0'}).then(() => {
    console.log('Server is running...');
}).catch((err) => {
    console.log(err);
});
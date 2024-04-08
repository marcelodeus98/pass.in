import {
  registerForEvent
} from "./chunk-OESTW6KX.mjs";
import {
  errorHandler
} from "./chunk-AOJTLX5V.mjs";
import {
  checkIn
} from "./chunk-576X3AQW.mjs";
import {
  createEvent
} from "./chunk-QUQ5OW5M.mjs";
import "./chunk-DXZFBUPQ.mjs";
import {
  getAttendeeBadge
} from "./chunk-TBYIHWAO.mjs";
import {
  getAttendees
} from "./chunk-F34IQDO7.mjs";
import {
  getEvent
} from "./chunk-ZJGWLFNQ.mjs";
import "./chunk-ACVKHWUB.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o backend da aplica\xE7\xE3o pass.in, feito durante o NLW da Rocketseat",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(getAttendees);
app.register(checkIn);
app.setErrorHandler(errorHandler);
app.listen({ port: 3e3, host: "0.0.0.0" }).then(() => {
  console.log("Server is running...");
}).catch((err) => {
  console.log(err);
});
export {
  app
};

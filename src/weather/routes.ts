import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  CityId,
  GetFiveDayTemperaturesForCity,
  GetCitySummaries,
} from "./queries";

import * as openWeatherApi from "./openWeatherApi";
import { TemperatureMeasurement } from "./forecastResponse";

export default async function weatherRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: {
        unit: { type: "string" },
        temperature: { type: "number" },
        //citites: { type: "array", items: { type: "number" } },
        citites: { type: "string" },
      },
      // response: {
      //   200: {
      //     type: "object",
      //     properties: {
      //       hello: { type: "string" },
      //     },
      //   },
      // },
    },
    handler: async function (
      _request: FastifyRequest<{ Querystring: GetCitySummaries }>,
      reply: FastifyReply
    ) {
      const data = await openWeatherApi.getCityWeatherSummaries(_request.query);
      reply.send(data);
    },
  });

  fastify.route({
    method: "GET",
    url: "/cities/:id",
    schema: {
      params: {
        cityId: { type: "number" },
      },
      querystring: {
        unit: { type: "string" },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              time_stamp: { type: "number" },
              time_stamp_as_string: { type: "string" },
              temperature: { type: "number" },
              unit: { type: "string" },
            },
          },
        },
      },
    },
    handler: async function (
      _request: FastifyRequest<{
        Params: CityId;
        Querystring: GetFiveDayTemperaturesForCity;
        Reply: TemperatureMeasurement[];
      }>,
      reply: FastifyReply
    ) {
      const data: TemperatureMeasurement[] =
        await openWeatherApi.getWeatherForCity(_request.params, _request.query);

      return reply.send(data);
    },
  });
}

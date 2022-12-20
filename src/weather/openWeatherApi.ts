import axios, { AxiosResponse } from "axios";
import * as Fastify from "fastify";
import { ForecastResponse, TemperatureMeasurement } from "./forecastResponse";

import { ApiKey } from "../shared/configuration";
import {
  CityId,
  GetFiveDayTemperaturesForCity,
  GetCitySummaries,
} from "./queries";
import TemperatureUnit from "./temperatureUnit";

async function getWeatherForCity(
  cityId: CityId,
  query: GetFiveDayTemperaturesForCity
) {
  try {
    // 👇️ const data: Some Response Type
    const units =
      (query.unit as TemperatureUnit) ===
      (TemperatureUnit.Celsius as TemperatureUnit)
        ? "metric"
        : "imperial";

    const response = await axios.get<ForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId.id}&units=${units}&appid=${ApiKey}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = response.data;
    const status = response.status;

    const temperatures = data.list.map(
      (item) =>
        <TemperatureMeasurement>{
          time_stamp: item.dt,
          time_stamp_as_string: new Date(item.dt * 1000).toISOString(),
          temperature: item.main.temp,
          unit: query.unit,
        }
    );

    console.log(JSON.stringify(temperatures, null, 4));

    // 👇️ "response status is: 200"
    console.log("response status is: ", status);

    return temperatures;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("unexpected error");
    }
  }
}

async function getCityWeatherSummaries(query: GetCitySummaries) {
  try {
    // naive approach: make request for each city. It would be better if we can make a single request passing all city ids.

    const units =
      (query.unit as TemperatureUnit) ===
      (TemperatureUnit.Celsius as TemperatureUnit)
        ? "metric"
        : "imperial"; //TODO: remove code duplication

    const cityIds = query.cities.split(",");

    let citySummaries: object[] = [];

    for (const cityId of cityIds) {
      const { data, status } = await axios.get<ForecastResponse>(
        `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=${units}&appid=${ApiKey}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log("response status is: ", status);

      citySummaries.push(data);
    }
    return citySummaries;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      throw new Error(error.message);
    } else {
      console.log("unexpected error: ", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export { getWeatherForCity, getCityWeatherSummaries };

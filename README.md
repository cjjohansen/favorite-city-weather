# favorite-city-weather
city weather api in node.js typescript, fastify


# Introduction

A Company needs to build a weather api for its mobile apps. 

It should be written in TypeScript and preferably use wellknown frameworks. 
The company has chosen to use OpenWeather API as its weather forecast provider, so the task is to 
consume forecasts from Open weather API and reformat data to suite the need of the consuming mobile apps.
As an extra requirement, the api needs to be ratelimited to 10000requests per day.


Therefore

We will use

* TypeScript
* Fastify api
* [Open weather api](https://openweathermap.org/forecast5#cityid5)


# Getting started

We assume node is installed. 
We assume that REST Client plugin has been isntalled in VSCODE.

* clone repository
* run ```` npm install ```` 
* in visual studio code press F5 to debug
* use the weather-test.http file to mke requests to the two endpoints

![http endpoint tets](./media/weather-tests-http.png)

## testing rate limiting




# Solution considerations


## project and typescript setup
We will setup a folder/ porject in visual studio code.
We wnat to be able to debug the code wuth typescript type information. We do this by setting the sourcemap property in tsconfig.json to true and by creating a suitable launch.json file
compiled typescript will be placed in the build folder 

## Folder structure

I'm preferring a vertical slice or screaming arhcitecture style, where code for each vertical slice or use case or logical domain area are placed in the same folder. In our case this is the weather folder.

Fastify is all about plugins, so some documentation suggests to put all plugins in a plugin folder. But I woud like to avoid going down that road. The advantage of vertical slice folder strategy is that you mostly can make changes in one folder nd don't have to navigate into several folders.


## Rate limiting

There exist a fastify plugin for ratelimiting. Fatifys plugin ecosystem should be one of its strengths.

We will use such a plugin.

The problem formulation just stats that we should allow no more than 10.000 requests per day.
A primitive solution would be to have a total count. But that would be unfair if a single user uses all the requests.

A bette strategy might be to have an esitmate of daily amount of uses lets assume 1000 users. One could then rate limit based on the users ip address. Several ratelimiting strategies exists. Soem are discussed [here](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)  


## Critique

Learning a whole new framwork like Fastify takes time. So rather than making things perfect, I will try to explain what has been doen so far and what could be improved.

fastify has support for declaring schemas for request and reply of an endpoint, you can add schema for

* url parameters
* query string
* request body
* reply payload

### typescript support

Its possible to create the schemas in typescript using @sinclair/typebox npm package. An alternative is to write schem in .json fiels and then convert thme to typescript by using json-schema-to-typescript npm package

Its described in detail in  [fastify typescript documentation](https://www.fastify.io/docs/latest/Reference/TypeScript/)

### code deduplication

Ther eis some code duplication that could be removed. For instance some of the code in the two functions calling openweather api duplicates code. So some axios api instance could be made usable so errorhandling is not duplicated.

### error handling

I have chosen to throw exceptions from the api code. A global execption handler could be added as middleware to the fastify pipeline.

### use of plugins

each route definiton could be created and registered as plugins

### use of other packages

typescript wrappers exists for openweather api 

* [WorldTurtleMedia](https://github.com/worldturtlemedia/openweathermap-onecall)
* [graphql-weather-api](https://github.com/konstantinmuenster/graphql-weather-api)

It might have been possible to save some time by using one of these packages.
















# RealWorld End-to-End Integration Testing

An end-to-end integration test example for a React SPA, using ASP .NET Boilerplate 6.0. Using Mocha to drive a headless Chrome via Puppeteer.

Example project: https://github.com/olivierbouchomsfontys/AutomaticAcceptanceTest

Designed to work with [CircleCI](https://circleci.com/gh/anishkny/realworld-e2e-test) and [Travis CI](https://travis-ci.org/anishkny/realworld-e2e-test).

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)

## Getting Started

### Prerequisites

```
Docker
Node 
.NET 5
```

### Installing

Clone example project:

```
git clone https://github.com/olivierbouchomsfontys/AutomaticAcceptanceTest.git
```

Navigate to `reactjs` directory and run `npm install && npm start`

Start database:

```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD={your_password}" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2019-CU5-ubuntu-18.04
```

Change password in appsettings.json in Migrator and Web.Host project.

Run `AutomaticAcceptanceTest.Migrator` to migrate database and run `AutomaticAceptanceTest.Web.Host` to start the API.

## Running the tests

```
npm test
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
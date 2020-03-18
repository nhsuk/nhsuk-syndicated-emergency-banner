# NHS UK Syndicated Emergency Banner

Codebase for syndicated NHS UK emergency banner.

## Usage
Please refer to documentation provided on [NHS API Developer Portal](https://developer.api.nhs.uk/).

## Development

### Application
```
git clone git@github.com:nhsuk/nhsuk-syndicated-emergency-banner.git
npm install
npm start
```
Go to http://localhost:3000/ to open a small app which has an example of the live banner.

### Tests
```
npm test
```
This will run linting and tests. Tests are written in Jest and use JSDom to simulate browser behaviour. This command will be run as CI step.

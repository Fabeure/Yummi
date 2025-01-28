const fs = require('fs');
require('dotenv').config();

const prodTargetPath = './src/environments/environment.ts';
const devTargetPath = './src/environments/environment.development.ts';

const prodEnvConfigFile = `
export const environment = {
  production: true,
  apiKey: '${process.env.API_KEY}',
  apiUrl: '${process.env.API_URL}',
  recipeApiUrl : '${process.env.RECIPE_API_URL}'
};
`;
const devEnvConfigFile = `
export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY}',
  apiUrl: '${process.env.API_URL}',
  recipeApiUrl : '${process.env.RECIPE_API_URL}'
};
`;

fs.writeFile(prodTargetPath, prodEnvConfigFile, function (err) {
  if (err) {
    console.error('Error writing environment file', err);
  } else {
    console.log('Environment file created successfully:', prodTargetPath);
  }
});

fs.writeFile(devTargetPath, devEnvConfigFile, function (err) {
  if (err) {
    console.error('Error writing environment file', err);
  } else {
    console.log('Environment file created successfully:', devTargetPath);
  }
});

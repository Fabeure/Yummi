const fs = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const envConfigFile = `
export const environment = {
  production: false,
  apiKey: '${process.env.API_KEY}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error('Error writing environment file', err);
  } else {
    console.log('Environment file created successfully:', targetPath);
  }
});

const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? './src/environments/environment.prod.ts'
   : './src/environments/environment.ts';

const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   COGNITO_REGION: "${process.env.COGNITO_REGION}",
   COGNITO_USER_POOL_ID: "${process.env.COGNITO_USER_POOL_ID}",
   COGNITO_USER_POOL_WEB_CLIENT_ID: "${process.env.COGNITO_USER_POOL_WEB_CLIENT_ID}",
   COGNITO_USER_AUTH_FLOW: "${process.env.COGNITO_USER_AUTH_FLOW}",
   COGNITO_STORAGE_KEY: "${process.env.COGNITO_STORAGE_KEY}"
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: any) => {
   if (err) {
      console.log(err);
   }
});

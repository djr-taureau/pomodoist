// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api: {
    collectionsUrl:  'https://api.mongolab.com/api/1/databases/pomodoist/collections',
    apiKey:  'KMf8fEu_Yw2AxXSYeTTMAyJu2m6zTLJi',
    // params: '?apiKey=' + this.apiKey,
  }
};

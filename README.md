<img src="https://raw.githubusercontent.com/alakajam-team/alakajam-poc/master/static/images/logo-v2.png" />

A proof of concept for an improved Alakajam! site architecture. The goal is to eventually expand it into a new major version of the website.

## Initial setup

1. **Install dependencies**: `npm install && npm install -g typescript tslint`
2. **Build the server**: `npm build`
3. **Start**: `npm start`

## Developer tools

**Install dependencies**: `npm install -g typescript ts-node-dev tslint typedoc webpack-cli typeorm`

* `npm run build:watch`: Watches the server sources to build them automatically.
* `npm run start:watch`: Starts the server, manages building/restarting automatically.
* `npm run lint`: Checks the sources for errors, and fixes them if possible. ~~Launched automatically upon committing.~~ *(Disabled for now due to issues on Windows)*
* `npm run typedoc`: Generates a static documentation site in `dist/docs/`
* `npm run debug`: Launches the server in debug mode. Type `about:inspect` in a Chrome browser and it should let you connect to your Node target.
* `npm run migration:run`: Migrates the DB to the latest version.
* `npm run migration:revert`: Reverts the latest DB migration.
* `webpack-cli --config webpack.development.js`: Build the client-side JS/CSS manually.

## Debugging with Visual Studio Code

Put this in your `.vscode/launch.json`:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Alakajam!",
      "type": "node",
      "request": "launch",
      "args": ["${workspaceFolder}\\server\\index.ts", "patch-ormconfig-ts-node"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
    }
  ]
}
```

## Design notes

### Little TODOs

- Figure out morph relations with TypeORM
- Try to use the Vue tree viewer lib to make an interactive template context viewer
- Test more advanced use cases in services
- Find a way to optimize Webpack builds (why does rebuilding CSS currently imply rebuilding the TypeScript? could we put the libraries in a different build?)
- Handle rejected promises on boot

### Big TODOs

- [x] Switch to TypeScript
- [x] Improve and make TypeScript-compatible the models code (by either more integration to Bookshelf, ie. extending BaseModel, or switching from Bookshelf to another ORM like TypeORM or Sequelize)
- [ ] **[WIP!]** Better organization of service layers 
- [ ] Remove business logic from controllers (possibly even not expose the models?) / Consistent pattern for forms handling
- [ ] Database migrations (switch to TypeORM?)
- [ ] **[WIP!]** Set up improved toolchain for JS/CSS build (faster build in development, faster boot in production)
- [ ] **[WIP!]** Improve the files layout (data/uploads folders, static assets in/out folders, template macros, explode core/models.js)
- [ ] Easier testing, better test coverage
- [ ] Refactor event status flags (use feature flags - possibly controlled by event states - rather than toggle features directly with states)
- [ ] Make template development easier (comment conventions, in-page tool to explore available context)
- [ ] [Wiki documentation](https://github.com/alakajam-team/alakajam/issues/280)
- [ ] **[WIP!]** Get rid of the unmaintained Bootflat
- [ ] Try simplifying dependencies (client-side: code editors, icons, etc.)
- [ ] Consider organizing folders by subject (entry, post, etc.) rather than layer

### Code upgrade

* `promisify-node` can be replaced with the now native `util.promisify()`
* Rename `.css` files to `.pcss` for correct code highlighting (in Visual Studio Code in particular)

## Troubleshooting 

* **Error on launch**: `EPERM: operation not permitted, mkdir '...\alakajam-poc\node_modules\@types`

This can happen on Windows on older Node versions. Upgrade Node (not just npm) to fix this.

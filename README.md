## Intro

An early proof of concept for an improved Alakajam! site architecture.

## Initial setup

1. **Install dependencies**: `npm install && npm install -g typescript tslint knex`
2. **Build**: `tsc`
3. **Launch**: `npm start`

## Developer tools

* `npm install -g browser-refresh`

1. On a first console, launch the compiler: `tsc -w`
2. On a second console, launch the server: `browser-refresh`

The server will restart by itself upon changing the code.

## Design notes

### Little TODOs

- Test relations in entities
- Test more advanced use cases in services
- Debugging recommandations (VSCode + TypeScript, TypeScript alone)
- `ts-node-dev` instead of `brower-refresh`?

### Big TODOs

- [x] Switch to TypeScript
- [ ] **[WIP!]** Improve and make TypeScript-compatible the models code (by either more integration to Bookshelf, ie. extending BaseModel, or switching from Bookshelf to another ORM like TypeORM or Sequelize)
- [ ] **[WIP!]** Better organization of service layers 
- [ ] Remove business logic from controllers (possibly even not expose the models?) / Consistent pattern for forms handling
- [ ] Database migrations (switch to TypeORM?)
- [ ] Set up improved toolchain for JS/CSS build (faster build in development, faster boot in production)
- [ ] Improve the files layout (data/uploads folders, static assets in/out folders, template macros, explode core/models.js)
- [ ] Easier testing, better test coverage
- [ ] Refactor event status flags (use feature flags - possibly controlled by event states - rather than toggle features directly with states)
- [ ] Make template development easier (comment conventions, in-page tool to explore available context)
- [ ] [Wiki documentation](https://github.com/alakajam-team/alakajam/issues/280)
- [ ] Try simplifying dependencies (client-side: code editors, icons, etc.)
- [ ] Consider Vue.js for client-side JS

### Code upgrade

* `promisify-node` can be replaced with the now native `util.promisify()`
* Rename `.css` files to `.pcss` for correct code highlighting (in Visual Studio Code in particular)

### Other ideas

* Check [Lost](http://lostgrid.org/docs.html) grid system

## Troubleshooting 

* **Debugging fails/shows no output on VSCode**

Use this as your `.vscode/launch.json`. Note that this does not build the sources and you should probably launch a `tsc: watch` task separately.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Alakajam!",
      "program": "${workspaceFolder}\\dist_server\\index.js",
      "console": "integratedTerminal",
      "outFiles": [
        "${workspaceFolder}/dist_server/**/*.js"
      ]
    }
  ]
}
```

* **Error on launch**: `EPERM: operation not permitted, mkdir '...\alakajam-poc\node_modules\@types`

This can happen on Windows on older Node versions. Upgrade Node (not just npm) to fix this.

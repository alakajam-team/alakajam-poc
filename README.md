## Intro

An work-in-progress proof of concept for an improved Alakajam! site architecture. Goals:

* Switch to TypeScript
* Improve toolchain for JS/CSS build (faster dev loop in development, faster boot in production)
* Improve the files layout (data/uploads folders, static assets in/out folders, template macros, explode core/models.js)
* Improve and make TypeScript-compatible the models code (by either more integration to Bookshelf, ie. extending BaseModel, or switching from Bookshelf to another ORM like TypeORM or Sequelize)
* Better organization of service layers 
** Easier testing, better test coverage
** Remove business logic from controllers (possibly even not expose the models?)
** Consistent pattern for forms handling
* Refactor event status flags (use feature flags - possibly controlled by event states - rather than toggle features directly with states)
* Make template development easier (comment conventions, in-page tool to explore available context)
* [Wiki documentation](https://github.com/alakajam-team/alakajam/issues/280)
* Try simplifying dependencies (client-side: code editors, icons, etc.)

## Setup

* `npm install -g typescript`
* `tsc`
* `node dist/index.js`
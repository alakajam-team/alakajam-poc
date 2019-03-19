## Migrations

### Updating the database

Migrations are automatically run on startup. The `typeorm` command-line tool can be used to manually trigger or rollback migrations.

### Creating migrations

If `synchronize: true` is set in the config, the database will automatically synchronize with the entity definitions, which is dangerous in production but very useful during development:

1. Edit an entity file
2. Restart the server and watch the tables be upgraded
3. Generate the new migration file applying the changes:

```
typeorm migration:generate -n [migrationName]
```

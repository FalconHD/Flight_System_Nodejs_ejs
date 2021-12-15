import { createConnection } from 'typeorm';

export const connection = async () => {
    const connection = await createConnection({
        type: "mysql",
        port: 3306,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: false,
        logging: false,
        entities: ["src/models/*.js"],
        migrationsTableName: "custom_migration_table",
        migrations: ["src/models/migration/*.js"],
        cli: {
            migrationsDir: "migration"
        }
    })
    return connection
}



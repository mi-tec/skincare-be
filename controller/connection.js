import mysql from 'mysql2/promise';

export const connection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USERNAME,
            database: process.env.MYSQL_DB,
            password: process.env.MYSQL_PASSWORD,
        });

        return connection;
    } catch (err) {
        console.log(err);
    }
}
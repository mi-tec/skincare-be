import { connection } from "./connection.js";

export const dbquery = async (sql, values) => {
    try {
        const conn = await connection();

        const [rows] = await conn.query({ sql, values });

        return rows
    } catch (err) {
        console.error(err);
        throw err;
    }
};

import { Injectable } from '@nestjs/common';
import { Pool, createPool, PoolConnection, FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

@Injectable()
export class DataBase {

    private pool: Pool;
    constructor() {
        this.pool = createPool({
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            // cantidad maxima de conexiones en el pool
            connectionLimit: Number(process.env.DB_CONNECTIONLIMIT),
        });
    };

    executeQuery = async (sql: string, param: any[]): Promise<ResultSetHeader> => {
        const connection: PoolConnection = await this.pool.getConnection();
        const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query<ResultSetHeader>(sql, param);
        this.pool.releaseConnection(connection);
        return result;
    };

    executeSelect = async (sql: string, param: any[]): Promise<RowDataPacket[]> => {
        const connection: PoolConnection = await this.pool.getConnection();
        const [result]: [RowDataPacket[], FieldPacket[]] = await connection.query<RowDataPacket[]>(sql, param);
        this.pool.releaseConnection(connection);
        return result;
    };
}


import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPEORMCONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    database: 'gameboss',
    username: 'root',
    password: '1234',
    port: 3306,
    entities: [__dirname + '/../**/entity/*.entity{.js,.ts}'],
    synchronize: true
};

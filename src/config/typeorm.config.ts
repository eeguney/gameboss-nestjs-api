import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPEORMCONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    database: 'gameboss',
    username: 'root',
    port: 3306,
    entities: [__dirname + '/../**/*.entity{.ts}'],
    synchronize: true
};

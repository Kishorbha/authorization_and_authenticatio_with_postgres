import { registerAs } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';

export const TypeOrmConfig = registerAs('typeorm', () => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: process.env.NODE_ENV === 'dev' ? true : false,
  };
});

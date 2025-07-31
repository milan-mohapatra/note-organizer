import { Global, InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useFactory: async (configService: ConfigService) => {
        try {
          const URI = configService.get<string>('MONGODB_URI');
          if (!URI) {
            throw new InternalServerErrorException(
              'MONGODB_URI is not defined in the environment',
            );
          }

          const NODE_ENV = configService.get('NODE_ENV');
          if (NODE_ENV) {
            console.log('Running ' + NODE_ENV?.trim() + ' environment');
          }

          const client = new MongoClient(URI);
          await client.connect();
          console.log('DB connected');
          return client;
        } catch (err) {
          console.error('MongoDB connection failed', err);
          throw new InternalServerErrorException(
            'Failed to connect to MongoDB',
          );
        }
      },
      inject: [ConfigService],
    },
    {
      provide: 'MONGO_DB',
      useFactory: async (client: MongoClient, configService: ConfigService) => {
        try {
          const dbName = configService.get<string>('DB_NAME');
          if (!dbName) {
            throw new InternalServerErrorException(
              'DB_NAME is not defined in the environment',
            );
          }

          return client.db(dbName);
        } catch (err) {
          console.error('Database initialization failed', err);
          throw new InternalServerErrorException(
            'Failed to initialize MongoDB database',
          );
        }
      },
      inject: ['MONGO_CLIENT', ConfigService],
    },
  ],
  exports: ['MONGO_CLIENT', 'MONGO_DB'],
})
export class DataBaseModule {}

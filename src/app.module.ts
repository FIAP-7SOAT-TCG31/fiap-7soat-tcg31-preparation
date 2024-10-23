import { CommonModule, ContextModule } from '@fiap-burger/setup';
import { MongooseTransactionalModule } from '@fiap-burger/tactical-design/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './config/app.config';
import { MongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ContextModule.forRoot({}),
    CommonModule.forRootAsync({ useClass: AppConfig }),
    MongooseModule.forRootAsync({ useClass: MongooseConfig }),
    MongooseTransactionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

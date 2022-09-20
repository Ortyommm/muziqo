import { Module } from '@nestjs/common';
import { StaticController } from './static.controller';
import { AuthModule } from '../auth/auth.module';
import { StaticService } from './static.service';

@Module({
  controllers: [StaticController],
  imports: [AuthModule],
  providers: [StaticService],
})
export class StaticModule {}

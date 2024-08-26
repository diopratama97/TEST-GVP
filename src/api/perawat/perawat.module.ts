import { Module } from '@nestjs/common';
import { PerawatController } from './perawat.controller';
import { PerawatService } from './perawat.service';

@Module({
  providers: [PerawatService],
  controllers: [PerawatController],
})
export class PerawatModule {}

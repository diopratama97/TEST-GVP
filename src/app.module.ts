import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './api/auth/auth.module';
import { PoliModule } from './api/poli/poli.module';
import { PerawatModule } from './api/perawat/perawat.module';

@Module({
  imports: [CommonModule, AuthModule, PoliModule, PerawatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

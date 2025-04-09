import { Module } from '@nestjs/common';
import { JwtService } from './jwt-services/jwt.service';
import { JwtGenerationService } from './jwt-services/generation.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  providers: [JwtService, JwtGenerationService],
  exports: [JwtService,JwtGenerationService ],
  imports: [ConfigModule.forRoot()],
})
export class JwtModule {}

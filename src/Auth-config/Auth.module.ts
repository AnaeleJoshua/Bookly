import { Module } from '@nestjs/common';
import { Auth0Guard } from './auth0.guard';

@Module({
  providers: [Auth0Guard],
  exports: [Auth0Guard],
})
export class AuthModule {}

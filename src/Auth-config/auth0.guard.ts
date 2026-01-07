import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class Auth0Guard implements CanActivate {
  private jwks: ReturnType<typeof createRemoteJWKSet>;
  private issuer: string;
  private audience: string;

  constructor(private readonly configService: ConfigService) {
    this.issuer = this.configService.get<string>('AUTH0_ISSUER_URL')!;
    this.audience = this.configService.get<string>('AUTH0_AUDIENCE')!;

    if (!this.issuer || !this.audience) {
      throw new Error('Auth0 config missing');
    }
    
    this.jwks = createRemoteJWKSet(
      new URL(`${this.issuer}.well-known/jwks.json`),
    );
    console.log(`jwks: ${this.jwks}`)
    
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers?.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: this.issuer,
        audience: this.audience,
      });

      req.user = payload;
      return true;
    } catch (err: any) {
      console.error('JWT VERIFY ERROR:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

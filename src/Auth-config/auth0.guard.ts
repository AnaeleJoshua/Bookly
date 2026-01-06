import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import jwksClient, { SigningKey } from 'jwks-rsa';


// JWKS client (matches Auth0 template)
const issuer = process.env.AUTH0_ISSUER_URL;
const audience = process.env.AUTH0_AUDIENCE;
const database=process.env.DATABASE_URL;

if (!issuer) {
  throw new Error('AUTH0_ISSUER_URL is not defined in environment variables');
}
const client = jwksClient({
  jwksUri: `${issuer}/.well-known/jwks.json`,
});
console.log('JWKS URI:', `${issuer}/.well-known/jwks.json`);

// getKey function to retrieve signing key
function getKey(
  header: jwt.JwtHeader,
  callback: jwt.SigningKeyCallback,
) {
  if (!header.kid) {
    return callback(
      new Error('Missing kid in token header'),
      undefined,
    );
  }

  client.getSigningKey(header.kid, (err, key: SigningKey | undefined) => {
    if (err || !key) {
      return callback(err, undefined);
    }

    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export class Auth0Guard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    const options: jwt.VerifyOptions = {
      audience: [`${process.env.AUTH0_AUDIENCE}`],
      issuer: process.env.AUTH0_ISSUER_URL,
      algorithms: ['RS256'],
    };

    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, payload) => {
          if (err) return reject(err);
          resolve(payload);
        });
      });

      // attach user to request
      req.user = decoded;
      return true;
    } catch (err: any) {
      console.error('JWT VERIFY ERROR:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

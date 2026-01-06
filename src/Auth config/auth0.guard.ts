import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import jwksClient, { SigningKey } from 'jwks-rsa';

const client = jwksClient({
  jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
});

export class Auth0Guard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log(`Token: ${token}`);

    const decodedHeader = jwt.decode(token, { complete: true });
    if (!decodedHeader || !decodedHeader.header?.kid) {
      throw new UnauthorizedException("Invalid JWT header");
    }
    console.log("Decoded Header:", decodedHeader);
     try {
      const key = await client.getSigningKey(decodedHeader.header.kid);
      const publicKey = key.getPublicKey();

      const payload = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
        audience: process.env.AUTH0_AUDIENCE,
        issuer: [`${process.env.AUTH0_ISSUER_URL}`],
      });
    // const decoded = await new Promise((resolve, reject) => {
    //   jwt.verify(
    //     token,
    //     (header, callback) => {
    //       if (!header.kid) {
    //         return reject(
    //           new UnauthorizedException('Missing kid in token header'),
    //         );
    //       }

    //       client.getSigningKey(
    //         header.kid,
    //         (err, key: SigningKey | undefined) => {
    //           if (err || !key) {
    //             return reject(
    //               new UnauthorizedException('Unable to retrieve signing key'),
    //             );
    //           }

    //           callback(null, key.getPublicKey());
    //         },
    //       );
    //     },
    //     {
    //       audience: process.env.AUTH0_AUDIENCE,
    //       issuer: process.env.AUTH0_ISSUER_URL,
    //       algorithms: ['RS256'],
    //     },
    //     (err, payload) => {
    //       if (err) return reject(err);
    //       resolve(payload);
    //     },
    //   );
    // });
    console.log("VERIFIED PAYLOAD:", payload);


    req.user = payload;
    return true;
  }
     catch (err: any) {
      console.error("JWT VERIFY ERROR:", err.message);
      throw new UnauthorizedException(err.message);
}
}
}
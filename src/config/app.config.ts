import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => {
  return {
    env: process.env.NODE_ENV || 'dev',
    isProd: () => process.env.NODE_ENV === 'prod',
    port: Number(process.env.PORT || 8080),
    jwtSecret: process.env.ACCESS_JWT_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    jwtRefresh: process.env.REFRESH_JWT_SECRET,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    passwordSalt: process.env.PASSWORD_SALT,
    refreshSalt: process.env.REFRESH_SALT,
    tokenIssuer: process.env.TOKEN_ISSUER,
    tokenAudience: process.env.TOKEN_AUDIENCE,
    cookieDomain: process.env.COOKIE_DOMAIN,
  };
});

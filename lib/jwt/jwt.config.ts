import { JwtConfigFactory } from "./jwt-config.interface";

const jwtConfigFactory: JwtConfigFactory = () => ({
  secret: process.env.NEXTAUTH_SECRET!,
});

export { jwtConfigFactory };

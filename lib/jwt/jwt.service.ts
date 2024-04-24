import { SignJWT, jwtVerify } from "jose";
import { IJwtConfig } from "./jwt-config.interface";
import { AccessToken, IJwtService, JwtPayload } from "./jwt-service.interface";

class JwtService implements IJwtService {
  constructor(private readonly _config: IJwtConfig) {}

  private get _secret() {
    return new TextEncoder().encode(this._config.secret);
  }

  async sign<Payload extends JwtPayload = JwtPayload>(
    payload: Payload,
    expire: Date,
  ): Promise<AccessToken> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expire)
      .sign(this._secret);
  }

  async verify<Payload extends JwtPayload = JwtPayload>(
    token: AccessToken,
  ): Promise<Payload | undefined> {
    if (token) {
      const { payload } = await jwtVerify(token, this._secret);
      return payload as Payload;
    }
    return;
  }
}

export { JwtService };

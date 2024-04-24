// eslint-disable-next-line @typescript-eslint/ban-types
type JwtPayload = {};
type AccessToken = string;

interface IJwtService {
  sign<Payload extends JwtPayload = JwtPayload>(
    payload: Payload,
    expire: Date | number | string,
  ): Promise<AccessToken>;

  verify<Payload extends JwtPayload = JwtPayload>(
    token: AccessToken,
  ): Promise<Payload | undefined | false>;
}

export type { AccessToken, IJwtService, JwtPayload };

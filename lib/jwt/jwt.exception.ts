class JwtException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export { JwtException };

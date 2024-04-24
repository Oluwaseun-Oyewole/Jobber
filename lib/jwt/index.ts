import { IJwtService } from "./jwt-service.interface";
import { jwtConfigFactory } from "./jwt.config";
import { JwtService } from "./jwt.service";

export const jwtService: IJwtService = new JwtService(jwtConfigFactory());

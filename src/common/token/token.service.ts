import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verifyToken<T extends object = any>(token: string): Promise<T> {
    return this.jwtService.verifyAsync(token);
  }

  decodeToken<T = any>(token: string): T | null {
    return this.jwtService.decode(token) as T | null;
  }
}

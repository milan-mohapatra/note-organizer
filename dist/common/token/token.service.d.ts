import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signToken(payload: any): Promise<string>;
    verifyToken<T extends object = any>(token: string): Promise<T>;
    decodeToken<T = any>(token: string): T | null;
}

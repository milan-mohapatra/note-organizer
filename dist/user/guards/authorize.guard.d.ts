import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from 'src/common/token/token.service';
export declare class AuthorizeGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

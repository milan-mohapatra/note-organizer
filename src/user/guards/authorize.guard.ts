import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/common/token/token.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. EXTRACT REQUEST FROM EXECUTION CONTEXT
    const req: Request = context.switchToHttp().getRequest();

    // 2. EXTRACT JWT TOKEN FROM HEADER
    const token = req.headers.authorization?.split(' ').at(1);

    // 3. VALIDATE TOKEN AND PROVIDE / DENY ACCESS
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload = await this.tokenService.verifyToken(token);
      req['user'] = tokenPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

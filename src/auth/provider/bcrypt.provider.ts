import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(input: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(input.toString(), salt);
    return hashed;
  }

  async comparePassword(
    password: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password.toString(), hashedPassword);
  }
}

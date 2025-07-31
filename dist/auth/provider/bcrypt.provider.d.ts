import { HashingProvider } from './hashing.provider';
export declare class BcryptProvider implements HashingProvider {
    hashPassword(input: string | Buffer): Promise<string>;
    comparePassword(password: string | Buffer, hashedPassword: string): Promise<boolean>;
}

export declare abstract class HashingProvider {
    abstract hashPassword(data: string | Buffer): Promise<string>;
    abstract comparePassword(password: string | Buffer, hashedPassword: string | Buffer): Promise<boolean>;
}

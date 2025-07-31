import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function handleDatabaseError(error: unknown): never {
  if (error instanceof HttpException) {
    throw error;
  }

  throw new InternalServerErrorException(
    error instanceof Error ? error.message : 'Something went wrong',
  );
}

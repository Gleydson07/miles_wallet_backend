import { Prisma } from "@prisma/client";

export function ErrorHandler(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    
    console.error(prismaError);
    throw new Error(prismaError.code);
  }
}

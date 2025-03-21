import { PrismaClient as PrismaClientEspace } from "../../prisma/generated_clients/db_espace";

// Global type augmentation for development
const globalForPrisma = global as unknown as {
  prisma_espace?: PrismaClientEspace;
};

export const prisma_espace =
  globalForPrisma.prisma_espace ||
  new PrismaClientEspace({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma_espace = prisma_espace;
}

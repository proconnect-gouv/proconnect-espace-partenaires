import { PrismaClient as PrismaClientEspace } from "../../prisma/generated_clients/db_espace";
import {
  PrismaClient as PrismaClientProconnect,
  type OidcClient,
} from "../../prisma/generated_clients/db_proconnect";

// Global type augmentation for development
// This makes sure that the prisma clients are not re-initialized at each reload locally.
const globalForPrisma = global as unknown as {
  prisma_espace?: PrismaClientEspace;
  prisma_proconnect?: PrismaClientProconnect;
};

// Initialize clients with proper connection URLs
export const prisma_espace =
  globalForPrisma.prisma_espace ||
  new PrismaClientEspace({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

export const prisma_proconnect =
  globalForPrisma.prisma_proconnect ||
  new PrismaClientProconnect({
    datasources: {
      db: {
        url: process.env.MONGODB_CONNECTION_STRING,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma_espace = prisma_espace;
  globalForPrisma.prisma_proconnect = prisma_proconnect;
}

export { OidcClient };

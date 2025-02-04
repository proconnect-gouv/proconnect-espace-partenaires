import { PrismaClient as PrismaClientEspace } from "../../prisma/generated_clients/db_espace";
import {
  PrismaClient as PrismaClientProconnect,
  type OidcClient,
} from "../../prisma/generated_clients/db_proconnect";

// Global type augmentation for development
declare global {
  var prisma_espace: PrismaClientEspace | undefined;
  var prisma_proconnect: PrismaClientProconnect | undefined;
}

// Initialize clients with proper connection URLs
export const prisma_espace =
  global.prisma_espace ||
  new PrismaClientEspace({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

export const prisma_proconnect =
  global.prisma_proconnect ||
  new PrismaClientProconnect({
    datasources: {
      db: {
        url: process.env.MONGODB_CONNECTION_STRING,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma_espace = prisma_espace;
  global.prisma_proconnect = prisma_proconnect;
}

export { OidcClient };

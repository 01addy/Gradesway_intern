// Import PrismaClient from the Prisma package to interact with the database
import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient to manage database connections
const prisma = new PrismaClient();

// Export the Prisma instance so it can be used in other parts of the application
export default prisma;

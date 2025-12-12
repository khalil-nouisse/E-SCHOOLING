// Lazy Prisma client helper — require and create client at runtime only
// Use: const getPrisma = require('./src/prisma'); const prisma = getPrisma();

let prisma = null;

function getPrisma() {
  if (prisma) return prisma;
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
    return prisma;
  } catch (err) {
    
    throw new Error('@prisma/client not found — run `npm install` and `npx prisma generate`');
  }
}

module.exports = getPrisma;

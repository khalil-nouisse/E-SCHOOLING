const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not Set');

try {
    console.log('Attempting new PrismaClient()');
    const prisma = new PrismaClient();
    console.log('Success empty args');
} catch (e) {
    console.error('Failed empty args:', e.message);

    try {
        console.log('Attempting new PrismaClient({ datasources: ... })');
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
        console.log('Success with datasources');
    } catch (e2) {
        console.error('Failed with datasources:', e2.message);
    }
}

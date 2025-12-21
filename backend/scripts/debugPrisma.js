const Prisma = require('@prisma/client');
console.log('Keys in Prisma Client:', Object.keys(Prisma));
if (Prisma.Role) {
    console.log('Role Enum:', Prisma.Role);
} else {
    console.log('Role is not named exported.');
}
console.log('Prisma.Prisma?', Object.keys(Prisma.Prisma || {}));

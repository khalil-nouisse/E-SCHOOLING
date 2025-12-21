const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@gmail.com';
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Try to use the Role enum if available in exports, otherwise assume the string is fine (but previous logging suggested enum requirement)
    // If Schema has enum Role { ADMIN ... }, then prisma.Role.ADMIN should be the value.
    // Actually, typically it's exported as 'Role' from the client package.
    const role = Role ? Role.ADMIN : 'ADMIN';

    console.log(`Creating admin with Role: ${role}`);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {}, // If exists, do nothing
        create: {
            email,
            password: hashedPassword,
            first_name: 'Super',
            last_name: 'Admin',
            role: role,
            isVerified: true,
            otp: 123456, // Required by schema
            otpExpires: new Date(Date.now() + 1000 * 60 * 60),
        },
    });

    console.log('Admin user created/found:', admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

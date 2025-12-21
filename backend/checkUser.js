const prisma = require('./src/prisma');

async function main() {
    try {
        const user = await prisma.user.findUnique({ where: { id: 1 } });
        if (user) {
            console.log('User 1 exists:', user.email);
        } else {
            console.log('User 1 DOES NOT EXIST. This is why the fallback fails.');
            // Create dummy user 1?
            /*
            await prisma.user.create({ data: {
                id: 1, email: 'dummy@test.com', password: 'hash', role: 'CANDIDATE',
                first_name: 'Test', last_name: 'User', otp: 0
            }});
            */
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/bcrypt.password';

const prisma = new PrismaClient();

async function main() {
  const password = await hashPassword('12345678');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@keets.com' },
    update: {},
    create: {
      email: 'admin@keets.com',
      staffId: '000001',
      username: 'admin',
      password,
    },
  });
  const user = await prisma.user.upsert({
    where: { email: 'user@keets.com' },
    update: {},
    create: {
      email: 'user@keets.com',
      staffId: '000002',
      username: 'user',
      password,
    },
  });

  delete admin.password;
  delete user.password;

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

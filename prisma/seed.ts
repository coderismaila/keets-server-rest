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
      role: 'ADMIN',
      password,
    },
  });

  const tm1 = await prisma.user.upsert({
    where: { email: 'tmgr@keets.com' },
    update: {},
    create: {
      email: 'tmgr@keets.com',
      staffId: '000002',
      username: 'tmgr',
      password,
    },
  });

  const am1 = await prisma.user.upsert({
    where: { email: 'amgr@keets.com' },
    update: {},
    create: {
      email: 'amgr@keets.com',
      staffId: '000003',
      username: 'amgr',
      password,
    },
  });

  const areaoffice = await prisma.areaOffice.create({
    data: {
      name: 'rigasa',
    },
  });

  const am1Profile = await prisma.profile.create({
    data: {
      firstName: 'hadiza',
      lastName: 'bologo',
      gender: 'FEMALE',
      phoneNumber: '+2348062176407',
      areaOffice: {
        connect: { id: areaoffice.id },
      },
      user: {
        connect: {
          id: am1.id,
        },
      },
    },
  });

  const tm1Profile = await prisma.profile.create({
    data: {
      firstName: 'aminu',
      lastName: 'usman',
      gender: 'MALE',
      phoneNumber: '+2348064376407',
      user: {
        connect: {
          id: tm1.id,
        },
      },
      areaOffice: {
        connect: { id: areaoffice.id },
      },
    },
  });

  const profile = await prisma.profile.create({
    data: {
      firstName: 'ismail',
      lastName: 'hassan',
      gender: 'MALE',
      phoneNumber: '+2348062132407',
      user: {
        connect: {
          id: admin.id,
        },
      },
      areaOffice: {
        create: {
          name: 'head office',
        },
      },
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'user1@keets.com' },
    update: {},
    create: {
      email: 'user1@keets.com',
      staffId: '000005',
      username: 'user1',
      role: 'USER',
      password,
    },
  });

  const profile1 = await prisma.profile.create({
    data: {
      firstName: 'umar',
      lastName: 'aliyu',
      gender: 'MALE',
      phoneNumber: '+2348062132408',
      user: {
        connect: { id: user1.id },
      },
      areaOffice: {
        connect: {
          name: 'rigasa',
        },
      },
    },
  });

  await prisma.areaOffice.update({
    where: { name: 'rigasa' },
    data: {
      areaManager: { connect: { id: am1Profile.id } },
      technicalManager: { connect: { id: tm1Profile.id } },
    },
  });

  console.log({ admin, user1, profile, profile1, am1Profile, tm1Profile });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/bcrypt.password';
import { areaOffices, jobDescription } from './data';

const prisma = new PrismaClient();

async function main() {
  // default password
  const password = await hashPassword('12345678');

  // create job descriptions
  await prisma.jobDescription.createMany({ data: jobDescription });

  // create area offices
  await prisma.areaOffice.createMany({
    data: areaOffices,
  });

  // create super user
  await prisma.user.upsert({
    where: { email: 'ismaila.hassan@kadunaelectric.com' },
    update: {},
    create: {
      email: 'ismaila.hassan@kadunaelectric.com',
      staffId: '01048',
      username: 'ismaila.hassan',
      password,
      role: 'SUPER',
      firstName: 'ismaila',
      lastName: 'hassan',
      gender: 'MALE',
      designation: 'TEAM_MEMBER',
      areaOffice: {
        connectOrCreate: {
          where: { name: 'head office' },
          create: { name: 'head office' },
        },
      },
      jobDescription: {
        connectOrCreate: {
          where: { name: 'analytics and coordination officer' },
          create: {
            name: 'analytics and coordination officer',
            description:
              'responsible for data collation and preparation for technical service department',
          },
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient, Roles } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Adli',
      role : Roles.ADMIN,
    },
  })
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
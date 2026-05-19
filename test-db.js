const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const phone = '5512345678';
  const guia = await prisma.usuario.findFirst({
    where: {
      telefono: phone,
    },
  });
  console.log("GUIDE FOUND:", JSON.stringify(guia, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());

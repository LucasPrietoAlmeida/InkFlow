const prisma = require("../src/config/prisma");
const bcrypt = require("bcrypt");

async function main() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await prisma.user.upsert({
        where: {
            email: "lucas@test.com",
        },
        update: {},
        create: {
            email: "lucas@test.com",
            username: "lucas",
            password: hashedPassword,
            bio: "Desarrollador Full Stack",
            avatar: null,
        },
    });

    const categories = [
        "General",
        "Presentaciones",
        "Anuncios",
        "Tutoriales",
        "Recursos",
        "Debate",
        "Preguntas",
        "Feedback",
        "Noticias",
        "Oportunidades de empleo",
    ];

    for (const name of categories) {
        await prisma.category.upsert({
            where: {
                slug: name.toLowerCase().replace(/\s+/g, "-"),
            },
            update: {},
            create: {
                name,
                slug: name.toLowerCase().replace(/\s+/g, "-"),
            },
        });
    }

    console.log("Seed completado");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
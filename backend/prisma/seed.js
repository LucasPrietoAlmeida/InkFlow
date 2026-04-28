const prisma = require("../src/config/prisma");

async function main() {
    await prisma.user.upsert({
        where: {
            email: "lucas@test.com",
        },
        update: {},
        create: {
            email: "lucas@test.com",
            username: "lucas",
            password: "123456",
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
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
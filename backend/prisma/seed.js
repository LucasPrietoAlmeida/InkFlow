const prisma = require("../src/config/prisma");

async function main() {
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
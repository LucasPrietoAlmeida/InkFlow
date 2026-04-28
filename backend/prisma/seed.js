const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
        const slug = name.toLowerCase().replace(/\s+/g, "-");

        await prisma.category.upsert({
            where: { slug },
            update: {},
            create: {
                name,
                slug,
            },
        });
    }

    console.log("Seed completado correctamente");
}

main()
    .catch((e) => {
        console.error("SEED ERROR:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
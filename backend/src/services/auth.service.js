const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const register = async ({ email, username, password }) => {
    // 1. Validación básica
    if (!email || !username || !password) {
        throw new Error("Missing fields");
    }

    // 2. Comprobar duplicados
    const existingUser = await prisma.user.findFirst({
        where: {
        OR: [{ email }, { username }],
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // 3. Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Crear usuario
    const user = await prisma.user.create({
        data: {
        email,
        username,
        password: hashedPassword,
        },
        select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        },
    });

    return user;
};

module.exports = {
    register,
};
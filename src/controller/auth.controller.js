const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user', error });
  } finally {
    await prisma.$disconnect();
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const logOutAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  logOutAdmin,
};

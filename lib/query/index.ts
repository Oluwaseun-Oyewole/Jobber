export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    return;
  }
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};

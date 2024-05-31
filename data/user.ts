import db from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
export const getUserAvatar = async (id: string | undefined) => {
  try {
    if (!id) return null;
    const avatar = await db.invoice.findUnique({
      where: { id },
    });
    return avatar?.description;
  } catch {
    return null;
  }
};

import bcrypt from "bcrypt"

const hashed = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const compared = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashed, compared }
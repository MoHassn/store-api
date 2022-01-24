import bcrypt from 'bcrypt';

export default async function generateHash(plainText: string) {
  const hash = await bcrypt.hash(plainText, 10);
  return hash;
}

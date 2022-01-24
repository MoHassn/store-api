import bcrypt from 'bcrypt';

export default async function comparePass(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

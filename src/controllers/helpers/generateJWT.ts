import * as JWT from 'jsonwebtoken';
import { UserType } from '../../models/user.model';
export default function generateJWT(user: UserType) {
  // @ts-ignore
  return JWT.sign(user, process.env.JWT_SECRET);
}

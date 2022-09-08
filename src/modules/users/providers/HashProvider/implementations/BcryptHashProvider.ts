import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

class BcryptHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BcryptHashProvider;
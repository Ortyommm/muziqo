import * as crypto from 'crypto';
import * as util from 'util';

/*
const algorithm = 'aes-256-cbc';
const key = '0094cadce1fbe29107f19e47247f1d41';

function encrypt(string: string) {
  const iv = crypto.randomBytes(8).toString('hex');
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(string, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { string: encrypted, iv };
}

function decrypt({ string, iv }: { string: string; iv: string }) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(string, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
*/

async function scryptHash(string: string, salt?: string) {
  const saltInUse = salt || crypto.randomBytes(16).toString('hex');
  const hashBuffer = await util.promisify(crypto.scrypt)(string, saltInUse, 32);
  return `${(hashBuffer as Buffer).toString('hex')}:${saltInUse}`;
}

async function scryptVerify(testString: string, hashAndSalt: string) {
  const [, salt] = hashAndSalt.split(':');
  return (await scryptHash(testString, salt)) === hashAndSalt;
}

export { scryptVerify, scryptHash /*, encrypt, decrypt*/ };

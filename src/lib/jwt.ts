import jwt from 'jsonwebtoken';

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is not defined');
}

export const sign = (payload: object) => jwt.sign(payload, PRIVATE_KEY, { expiresIn: '30d' });
export const verify = (token: string) => {
  try {
    return jwt.verify(token, PRIVATE_KEY);
  } catch (error) {
    return false;
  }
};

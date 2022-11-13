import jwt from 'jsonwebtoken';

import config from "../configs/index.config"

const key = config.privateKey as string

export async function sign(
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, key, options);
}

export async function decode(token: string) {
  try {
    const decoded = jwt.verify(token, key);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.log(error)
    return {
      valid: false,
      expired:'jwt expired',
      decoded: null
    };
  }
}

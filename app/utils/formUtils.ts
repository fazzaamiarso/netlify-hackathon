import { json } from '@remix-run/node';
import { FIXME_ANY } from '~/types/global';

export const validateThought = (thought: string) => {
  if (thought.length < 20)
    return 'Less than 20 characters. Your thought should be more descriptive so people can understand better';
};
export const validateLyrics = (lyrics: string) => {
  if (lyrics.length < 10 && lyrics.length > 0)
    return 'Less than 10 characters. The lyrics should be more than 10 characters or empty';
};
export const validatePassword = (password: string) => {
  if (password.length < 6) return 'Password should be at least 6 characters long';
  if (!/\d/i.test(password)) return 'Password should contain at least 1 number';
};
export const validateEmail = (email: string) => {
  const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexp.test(email)) return 'Invalid email address';
};

export const haveErrors = (fieldErrors: FIXME_ANY) => {
  return Object.values(fieldErrors).some(Boolean);
};

export const badRequest = (data: FIXME_ANY) => {
  return json(data, { status: 400 });
};

const getRandomNumberFromString = (arr: string): string =>
  arr[Math.floor(Math.random() * arr.length)];
export const generateRandomString = () => {
  const ALPHABET = 'abcdefghijklmnovqrstuvwxyz';
  const NUMBER = '1234567890';
  let generated = [];
  for (let i = 0; i < 8; i++) {
    if (Math.random() > 0.5) {
      generated.push(getRandomNumberFromString(ALPHABET));
      continue;
    }
    generated.push(getRandomNumberFromString(NUMBER));
  }
  return generated.join('');
};
export const MAX_CHARACTERS = 140;
export const WS = process.env.EXPO_PUBLIC_WS;

export const validatePhone = (phone: string): boolean => {
  const regex = /^\+?[1-9]\d{7,14}$/;
  return regex.test(phone);
}
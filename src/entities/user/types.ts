import { User } from '@prisma/client';

export interface LoginPayload {
  name: string;
  password: string;
}

export type MeUser = Omit<User, 'password' | 'tokens'>;

export interface ChangePasswordPayload {
  password: string;
  newPassword: string;
}

export type SafeUser = Omit<User, 'password' | 'tokens'>;

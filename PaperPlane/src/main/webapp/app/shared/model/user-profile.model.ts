import { IUser } from 'app/shared/model/user.model';

export interface IUserProfile {
  id?: number;
  profileId?: number | null;
  username?: string | null;
  password?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IUserProfile> = {};

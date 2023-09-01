import { IUser } from 'app/shared/model/user.model';
import { IDocument } from 'app/shared/model/document.model';

export interface IApplicationUser {
  id?: number;
  applicationUserId?: number | null;
  accessControl?: boolean | null;
  internalUserReferenceId?: IUser | null;
  applicationUserReferenceIds?: IDocument[] | null;
}

export const defaultValue: Readonly<IApplicationUser> = {
  accessControl: false,
};

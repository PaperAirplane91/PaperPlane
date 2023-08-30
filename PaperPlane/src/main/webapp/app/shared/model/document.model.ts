import { IImages } from 'app/shared/model/images.model';
import { IUser } from 'app/shared/model/user.model';

export interface IDocument {
  id?: number;
  documentId?: number | null;
  title?: string | null;
  content?: string | null;
  images?: IImages[] | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IDocument> = {};

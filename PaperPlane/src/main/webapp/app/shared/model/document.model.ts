import { IImages } from 'app/shared/model/images.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface IDocument {
  id?: number;
  title?: string | null;
  content?: string | null;
  archived?: boolean | null;
  referenceImageIds?: IImages[] | null;
  applicationUser?: IApplicationUser | null;
}

export const defaultValue: Readonly<IDocument> = {
  archived: false,
};

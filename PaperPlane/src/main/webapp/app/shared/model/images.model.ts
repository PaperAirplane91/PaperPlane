import { IDocument } from 'app/shared/model/document.model';

export interface IImages {
  id?: number;
  imageId?: number | null;
  documentId?: number | null;
  imageData?: string | null;
  caption?: string | null;
  document?: IDocument | null;
}

export const defaultValue: Readonly<IImages> = {};

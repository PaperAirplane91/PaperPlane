import { IDocument } from 'app/shared/model/document.model';

export interface IImages {
  id?: number;
  imageDataContentType?: string | null;
  imageData?: string | null;
  caption?: string | null;
  imageS3Url?: string | null;
  referenceDocumentId?: IDocument | null;
}

export const defaultValue: Readonly<IImages> = {};

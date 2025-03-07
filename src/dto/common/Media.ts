import { MediaType } from '~/constants/MediaType';

export class Media {
  url: string;
  type: MediaType;
  file?: File;

  constructor(url: string, type: MediaType, file?: File) {
    this.url = url;
    this.type = type;
    if (file) {
      this.file = file;
    }
  }
}

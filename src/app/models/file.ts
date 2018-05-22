export class File {
  $key?: string;
  name?: string;
  url?: string;
  file?: File;
  user?: string;

  constructor(file: File) {
  this.file = file;
  }
}

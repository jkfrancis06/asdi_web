import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import {AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import {File} from '../../models/file';

@Injectable()
export class FileService {
  private basePath = '/uploads';

  fichier: any;

  files: Observable<any[]>;
  filesRef: AngularFireList<any>;
  file: Observable<any>
  fileRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {

    this.filesRef = this.db.list('/temp_files');
    // this.admins = this.adminsRef.valueChanges();
    this.files = this.filesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  pushFileToStorage(fileUpload: File, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
        return error;
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
  }


  private saveFileData(fileUpload: File) {
    this.db.list('temp_files/').push(fileUpload);
  }

  getFileUploads(user) {
    this.filesRef =  this.db.list('/temp_files', ref => ref.orderByChild('user').equalTo(user));
    this.file = this.filesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.file;
  }

  deleteFileUpload(key) {
    return this.filesRef.remove(key);

  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}

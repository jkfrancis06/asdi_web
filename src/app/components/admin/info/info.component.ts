import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin/admin.service';
import {Admin} from '../../../models/admin';
import {MzToastService} from "ng2-materialize";
import {File} from '../../../models/file';
import {FileService} from "../../../services/farm/file.service";


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private adminService: AdminService,
              private toastService: MzToastService,
              private uploadService: FileService) { }

  admin = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    adress: '',
    username: '',
    password: '',
    conf_password: '',
    enabled: true,
    role: 'ROLE_ADMIN',
    key: '',
    pic: ''
  };

  url: any;

  empty_password = false
  empty_adress = false
  short_password = false
  match_password = false

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  uploadedFiles: any;



  ngOnInit() {
    this.adminService.loadLocalAdmin(localStorage.getItem('admin_data')).subscribe(
      admin => {
        console.log(admin);
        this.admin = admin;
      }
    );

    this.uploadService.getFileUploads(localStorage.getItem('admin_data')).subscribe(
      files => {
        for (let i = 0 ; i < files.length; i++) {
          this.uploadedFiles = files[i];
          this.uploadService.deleteFileUpload(files[i].key);
        }
        console.log(this.uploadedFiles);
      });
  }


  onSubmit({value, valid}: {value: Admin, valid: boolean}) {
    this.validation(value);
  }


  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.admin.pic = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    console.log(file);

    this.currentFileUpload = new File(file);
    this.currentFileUpload.user = localStorage.getItem('admin_data');
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

  validation(value) {
    if (value.password === '') {
      this.empty_password = true;
    } else {
      this.empty_password = false;
      if (value.password.length < 6) {
        this.short_password = true;
      } else {
        this.short_password = false;
        console.log(value.password)
        console.log(value.conf_password)
        if (value.password !== value.conf_password) {
          this.match_password = true;
        } else {
          this.match_password = false;
          if (this.uploadedFiles !== '') {
            value.pic = this.uploadedFiles.url;
          }
          this.adminService.updateAdmin(this.admin.key, value);
          this.toastService.show('Informations modifie avec succces', 4000, 'green');
        }
      }
    }
  }

}

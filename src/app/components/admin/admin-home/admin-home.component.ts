import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor() {
    console.log(localStorage.getItem('admin_data'));
  }

  ngOnInit() {
  }

}

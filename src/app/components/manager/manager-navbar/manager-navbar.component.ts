import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css']
})
export class ManagerNavbarComponent implements OnInit {

  constructor() { }

  key: any;

  ngOnInit() {
    this.key = localStorage.getItem('manager_data');
  }

}

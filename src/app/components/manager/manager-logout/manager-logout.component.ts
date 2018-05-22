import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-manager-logout',
  templateUrl: './manager-logout.component.html',
  styleUrls: ['./manager-logout.component.css']
})
export class ManagerLogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/manager/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import {FarmService} from '../../../services/admin/farm.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manager-farm',
  templateUrl: './manager-farm.component.html',
  styleUrls: ['./manager-farm.component.css']
})
export class ManagerFarmComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['key'];
    console.log(this.id);
  }

}

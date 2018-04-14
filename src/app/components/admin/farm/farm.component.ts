import { Component, OnInit } from '@angular/core';
import {FarmService} from '../../../services/admin/farm.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  show = true;
  farms: any;

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%'
  };

  constructor(public farmService: FarmService) { }

  ngOnInit() {
    this.farmService.getFarms().subscribe(
      farms => {
        this.farms = farms;
        this.show = false;
        console.log(this.farms);
      });
  }

}

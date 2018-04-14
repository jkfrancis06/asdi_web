import { Component, OnInit } from '@angular/core';
import {FarmService} from '../../../services/admin/farm.service';
import {ManagerService} from "../../../services/admin/manager.service";
import {Farm} from "../../../models/farm";

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  show = true;
  farms: any;
  managers: any;

  farm: Farm = {
    name : '',
    description : '',
    long : null,
    lat : null,
    activities : '',
    adress : '',
    contact : '',
    prefecture : '',
    canton : '',
    ville : '',
    gestionnaires : [],
  }

  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%'
  };

  constructor(public farmService: FarmService, public managerService: ManagerService) { }

  ngOnInit() {
    this.farmService.getFarms().subscribe(
      farms => {
        this.farms = farms;
        this.show = false;
        console.log(this.farms);
      });
    this.managerService.loadManagersForSelect().subscribe(
      manager => {
        this.managers = manager;
        console.log(this.managers);
      });
  }

  onSubmit({value, valid}: {value: Farm, valid: boolean}) {
    console.log(value);
  }

}

import {Component, ComponentRef, OnInit} from '@angular/core';
import {FarmService} from '../../../services/admin/farm.service';
import {ManagerService} from "../../../services/admin/manager.service";
import {Farm} from "../../../models/farm";
import {MzBaseModal, MzToastService} from "ng2-materialize";


@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  show = true;
  key: '';
  farms: any;
  managers: any;
  modifFarm: Farm = {
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
    enable: true
  }

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
    enable: true
  }
  empty = {
    name : false,
    description : false,
    long : false,
    lat : false,
    activities : false,
    adress : false,
    contact : false,
    prefecture : false,
    canton : false,
    ville : false,
    gestionnaires : false
  }
  modif_empty = {
    name : false,
    description : false,
    long : false,
    lat : false,
    activities : false,
    adress : false,
    contact : false,
    prefecture : false,
    canton : false,
    ville : false,
    gestionnaires : false
  }
  valid = false;
  gestionnaires = [];
  modal: any;

  modalOptions: Materialize.ModalOptions = {
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%'
  };

  private modalExampleRef: ComponentRef<MzBaseModal>;

  constructor(private toastService: MzToastService, public farmService: FarmService, public managerService: ManagerService) { }

  ngOnInit() {
    // gets farms
    this.farmService.getFarms().subscribe(
      farms => {
        this.managerService.loadManagersForSelect().subscribe(
          manager => {
            this.farms = farms;
            this.show = false;
            this.managers = manager;
            console.log(this.farms);
            console.log(this.managers);
            this.show = false;
          });
      });
  }

  onSubmit({value, valid}: {value: Farm, valid: boolean}) {
    console.log(value);
    if (value.name === '') {
      this.empty.name = true;
      this.valid = false;
    } else {
      this.empty.name = false;
      this.valid = true
    }
    if (value.description === '') {
      this.empty.description = true;
      this.valid = false;
    } else {
      this.empty.description = false;
      this.valid = true
    }
    if (value.long === null) {
      this.empty.long = true;
      this.valid = false;
    } else {
      this.empty.long = false;
      this.valid = true;
    }
    if (value.lat === null) {
      this.empty.lat = true;
      this.valid = false;
    } else {
      this.empty.lat = false;
      this.valid = true;
    }
    if (value.activities === '') {
      this.empty.activities = true;
      this.valid = false;
    } else {
      this.empty.activities = false;
      this.valid = true
    }
    if (value.adress === '') {
      this.empty.adress = true;
      this.valid = false;
    } else {
      this.empty.adress = false;
      this.valid = true;
    }
    if (value.contact === '') {
      this.empty.contact = true;
      this.valid = false;
    } else {
      this.empty.contact = false;
      this.valid = true
    }
    if (value.prefecture === '') {
      this.empty.prefecture = true;
      this.valid = false;
    } else {
      this.empty.prefecture = false;
      this.valid = true
    }
    if (value.canton === '') {
      this.empty.canton = true;
      this.valid = false;
    } else {
      this.empty.canton = false;
      this.valid = true
    }
    if (value.ville === '') {
      this.empty.ville = true;
      this.valid = false;
    } else {
      this.empty.ville = false;
      this.valid = true
    }
    if (value.gestionnaires.length === 0) {
      this.empty.gestionnaires = true;
      this.valid = false;
    } else {
      this.empty.gestionnaires = false;
      this.valid = true;
    }
    this.commitChanges(this.valid, value);
  }

  commitChanges(valid, value) {
    if (valid === true) {
      // check in manangers the corresponding manager in push it into farms
          let temp = [];
          for (let i = 0; i < value.gestionnaires.length; i++) {
            for (let j = 0; j < this.managers.length; j++) {
              if (value.gestionnaires[i] === this.managers[j].key) {
                temp.push(this.managers[j]);
              }
            }
          }
          console.log(temp);
          value.gestionnaires = temp;
          value.enabled = true
          this.farmService.addFarm(value);
          this.modal.close()
          $('#modifSheetModal').modal('close');
          this.toastService.show('Ferme ajoutee avec succces', 4000, 'green');
    }
  }

  // enamble farms

  enableFarm(key, enabled, index) {
    let farm = this.farms[index];
    if (enabled === true) {
      farm.enabled = false;
      this.farmService.activateFarm(key, farm);
      console.log('ok');
    } else {
      farm.enabled = true;
      this.farmService.activateFarm(key, farm);
    }
  }

  // Push selected farm in for modification
  changeFarm(index, key) {
    this.modifFarm = this.farms[index];
    console.log(this.modifFarm)
    this.key = key;
  }

  // get modal template value
  getModalValue(modal) {
    this.modal = modal;
    console.log(this.modal);
  }


  // Form valid verification
  onChange({value, valid}: {value: Farm, valid: boolean}) {
    console.log(this.modifFarm);
    if (this.modifFarm.name === '') {
      this.modif_empty.name = true;
      this.valid = false;
    } else {
      this.modif_empty.name = false;
      this.valid = true;
    }
    if (this.modifFarm.description === '') {
      this.modif_empty.description = true;
      this.valid = false;
    } else {
      this.modif_empty.description = false;
      this.valid = true
    }
    if (this.modifFarm.long === null) {
      this.modif_empty.long = true;
      this.valid = false;
    } else {
      this.modif_empty.long = false;
      this.valid = true;
    }
    if (this.modifFarm.lat === null) {
      this.modif_empty.lat = true;
      this.valid = false;
    } else {
      this.modif_empty.lat = false;
      this.valid = true;
    }
    if (this.modifFarm.activities === '') {
      this.modif_empty.activities = true;
      this.valid = false;
    } else {
      this.modif_empty.activities = false;
      this.valid = true
    }
    if (this.modifFarm.adress === '') {
      this.modif_empty.adress = true;
      this.valid = false;
    } else {
      this.modif_empty.adress = false;
      this.valid = true;
    }
    if (this.modifFarm.contact === '') {
      this.modif_empty.contact = true;
      this.valid = false;
    } else {
      this.modif_empty.contact = false;
      this.valid = true
    }
    if (this.modifFarm.prefecture === '') {
      this.modif_empty.prefecture = true;
      this.valid = false;
    } else {
      this.modif_empty.prefecture = false;
      this.valid = true
    }
    if (this.modifFarm.canton === '') {
      this.modif_empty.canton = true;
      this.valid = false;
    } else {
      this.modif_empty.canton = false;
      this.valid = true
    }
    if (this.modifFarm.ville === '') {
      this.modif_empty.ville = true;
      this.valid = false;
    } else {
      this.modif_empty.ville = false;
      this.valid = true
    }
    if (this.modifFarm.gestionnaires.length === 0) {
      this.modif_empty.gestionnaires = true;
      this.valid = false;
    } else {
      this.modif_empty.gestionnaires = false;
      this.valid = true;
    }
    this.commitModifChanges(this.valid, this.modifFarm);
  }


  // check in manangers the corresponding manager in push it into farms

  commitModifChanges(valid, value) {
    if (valid === true) {
      let temp = [];
      if (this.gestionnaires.length > 0) {
        for (let i = 0; i < this.gestionnaires.length; i++) {
          for (let j = 0; j < this.managers.length; j++) {
            if (this.gestionnaires[i] === this.managers[j].key) {
              temp.push(this.managers[j]);
            }
          }
        }
        value.gestionnaires = temp;
      }
      console.log(this.gestionnaires);
      value.enabled = true
      console.log(value);
      this.farmService.updateFarm(value, this.key);
      this.modal.close()
      $('#modifSheetModal').modal('close');
      this.toastService.show('Ferme modifiee avec succces', 4000, 'green');
    }
  }



}

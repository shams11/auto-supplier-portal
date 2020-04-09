import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-production-data-form',
  templateUrl: './production-data-form.component.html',
  styleUrls: ['./production-data-form.component.css']
})
export class ProductionDataFormComponent implements OnInit, OnDestroy {

  NUMBER_OF_INPUTS = 5;
  partDimensions: string;
  productionDataForm: FormGroup;
  submitted = false;
  counter = 0;
  arr: [][][];
  constructor(private fb: FormBuilder,
              private alertService: AlertService) { }

  get productionDataFields() {
    return this.productionDataForm.get('productionDataFieldsArray') as FormArray;
  }

  addProductionDataFields() {
    this.productionDataFields.push(this.fb.control(''));
  }


  ngOnInit() {
    // this.partDimensions = '[{"groupName":"Dimensional Requirement","values":[{"name":"hole size","standardValue":"100mm"},{"name":"datum pin","standardValue":"100mm"}]},{"groupName":"Part Apperance","values":[{"name":"cracks at riveting portion","standardValue":"100mm"},{"name":"caulking","standardValue":"100mm"}]}]';
    this.partDimensions = '[{"groupName":"Dimensional Requirement","values":[[{"name":"Hole Size","standardValue":"2 * 9.2 + 0.1"},{"name":"Datum Pin Threaded Taper Pin","standardValue":""}],[{"name":"Slot Hole Pin","standardValue":"2 * 9.2 + 0.1"},{"name":"Datum Pin Threaded Taper Pin","standardValue":""}],[{"name":"Pitch","standardValue":"70+0.5"}],[{"name":"Surface AA","standardValue":"1.0"},{"name":"Trim Line","standardValue":"1.0"}],[{"name":"Surface AA","standardValue":"1.0"}],[{"name":"Surface AA","standardValue":"0.7"},{"name":"DIM","standardValue":"24.2+0.5"},{"standardValue":"1.4+0.7"},{"standardValue":"1.4+0.7"},{"standardValue":"1.4+0.7"},{"standardValue":"1.4+0.7"}],[{"name":"Hole Position Pin Size","standardValue":"0.5+0.01"},{"name":"Hole Size","standardValue":"0.7+0.5/-0.2"},{"name":"Surface AA","standardValue":"+0.7"}],[{"name":"Slot Hole Size","standardValue":"12*7+0.5/-0.2"},{"name":"Slot Hole Position Pin Size","standardValue":"10*5+0.02"}],[{"name":"Hole Size","standardValue":"0.7+0.5/-0.2"},{"name":"Hole Position Pin Size","standardValue":"6.0+0.01"}],[{"name":"Hole Size","standardValue":"0.8+0.7/-0.0"},{"name":"Hole Position Pin Size","standardValue":"0.6+0.02"}]]},{"groupName":"Part Apperance","values":[[{"name":"Cracks At Riveting Portion, BURR Black Spot"}],[{"name":"Chile Parts(Bush & Washer) Missing/Wrong Assembly"}],[{"name":"Arm Shall Be Rotate Smoothly"}],[{"name":"Caulking"},{"name":"Apply Grease on Sliding And Rotating Portion"}]]},{"groupName":"Functional & Performance","values":[[{"name":"sub-heading","heading":"Link Rotating Force"},{"name":"Link Rotating Force","standardValue":"12.3N TO 27.3N"}],[{"name":"sub-heading","heading":"Surface Treatment"},{"name":"Thickness Tester"},{"name":"Should Be Conform"}],[{"name":"sub-heading","heading":"Raw Material"},{"name":"Arm lagguage Compt Hinge"},{"name":"Link Lagguage Compartment"},{"name":"Pin"},{"name":"Washer Plate"},{"name":"Bush"},{"name":"Grease"}]]},{"groupName":"Part Weight","values":[[{"name":"Part Weight","standardValue":"0.69Kgs"}]]},{"groupName":"Part identification","values":[[{"name":"Part identification No Marks"}]]},{"groupName":"SOC","values":[[{"name":"Substance of Enviornmental Free "}]]}]';

    this.partDimensions = JSON.parse(this.partDimensions);
    this.productionDataForm = this.fb.group({
      productionDataFieldsArray: this.fb.array([
          this.fb.control('')
      ])
    });
    // this.addProductionDataFields();
    console.log('counter : ' +  this.productionDataFields.controls.length);
  }

  createProductionData() {
  }

  get f() {
    return this.productionDataForm.controls;
  }

  ngOnDestroy() {
    this.alertService.clear();
  }

  update($event: Event, i: number, j: number, k: number) {
    // console.log('event ::: ' + $event + '   i, i, k  :: ' + i + j + k);
    // console.log($event, i, j, k);

  }
}

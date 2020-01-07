import { Component, OnInit } from '@angular/core';
import { ModelService } from '../add-model/model.service';

@Component({
  selector: 'app-modeldashboard',
  templateUrl: './modeldashboard.component.html',
  styleUrls: ['./modeldashboard.component.css']
})
export class ModelDashboardComponent implements OnInit {

  private brandId: string;
  private models: any;

  constructor(private modelService: ModelService) {
  }

  ngOnInit() {
    this.getAllModelsForLoggedInUser(this.brandId);
  }

  private getAllModelsForLoggedInUser(brandId) {
    this.modelService.getAllModelsByBrand(brandId)
        .pipe()
        .subscribe(data => {
          this.models = data;
        }, error => {
          console.log(error);
        });
  }

}

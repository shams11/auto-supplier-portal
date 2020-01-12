import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModelService } from '../add-model/model.service';
import { ErrorService } from '../error/error.service';
import { Model } from '../common/models/model';

@Component({
  selector: 'app-modeldashboard',
  templateUrl: './modeldashboard.component.html',
  styleUrls: ['./modeldashboard.component.css']
})
export class ModelDashboardComponent implements OnInit {

  private brandId: string;
  private models: any;

  constructor(private modelService: ModelService,
              private errorService: ErrorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.brandId = params.brandId;
    });
    this.getAllModelsForLoggedInUser(this.brandId);
  }

  private getAllModelsForLoggedInUser(brandId) {
    this.modelService.getAllModelsByBrand(brandId)
        .pipe()
        .subscribe(data => {
          this.models = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }

  selectedModel(model: Model) {
    this.router.navigateByUrl('/variants?modelId=' + model.id + '&modelName=' + model.name);
  }
}

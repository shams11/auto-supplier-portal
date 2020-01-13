import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { ActivatedRoute, Router } from '@angular/router';

import { VariantService } from '../add-variant/variant.service';

@Component({
  selector: 'app-variantdashboard',
  templateUrl: './variantdashboard.component.html',
  styleUrls: ['./variantdashboard.component.css']
})
export class VariantDashboardComponent implements OnInit {

  private modelId: string;
  private modelName: string;
  private variants: any;

  constructor(private variantService: VariantService,
              private errorService: ErrorService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modelId = params.modelId;
      this.modelName = params.modelName;
    });
    this.getAllVariantsByModelId(this.modelId);
  }

  private getAllVariantsByModelId(modelId) {
    this.variantService.getAllVariantsByModel(modelId)
        .pipe()
        .subscribe(data => {
          this.variants = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }

  selectedModel(variant) {
    this.router.navigateByUrl('/parts?variantId=' + variant.id + '&variantCode=' + variant.code);
  }
}

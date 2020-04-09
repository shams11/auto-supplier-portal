import { Component, OnInit } from '@angular/core';

import { ErrorService } from '../error/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PartService } from '../add-part/part.service';

@Component({
  selector: 'app-partdashboard',
  templateUrl: './partdashboard.component.html',
  styleUrls: ['./partdashboard.component.css']
})
export class PartDashboardComponent implements OnInit {

  private variantId: string;
  private variantCode: string;
  private parts: any;

  constructor(private partService: PartService,
              private errorService: ErrorService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.variantId = params.variantId;
      this.variantCode = params.variantCode;
    });
    this.getAllPartsByVariantId(this.variantId);
  }

  private getAllPartsByVariantId(variantId) {
    this.partService.getAllPartsByVariantId(variantId)
        .pipe()
        .subscribe(data => {
          this.parts = data;
        }, error => {
          this.errorService.goToErrorPage(error);
        });
  }

  onPartSelect(partId: string) {
    this.router.navigateByUrl('/data-sheet-form?partId=' + partId);
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ListOfCodesService} from "../_services/list-of-codes.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-of-codes',
  templateUrl: './list-of-codes.component.html',
  styleUrls: ['./list-of-codes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListOfCodesComponent implements OnInit {

  codes = [];

  constructor(private router: Router, public translate: TranslateService,
              private listOfCodesService: ListOfCodesService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.getCodes();
  }

  getCodes() {
    this.listOfCodesService.getCodes().subscribe((data) => {
      this.codes = data;
    });
  }

  goToUserPage() {
    this.router.navigateByUrl('/user');
  }

  delete(code: any) {
    this.listOfCodesService.deleteCode(code.qrCode.id).subscribe((date) => {
      this.toastr.success(this.translate.instant('fileDeleted'));
      this.getCodes();
    });
  }

  edit(code: any) {
    this.router.navigate(['/user', {id: code.qrCode.id}]);
  }


}

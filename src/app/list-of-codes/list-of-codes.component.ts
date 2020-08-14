import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ListOfCodesService} from "../_services/list-of-codes.service";
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list-of-codes',
  templateUrl: './list-of-codes.component.html',
  styleUrls: ['./list-of-codes.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class ListOfCodesComponent implements OnInit {

  codes = [];
  displayCode: any;
  closeResult: string;

  constructor(private router: Router, public translate: TranslateService,
              private listOfCodesService: ListOfCodesService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

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

  open(modal: any, code: any) {
    this.displayCode = code;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

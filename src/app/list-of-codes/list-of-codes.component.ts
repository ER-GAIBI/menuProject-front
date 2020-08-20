import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ListOfCodesService} from "../_services/list-of-codes.service";
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../_services/token-storage.service";

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
  currentUser: any;
  enabled = true;

  constructor(private router: Router, public translate: TranslateService,
              private listOfCodesService: ListOfCodesService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.getCodes();
    this.getUser();
  }

  getUser() {
    this.currentUser = this.tokenStorageService.getUser();
    this.enabled = this.currentUser.enabled;
  }

  getCodes() {
    this.listOfCodesService.getCodes().subscribe((data) => {
      this.codes = data;
    });
  }

  best10Days(code: any) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const scannedHours = [];
    const dateFormat = [];
    code.qrCode.viewer.forEach(c => {
      scannedHours.push(c.startDate);
    });
    scannedHours.forEach(scannedHour => {
      const date = new Date(scannedHour);
      const dayName = days[date.getDay()];
      const hour = date.getHours();
      dateFormat.push(dayName + ' '  + hour);
    });

    const occurrences = dateFormat.reduce((obj, item) => {
      obj[item] = (obj[item] || 0) + 1;
      return obj;
    }, {});
    const entries = Object.entries(occurrences);
    // @ts-ignore
    const sorted = entries.sort((a, b) => b[1] - a[1]);

    return sorted;
  }

  averageTime(code: any) {
    let avg = 0;
    code.qrCode.viewer.forEach(c => avg = avg + c.viewingTime);
    if (code.qrCode.scannedTime !== 0) {
      const result = avg / 60;
      const lastResult = result / code.qrCode.scannedTime;
      const str = lastResult.toString();
      const returnedValue = str.substring(0, 6);
      return  parseFloat(returnedValue); // convert it to a number
    }
    return 0;
  }

  lessThan1Min(code: any) {
    let lessThan1MinCounter = 0;
    code.qrCode.viewer.forEach(viewer => {
      if (viewer.viewingTime < 60) {
        lessThan1MinCounter++;
      }
    });
    return lessThan1MinCounter;
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

  download(code: any) {
    const a = document.createElement('a');
    a.href = 'data:image/png;base64,' + code.file;
    a.download = code.qrCode.name;
    a.click();
    a.remove();
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

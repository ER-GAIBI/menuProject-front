import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {BoardAdminService} from '../_services/board-admin.service';
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {ListOfCodesService} from "../_services/list-of-codes.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users: any;
  manage = false;
  codes = [];

  constructor(private boardAdminService: BoardAdminService, public translate: TranslateService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.getAllUsers();
    this.getCodes();
  }

  getCodes() {
    this.boardAdminService.getCodes().subscribe((data) => {
      this.codes = data;
    });
  }

  getAllUsers() {
    this.boardAdminService.getAllUsers().subscribe(data => {
        this.users = data;
        console.log(this.users);
      },
      err => {
        /*this.content = JSON.parse(err.error).message;*/
      }
    );
  }

  lock(user: any) {
    this.boardAdminService.lock(user.id).subscribe(data => {
        this.toastr.success(this.translate.instant('locked'));
        this.getAllUsers();
      },
      err => {
        /*this.content = JSON.parse(err.error).message;*/
      }
    );
  }

  open(user: any) {
    this.boardAdminService.open(user.id).subscribe(data => {
        this.toastr.success(this.translate.instant('opened'));
        this.getAllUsers();
      },
      err => {
        /*this.content = JSON.parse(err.error).message;*/
      }
    );
  }

  manageAccount() {
    this.manage = true;
  }

  main() {
    this.manage = false;
  }

  onOptionsSelected(id: any) {
    if (id === '0') {
      this.getCodes();
    } else {
      this.boardAdminService.getCode(id).subscribe((data) => {
        // @ts-ignore
        this.codes = data;
      });
    }
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
      const result = avg / 60
      return result / code.qrCode.scannedTime;
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
}

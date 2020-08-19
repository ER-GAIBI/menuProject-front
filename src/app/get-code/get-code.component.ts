import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {BoardUserService} from '../_services/board-user.service';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {take} from 'rxjs/operators';
import {timer} from 'rxjs';

/*interface BeforeOnDestroy {
  ngxBeforeOnDestroy();
}

type NgxInstance = BeforeOnDestroy & Object;
type Descriptor = TypedPropertyDescriptor<Function>;
type Key = string | symbol;

function BeforeOnDestroy(target: NgxInstance, key: Key, descriptor: Descriptor) {
  return {
    async value( ... args: any[]) {
      await target.ngxBeforeOnDestroy();
      return descriptor.value.apply(target, args);
    }
  };
}*/


@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.css']
})
export class GetCodeComponent implements OnInit, OnDestroy {

  qrCodeId;
  code: any;
  name: string;
  viewerStartDate: any;
  newViewer: any;
  viewerId: any;




  constructor(private userService: UserService,
              private boardUser: BoardUserService,
              private formBuilder: FormBuilder,
              public translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.qrCodeId = this.route.snapshot.queryParamMap.get('id');
    if (this.qrCodeId) {
      this.getCode();
    }
  }

  cron() {
    let pollCount = 1;
    const poll = () => {
      if (document.hidden) {
        return;
      }
      pollCount++;
      if (pollCount % 5 === 0) {
        const date = moment(this.viewerStartDate);
        const dateStart = moment(this.code.viewer.startDate);
        const now = moment();
        if (now.unix() - date.unix()  < 50 * 60 * 1000) {
          this.boardUser.setViewedTime(this.qrCodeId, pollCount, this.viewerId).subscribe((data) => {
          });
        } else if (now.unix() - dateStart.unix() >= 50 * 60 * 100) {
          this.boardUser.newViewer().subscribe((data) => {
            this.newViewer = data;
            this.viewerStartDate = this.newViewer.startDate;
            this.viewerId = this.newViewer.id;
            pollCount = 0;
          });
        }
      }
    };
    setInterval(poll, 1000);
  }

  getCode() {
    this.boardUser.getCodeForScan(this.qrCodeId).subscribe((data) => {
      this.code = data;
      this.viewerStartDate = this.code.viewer.startDate;
      this.viewerId = this.code.viewer.id;
      this.cron();
    });
  }


  /*public ngxBeforeOnDestroy() {
    console.log('1. BEFORE ONDESTROY INVOKE METHOD (await 2 sec)');
    return new Promise((resolve) => {
      setTimeout(() => this.heavyFunction(resolve), 2000);
    });
  }

  private heavyFunction(resolve) {
    console.log('2. EXECUTE HEAVY FUNCTION (3 sec)');

    const sourcef = timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        resolve();
      });

  }*/



  /*@BeforeOnDestroy*/
  ngOnDestroy() {
  }

}

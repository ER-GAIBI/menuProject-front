import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {BoardUserService} from "../_services/board-user.service";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.css']
})
export class GetCodeComponent implements OnInit {

  qrCodeId;
  code: any;
  name: string;

  constructor(private userService: UserService,
              private boardUser: BoardUserService,
              private formBuilder: FormBuilder,
              public translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.qrCodeId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.qrCodeId);
    if (this.qrCodeId) {
      console.log('test');
      this.getCode();
    }
  }

  getCode() {
    this.boardUser.getCode(this.qrCodeId).subscribe((data) => {
      this.code = data;
      this.name = this.code.qrCode.name;
    });
  }

}

import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from "../_services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  changePassForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private token: TokenStorageService,
              public translate: TranslateService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.currentUser = this.token.getUser();
    this.changePassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required],
    }, {validator: this.passwordConfirming('newPassword', 'confirmNewPassword')});
  }

  get f() { return this.changePassForm.controls; }

  passwordConfirming(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePassForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.chnagePassword(this.changePassForm.value, this.currentUser.id).subscribe(
      data => {
        if (data.message === 'true') {
          this.toastr.info(this.translate.instant('changePassSuccess'));
        } else {
          this.toastr.info(this.translate.instant('changePassFailed'));
        }
        this.loading = false;
      },
    );
    /*this.changePassForm.reset();*/
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  errorMessage = '';
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authService: AuthService,
              private router: Router,
              public translate: TranslateService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService
              ) {}

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      companyName: ['', Validators.required],
      phone: ['', Validators.required],
      commercialRegistrationNo: ['', Validators.required]
    }, {validator: this.passwordConfirming('password', 'confirmPassword')});
  }

  get f() { return this.registerForm.controls; }

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
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
        data => {
          this.router.navigateByUrl('/login');
          //this.toastr.info(this.translate.instant('confirmRegistrationMessage'));
          this.loading = false;
        },
        err => {
          this.toastr.error(this.translate.instant(err.error.message));
          this.loading = false;
        }
      );
    }

  login() {
    this.router.navigateByUrl('/login');
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,
              public translate: TranslateService, private formBuilder: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if (this.roles[0] === 'ROLE_USER') {
          this.router.navigateByUrl('/listOfCodes');
        } else if (this.roles[0] === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/admin');
        }
      },
      err => {
        this.toastr.error(this.translate.instant('contactTheAdministrator'));
        // this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}

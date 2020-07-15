import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, public translate: TranslateService) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
  }

  onSubmit() {
    console.log('test1');
    if (this.form.password !== this.form.confirmPassword) {
      this.errorMessage = 'password are not identical';
    } else {
      console.log('test2');
      console.log(this.form);
      this.authService.register(this.form).subscribe(
        data => {
          console.log('test2');
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigateByUrl("/login");
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }
}

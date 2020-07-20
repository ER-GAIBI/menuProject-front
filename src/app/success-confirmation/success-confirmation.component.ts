import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-success-confirmation',
  templateUrl: './success-confirmation.component.html',
  styleUrls: ['./success-confirmation.component.css']
})
export class SuccessConfirmationComponent implements OnInit {

  token: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.authService.confirmRegister(this.token).subscribe((data) => {
        window.sessionStorage.setItem('language', 'english');
        this.router.navigateByUrl('/login');
      });
    });
  }

}

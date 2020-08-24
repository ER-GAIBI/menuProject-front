import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  showMenu: any;
  logoutBtn: any;
  profileBtn: any;

  constructor(private tokenStorageService: TokenStorageService,
              public translate: TranslateService,
              private router: Router) {
    translate.addLangs(['english', 'عربي']);
    translate.setDefaultLang('english');
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showMenu = event.url.includes('/getCode?id');
        this.logoutBtn = event.url.includes('/register') || event.url.includes('/login');
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    window.sessionStorage.removeItem('language');
    window.sessionStorage.setItem('language', lang);
  }


  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
    /*window.location.reload();*/
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  goToCodes() {
    console.log(this.tokenStorageService.getToken());
    if (this.tokenStorageService.getToken() == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/listOfCodes');
    }
  }
}

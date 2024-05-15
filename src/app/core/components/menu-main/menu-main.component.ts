import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthStateService } from 'src/app/login/services/auth-state.service';
import { TokenService } from 'src/app/login/services/token.service';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss']
})
export class MenuMainComponent implements OnInit {

  constructor(private appService:AppService,
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
) {}

  ngOnInit(): void {
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.appService.removeDataUser();
    this.router.navigateByUrl('/accueil');
  }

}

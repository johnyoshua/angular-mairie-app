import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthStateService } from '../../services/auth-state.service';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  loginForm!: FormGroup;
  errors: any =null;
  isLoading=false;

  constructor(private auth: LoginService,
    private router: Router,
    private formBulder: FormBuilder,
    private token : TokenService,
    private user:AppService,
    private authState: AuthStateService) {
      this.loginForm = this.formBulder.group({
        email:[],
        password:[],
      })
    }
  ngOnInit(): void {
  }

  onLogin() {
    this.isLoading=true;
    this.auth.signin(this.loginForm.value).subscribe(
      (result)=> {
        this.responseHandler(result);
        this.isLoading=false;
      },
      (error)=>{
        this.errors = error.error;
        this.isLoading=false;
      },
      ()=>{
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigateByUrl('/admin/hero-update');
      }
    );

  }

    // Handle response
    responseHandler(data:any) {
      this.token.handleData(data.access_token);
      this.user.handleUser(data.user);
      this.user.handleDroits(data.droits)
    }



}

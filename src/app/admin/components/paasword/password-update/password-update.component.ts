import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { PaaswordService } from 'src/app/admin/services/paasword.service';
import { AppService } from 'src/app/app.service';
import { AuthStateService } from 'src/app/login/services/auth-state.service';
import { TokenService } from 'src/app/login/services/token.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent implements OnInit {

  base_url=`${environment.apiLink}`;
  constructor(private service:PaaswordService,
               private builder : FormBuilder,
               private appService:AppService,
               private auth: AuthStateService,
               public token: TokenService,
               public router: Router,
               private activerouter: ActivatedRoute) { }

  errors:any = [];
  pageTitle="Modifier le mot de passe"
  isLoading=false;
  loading=false;

  user=this.appService.getDataUser();


  ancien_passwordCtrl!: FormControl;
  new_passwordCtrl!:FormControl;
  confirme_passwordCtrl!:FormControl;

  ngOnInit(): void {

  }

    mainForm=this.builder.group({
      ancien_password:this.ancien_passwordCtrl=this.builder.control('',[Validators.required]),
      new_password:this.new_passwordCtrl=this.builder.control('',[Validators.required]),
      confirme_password:this.confirme_passwordCtrl=this.builder.control('',[Validators.required]),
      id:this.user.id,
     })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'Ce champ est requis';
    } else if(ctrl.hasError('email')){
      return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  uploadFiles(): void {
          this.service.updatePassword(this.mainForm.getRawValue()).subscribe(res=>{
              let result:any;
              result=res;
              this.loading = false;
              if(result.message=='pass'){
                this.signOut();
              }else{
                Swal.fire('', ''+result.message+'', 'error');
              }
          },
          (err: any) => {
            this.errors=err.error;
            this.loading=false;
          }
          );
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.appService.removeDataUser();
    this.appService.removeDataUserDroits();
    this.router.navigateByUrl('/login');
  }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaaswordService } from 'src/app/admin/services/paasword.service';
import { AppService } from 'src/app/app.service';
import { AuthStateService } from 'src/app/login/services/auth-state.service';
import { TokenService } from 'src/app/login/services/token.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.scss']
})
export class MenuTopComponent implements OnInit {

  constructor(private appService:AppService,
    private auth: AuthStateService,
    private service:PaaswordService,
    public router: Router,
    public token: TokenService,) { }

    base_url=`${environment.apiLink}`

    droits=this.appService.getDroits();
    user=this.appService.getDataUser();


  ngOnInit(): void {
  }

  confirmBox(){
    Swal.fire({
      title: 'Voulez-vous vraiment vous déconnecter de ce compte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Déconnscter!',
      cancelButtonText: 'Non, Reste connecter'
    }).then((result) => {
      if (result.value) {
        this.signOut();
        this.service.longout(this.user.id).subscribe(res => {
          let resultat:any = res;
     })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          '',
          'Déconnexion annuler avec succès',
          'error'
        )
      }
    })
  }


  signOut() {
    localStorage.clear();
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.appService.removeDataUser();
    this.appService.removeDataUserDroits();
    this.router.navigateByUrl('/login');
  }

}

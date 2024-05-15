import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { PosteService } from '../../services/poste.service';
import { VilleService } from 'src/app/ville/service/ville.service';

@Component({
  selector: 'app-poste-create',
  templateUrl: './poste-create.component.html',
  styleUrls: ['./poste-create.component.scss']
})
export class PosteCreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private serviceVille:VilleService,
              private service:PosteService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un poste";
  idPoste:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  villes:any = [];

  descriptionCtrl!: FormControl;

  ngOnInit(): void {
    this.getVilles();
    this.idPoste=this.activerouter.snapshot.paramMap.get('id');
    if(this.idPoste){
      this.isEdit=true;
      this.pageTitle="Modifier le poste";
      this.service.GetOne(this.idPoste).pipe(
        tap(client=>{
          let data:any=client;
          console.log(data);
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }

  private setValueClient(data:any){
      this.mainForm.setValue({
        description:data.description,
      })
      this.selected=''+data.tva+'';
  }

  mainForm=this.builder.group({
    description:this.descriptionCtrl=this.builder.control('',[Validators.required]),
   })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'La description du poste est obligatoire!';
    } else {
      return 'Ce champ contient une erreur';
    }
}

uploadFiles(): void {
  this.loading=true;
    if(this.isEdit){
      this.service.update(this.idPoste,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/postes/liste');
            Swal.fire({
              title: 'Modification',
              text:   'Modification fait avec succès',
              icon: 'success'
            });
          }else{
            Swal.fire({
              title: 'Erreur',
              text:   'Modification fait avec succès',
              icon: 'error'
            });
          }
        },(err: any) => {
          this.errors=err.error;
          this.loading=false;
        }
        )
      ).subscribe();
    }else{
      if(this.mainForm.valid){
          this.service.saveData(this.mainForm.getRawValue()).subscribe(
              (event: any) => {
                  this.loading=false;
                  this.route.navigateByUrl('/postes/liste');
                  Swal.fire({
                      title: 'Enregistrement',
                      text: 'Fait avec succès',
                      icon: 'success'
                  });
                  this.loading=false;
                },(err: any) => {
                  this.errors=err.error;
                  this.loading=false;
                }
            );

      }else{
        Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
        this.loading=false;
      }
    }
  }

  getVilles(){
    this.serviceVille.getData().subscribe(res=>{
      this.villes = res;
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MontantService } from '../../services/montant.service';

@Component({
  selector: 'app-montant-create',
  templateUrl: './montant-create.component.html',
  styleUrls: ['./montant-create.component.scss']
})
export class MontantCreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:MontantService ,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un montant";
  idMontant:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];

  montantCtrl!: FormControl;

  ngOnInit(): void {
    this.idMontant=this.activerouter.snapshot.paramMap.get('id');
    if(this.idMontant){
      this.isEdit=true;
      this.pageTitle="Modifier le montant";
      this.service.GetOne(this.idMontant).pipe(
        tap(montant=>{
          let data:any=montant;
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }

  private setValueClient(data:any){
      this.mainForm.setValue({
        montant:data.montant,
      })
  }

  mainForm=this.builder.group({
    montant:this.montantCtrl=this.builder.control('',[Validators.required]),
   })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'La description du province est obligatoire!';
    } else {
      return 'Ce champ contient une erreur';
    }
}

uploadFiles(): void {

  this.loading=true;
    if(this.isEdit){
      this.service.update(this.idMontant,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/montants/liste');
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
                  this.route.navigateByUrl('/montants/liste');
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
}

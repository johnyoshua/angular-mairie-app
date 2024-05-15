import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CaisseService } from '../../services/caisse.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:CaisseService ,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajouter la caisse ";
  Caisse_recette_id:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  societes:any[]=[];
  errors:any = [];


  descriptionCtrl!:FormControl;
  soldeCtrl!:FormControl;

  mainForm=this.builder.group({
    description:this.descriptionCtrl=this.builder.control('',[Validators.required]),
    solde:this.soldeCtrl=this.builder.control('',[Validators.required]),
   })


  showSociete$!: Observable<boolean>;

  ngOnInit(): void {
    this.Caisse_recette_id=this.activerouter.snapshot.paramMap.get('id');
    if(this.Caisse_recette_id){
      this.isEdit=true;
      this.pageTitle="Modifier la caisse recette";
      this.service.GetOne(this.Caisse_recette_id).subscribe(
        caisse_recette=>{
          this.setValueCaisseRecette(caisse_recette);
        })
    }
  }

  private setValueCaisseRecette(data:any){
    console.log(data);
      this.mainForm.setValue({
        description:data.description,
        solde:data.Solde,
      })

  }

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

saved(): void {
  this.loading=true;
    if(this.isEdit){
      this.service.update(this.Caisse_recette_id,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          this.loading=false;
            this.route.navigateByUrl('/caisse/list');
            Swal.fire({
              title: 'Modification',
              text:   'Modification fait avec succès',
              icon: 'success'
            });
        },
        (err:any)=>{
          this.loading=false;
          this.errors=err.error;
        }
        )
      ).subscribe();

    }else{
      if(this.mainForm.valid){
          this.service.saveData(this.mainForm.getRawValue()).subscribe(
              (event: any) => {
                  this.loading=false;
                  this.route.navigateByUrl('/caisse/list');
                  Swal.fire({
                      title: 'Enregistrement',
                      text:   'Fait avec succès',
                      icon: 'success'
                  });
                  this.loading=false;
                },
                (err:any)=>{
                  this.loading=false;
                  this.errors=err.error;
                }
          );

      }else{
        Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
        this.loading=false;
      }
    }
  }
}

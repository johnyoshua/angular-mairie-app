import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { TypeContribuableService } from '../../services/type-contribuable.service';

@Component({
  selector: 'app-type-contribuable-create',
  templateUrl: './type-contribuable-create.component.html',
  styleUrls: ['./type-contribuable-create.component.scss']
})
export class TypeContribuableCreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:TypeContribuableService ,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un type de contribuable";
  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];

  descriptionCtrl!: FormControl;

  ngOnInit(): void {
    this.idClient=this.activerouter.snapshot.paramMap.get('id');
    if(this.idClient){
      this.isEdit=true;
      this.pageTitle="Modifier le type contribuable";
      this.service.GetOne(this.idClient).pipe(
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
        return 'La description de type de contribuable est obligatoire!';
    } else {
      return 'Ce champ contient une erreur';
    }
}

uploadFiles(): void {

  this.loading=true;
    if(this.isEdit){
      this.service.update(this.idClient,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/type_contribuable/liste');
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
                  this.route.navigateByUrl('/type_contribuable/liste');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { PosService } from '../../services/pos.service';
import { PosteService } from 'src/app/poste/services/poste.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private servicePoste:PosteService,
              private service:PosService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un PoS";
  idPos:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  postes:any = [];

  descriptionCtrl!: FormControl;
  poste_idCtrl!: FormControl;

  ngOnInit(): void {
    this.getVilles();
    this.idPos=this.activerouter.snapshot.paramMap.get('id');
    if(this.idPos){
      this.isEdit=true;
      this.pageTitle="Modifier le poste";
      this.service.GetOne(this.idPos).pipe(
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
        poste_id:data.poste_id,
        description:data.description,
      })
      this.selected=''+data.tva+'';
  }

  mainForm=this.builder.group({
    poste_id:this.poste_idCtrl=this.builder.control('',[Validators.required]),
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
      this.service.update(this.idPos,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/pos/list');
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
                  this.route.navigateByUrl('/pos/list');
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
    this.servicePoste.getData().subscribe(res=>{
      this.postes = res;
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AgentService } from '../../services/agent.service';
import { PosteService } from 'src/app/poste/services/poste.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private servicePoste:PosteService,
              private service:AgentService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un agent";
  idAgent:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  postes:any = [];

  poste_idCtrl!: FormControl;
  nameCtrl!: FormControl;
  fonctionCtrl!: FormControl;
  matriculeCtrl!: FormControl;
  emailCtrl!: FormControl;
  telephoneCtrl!: FormControl;
 

  ngOnInit(): void {
    this.getPostes();
    this.idAgent=this.activerouter.snapshot.paramMap.get('id');
    if(this.idAgent){
      this.isEdit=true;
      this.pageTitle="Modifier les information de l'agent";
      this.service.GetOne(this.idAgent).pipe(
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
        name:data.name,
        fonction:data.fonction,
        matricule:data.matricule,
        email:data.email,
        telephone:data.telephone,
      })
      this.selected=''+data.tva+'';
  }

  mainForm=this.builder.group({
    poste_id:this.poste_idCtrl=this.builder.control('',[Validators.required]),
    name:this.nameCtrl=this.builder.control('',[Validators.required]),
    fonction:this.fonctionCtrl=this.builder.control('',[Validators.required]),
    matricule:this.matriculeCtrl=this.builder.control('',[Validators.required]),
    email:this.emailCtrl=this.builder.control('',[Validators.required]),
    telephone:this.telephoneCtrl=this.builder.control('',[Validators.required]),
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
      this.service.update(this.idAgent,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/agent/list');
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
                  this.route.navigateByUrl('/agent/list');
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

  getPostes(){
    this.servicePoste.getData().subscribe(res=>{
      this.postes = res;
    })
  }


}


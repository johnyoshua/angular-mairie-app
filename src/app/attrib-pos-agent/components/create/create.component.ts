import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AttriuerService } from '../../services/attriuer.service';
import { AgentService } from 'src/app/agent/services/agent.service';
import { PosService } from 'src/app/pos/services/pos.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:AttriuerService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Attribuer le PoS à l'agent";
  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  agents:any = [];
  pos:any = [];

  agentCtrl!: FormControl;
  pos_idCtrl!: FormControl;


  ngOnInit(): void {
    this.getAgent();
    this.getPosList();
    this.idClient=this.activerouter.snapshot.paramMap.get('id');
    if(this.idClient){
      this.isEdit=true;
      this.isLoading=true;
      this.pageTitle="Modifier l'attribuer du PoS à l'agent";
      this.service.GetOne(this.idClient).pipe(
        tap(client=>{
          let data:any=client;
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }

  private setValueClient(data:any){
      this.mainForm.setValue({
        agent_id:data.agent_id,
        pos_id:data.pos_id
      })
      this.selected=''+data.tva+'';

      this.isLoading=false;
  }

  mainForm=this.builder.group({
    agent_id:this.agentCtrl=this.builder.control('',[Validators.required]),
    pos_id:this.pos_idCtrl=this.builder.control('',[Validators.required]),

   })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'Le champ est obligatoire!';
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
            this.route.navigateByUrl('/agent-pos/list');
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
                  this.route.navigateByUrl('/agent-pos/list');
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

  getAgent(){
    this.service.getListAgent().subscribe(res=>{
      this.agents = res;
    })
  }

  getPosList(){
    this.service.getPos().subscribe(res=>{
      this.pos = res;
    })
  }


}

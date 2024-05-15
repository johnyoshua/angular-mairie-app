import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'provinces', loadChildren:()=>import('./province/province.module').then(m=>m.ProvinceModule)},
  {path:'villes', loadChildren:()=>import('./ville/ville.module').then(m=>m.VilleModule)},
  {path:'postes',loadChildren:()=>import('./poste/poste.module').then(m=>m.PosteModule)},
  {path:'pos', loadChildren:()=>import('./pos/pos.module').then(m=>m.PosModule)},
  {path:'agent',loadChildren:()=>import('./agent/agent.module').then(m=>m.AgentModule)},
  {path:'agent-pos', loadChildren:()=>import('./attrib-pos-agent/attrib-pos-agent.module').then(m=>m.AttribPosAgentModule)},
  {path:'montants', loadChildren:()=>import('./montant/montant.module').then(m=>m.MontantModule)},
  {path:'taxes',loadChildren:()=>import('./taxe/taxe.module').then(m=>m.TaxeModule)},
  {path:'type_contribuable', loadChildren:()=>import('./type-contribuable/type-contribuable.module').then(m=>m.TypeContribuableModule)},
  {path:'contribuables',loadChildren:()=>import('./contribuable/contribuable.module').then(m=>m.ContribuableModule)},
  {path:'paiements', loadChildren:()=>import('./paiement/paiement.module').then(m=>m.PaiementModule)},
  {path:'banques',loadChildren:()=>import('./banque/banque.module').then(m=>m.BanqueModule)},
  {path:'caisse',loadChildren:()=>import('./caisse/caisse.module').then(m=>m.CaisseModule)},
  {path:'caisse-recette', loadChildren:()=>import('./caisse-recette/caisse-recette.module').then(m=>m.CaisseRecetteModule)},
  {path:'transfert', loadChildren:()=>import('./transfert/transfert.module').then(m=>m.TransfertModule)},
  {path:'get-paiement', loadChildren:()=>import('./get-paiement-contribuable/get-paiement-contribuable.module').then(m=>m.GetPaiementContribuableModule)},
  {path: 'login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},
  {path: 'admin', loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path: 'rapport', loadChildren:()=>import('./rapport/rapport.module').then(m=>m.RapportModule)},

  {path: '**', redirectTo: 'admin'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

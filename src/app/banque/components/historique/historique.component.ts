import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BanqueService } from '../../services/banque.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  base_url='http://localhost/elicom/elicombackend/banckend/public/';
  constructor(
              private route:ActivatedRoute, 
              private router: Router, 
              private service:BanqueService
              ) { }

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  displayedColumns: string[] = ['dateOperation','user','motif','credit','debit','solde','actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }


ngOnInit(): void {

  this.loadData();
}
banque_id:any;
banque:any;
  loadData(){
    this.isLoading = true;
    this.banque_id=this.route.snapshot.paramMap.get('id');
    this.service.getDataHistorique(this.banque_id).pipe(
      tap(resultat=>{
        if(resultat){
          this.dataSource.data = resultat['historique'];
          this.banque=resultat['compte'];
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
          });
          this.isLoading = false;
        }
      })
    ).subscribe();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  confirmBox(id:number){
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce client?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, désactivé!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.service.delete(id).subscribe(res => {
          this.service.getData().pipe(
            tap(clients=>{
              if(clients){
                this.dataSource.data = clients;
                setTimeout(() => {
                  this.paginator.pageIndex = this.currentPage;
                });
                this.isLoading = false;
              }
            })
          ).subscribe();
          Swal.fire(
            '',
            'suppresion fait avec succès.',
            'success'
          )
     })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Suppresion annuler avec succès',
          'error'
        )
      }
    })
  }
  Edit(id:any){
    this.router.navigateByUrl('/admin/ihm/clients/update/'+id);
  }



}
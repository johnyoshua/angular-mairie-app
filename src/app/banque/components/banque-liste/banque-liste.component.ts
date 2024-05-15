import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { BanqueService } from '../../services/banque.service';


@Component({
  selector: 'app-banque-liste',
  templateUrl: './banque-liste.component.html',
  styleUrls: ['./banque-liste.component.scss']
})
export class BanqueListeComponent implements OnInit {

  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  base_url='http://localhost/elicom/elicombackend/banckend/public/';
  constructor(private route:ActivatedRoute,
              private router: Router,
              private service:BanqueService) { }

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  displayedColumns: string[] = ['description','compte','solde','retrait','historique','actions'];
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
  loadData(){
    this.isLoading = true;
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
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  confirmBox(id:number){
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce compte bancaire?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.service.delete(id).subscribe(res => {
          this.service.getData().pipe(
            tap(banques=>{
              if(banques){
                this.dataSource.data = banques;
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
    this.router.navigateByUrl('/banques/update/'+id);
  }

  getHistorique(id:any){
    this.router.navigateByUrl('/banques/historique/'+id);
  }

  GetRetraitBanque(id:any){
    this.router.navigateByUrl('/banques/retrait/'+id);
  }




}

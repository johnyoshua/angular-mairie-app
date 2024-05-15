import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ProfilService } from 'src/app/admin/services/profil.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  base_url=`${environment.apiUrl}/`;
  constructor(private route:ActivatedRoute, private router: Router, private service:ProfilService) { }

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  displayedColumns: string[] = ['description','droit','actions'];
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
    this.service.getProfils().pipe(
      tap(magasins=>{
        if(magasins){
          this.dataSource.data = magasins;
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
      title: 'Voulez-vous supprimer ce profil?',
      text: 'Vous ne pourrez pas récupérer ce fichier!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.service.RemoveProfil(id).subscribe(res => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          Swal.fire(
            '',
            'Suppression fait avec succès.',
            'success'
          )
     })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Suppression annuler avec succès',
          'error'
        )
      }
    })
  }
  Edit(id:any){
    this.router.navigateByUrl('/admin/profil/update/'+id);
  }

  Droit(id:any){
    this.router.navigateByUrl('/admin/droits/'+id);
  }


}

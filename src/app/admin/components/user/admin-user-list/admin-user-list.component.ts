import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/app/admin/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  base_url=`${environment.apiLink}`;
  constructor(private route:ActivatedRoute, private router: Router, private service:UserService) { }

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  displayedColumns: string[] = ['image','nom','email','telephone','actions'];
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
    this.service.getUsers().pipe(
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
      title: 'Voulez-vous désactivé cet utilisateur?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, désactivé!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.service.DesactiveUser(id).subscribe(res => {
          this.service.getUsers().pipe(
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
          Swal.fire(
            '',
            'Désactivation fait avec succès.',
            'success'
          )
     })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Désactivation annuler avec succès',
          'error'
        )
      }
    })
  }
  confirmBoxActive(id:number){
    Swal.fire({
      title: 'Voulez-vous activé cet utilisateur?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, activé!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.service.ActiveUser(id).subscribe(res => {
          this.service.getUsers().pipe(
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
          Swal.fire(
            '',
            'Activation fait avec succès.',
            'success'
          )
     })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Activation annuler avec succès',
          'error'
        )
      }
    })
  }
  Edit(id:any){
    this.router.navigateByUrl('/admin/user/update/'+id);
  }



}

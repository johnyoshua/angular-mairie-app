import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterService } from '../../../admin/services/master.service';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  loading$!:Observable<boolean>;
  footerSite$!:Observable<any>;

  constructor(private service:FooterService) { }

  ngOnInit(): void {
    this.initObservable();
    this.service.getFooterSite();
  }

  private initObservable(){
    this.loading$=this.service.loading$;
    this.footerSite$=this.service.footterSite$;
  }

}

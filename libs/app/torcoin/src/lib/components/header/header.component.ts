import { Component, OnInit } from '@angular/core';
import { ActionAuthLogout, StateAuth } from '@atd/core';
import { NbMenuService } from '@nebular/theme';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'atd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(StateAuth.authenticated) authenticated$: Observable<boolean>;

  public userMenu = [ { title: 'Log Out' } ];
  public user = {
    name: 'Elon Musk',
    picture: '//cdn.shopify.com/s/files/1/0345/8429/7516/files/AJ_Pryor.jpg?v=1584330112'
  }

  constructor(
    private nbMenuService: NbMenuService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.nbMenuService.onItemClick().pipe(
       filter((({ item: { title } }) =>
        title === this.userMenu[0].title
       )
      )
    )
      .subscribe(() =>
        this.store.dispatch(new ActionAuthLogout())
      );
  }
}

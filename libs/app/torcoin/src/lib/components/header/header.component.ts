import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../models';
import { StateUser } from '../../state';
import { ActionAuthLogout, StateAuth } from '../../state/auth';

@Component({
  selector: 'atd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(StateAuth.authenticated) authenticated$: Observable<boolean>;
  @Select(StateUser.picture) picture$: string;
  @Select(StateUser.fullName) fullName$: string;

  public userMenu = [ { title: 'Log Out' } ];

  constructor(
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
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

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}

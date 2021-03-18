import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Store } from '@ngxs/store';
import { ActionUserRegister } from '../../state';

@Component({
  selector: 'atd-auth-register',
  templateUrl: '../../../../../../../node_modules/@nebular/auth/components/register/register.component.html',
  styleUrls: ['../../../../../../../node_modules/@nebular/auth/components/register/register.component.scss']
})
export class AuthRegisterComponent extends NbRegisterComponent {

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private store: Store
  ) {
    super(service, options, cd, router);
}

  public register(): void {
    super.register();

    this.store.dispatch(new ActionUserRegister(this.user));
  }
}

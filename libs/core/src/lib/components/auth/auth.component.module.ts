import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { NbCardModule, NbLayoutModule} from '@nebular/theme';
import { NbAuthModule, NbLoginComponent, NbRegisterComponent } from '@nebular/auth';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: NbLoginComponent
      },
      {
        path: 'register',
        component: NbRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    NbLayoutModule,
    NbCardModule,
    NbAuthModule
  ],
  declarations: [AuthComponent],
  exports: []
})
export class AuthComponentModule {}

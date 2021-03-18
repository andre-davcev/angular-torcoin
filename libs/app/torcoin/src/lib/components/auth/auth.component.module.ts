import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import { NbAuthModule, NbLoginComponent } from '@nebular/auth';
import { AuthComponent } from './auth.component';
import { AuthRegisterComponent } from './auth-register.component';
import { FormsModule } from '@angular/forms';

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
        component: AuthRegisterComponent
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
    NbAuthModule,

    FormsModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule
  ],
  declarations: [AuthComponent, AuthRegisterComponent],
  exports: []
})
export class AuthComponentModule {}

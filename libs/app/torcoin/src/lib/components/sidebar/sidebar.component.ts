import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'atd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: NbMenuItem[] = [
    {
      title: 'DASHBOARD',
      group: true,
    },
    {
      title: 'Crypto',
      icon: 'pie-chart-outline',
      expanded: true,
      children: [
        {
          title: 'Prices',
          link: '/pages/charts/echarts',
          selected: true
        }
      ],
    },
    {
      title: 'Auth',
      icon: 'lock-outline',
      children: [
        {
          title: 'Login',
          link: '/auth/login',
        },
        {
          title: 'Register',
          link: '/auth/register',
        },
        {
          title: 'Request Password',
          link: '/auth/request-password',
        },
        {
          title: 'Reset Password',
          link: '/auth/reset-password',
        },
      ],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

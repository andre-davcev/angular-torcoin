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
      title: 'Home',
      icon: 'home-outline',
      link: '/home',
    },
    {
      title: 'Prices',
      icon: 'pie-chart-outline',
      link: '/prices',
      selected: true
    },
    {
      title: 'Logout',
      icon: 'lock-outline'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

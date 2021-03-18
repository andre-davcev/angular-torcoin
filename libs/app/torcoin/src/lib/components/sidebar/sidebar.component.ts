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
      selected: true
    },
    {
      title: 'Prices',
      icon: 'pie-chart-outline',
      link: '/prices'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

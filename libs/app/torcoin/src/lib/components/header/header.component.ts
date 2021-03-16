import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'atd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userMenu = [ { title: 'Log out' } ];
  public user = {
    name: 'Elon Musk',
    picture: '//cdn.shopify.com/s/files/1/0345/8429/7516/files/AJ_Pryor.jpg?v=1584330112'
  }
  constructor() { }

  ngOnInit(): void {
  }

}

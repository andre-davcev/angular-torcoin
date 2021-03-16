import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'atd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userMenu = [ { title: 'Log out' } ];
  public user = {
    name: 'Elon Musk',
    picture: 'assets/images/elon-musk.jpeg'
  }
  constructor() { }

  ngOnInit(): void {
  }

}

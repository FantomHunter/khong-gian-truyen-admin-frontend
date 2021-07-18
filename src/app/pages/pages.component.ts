import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  title = 'angular-material-admin-demo';
  navigationList = [
    {
      text: 'Dashboard',
      routerLink: '/',
    },
    {
      text: 'Product',
      routerLink: '/product',
    },
    {
      text: 'Category',
      routerLink: '/category',
    },
    {
      text: 'User',
      routerLink: '/user',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

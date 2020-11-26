import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public books = [];
  public book = '';
  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.dataApi.getAllBooks().subscribe(books => {
      console.log('BOOKS', books);
    });
  }

}

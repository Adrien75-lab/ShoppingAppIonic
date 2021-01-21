import { Component } from '@angular/core';
import { environnement} from 'src/models/environnements';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/models/article-interface';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  articles : Article[];
  
  constructor(private http: HttpClient){
    this.loadData()
    
    .subscribe((data:Article[]) => {
      console.log('articles', data);
      this.articles = data;

    })
    

  }
  loadData() : Observable<Article[]> {
    let url: string = `${environnement.api_url}/NewArticles`;
    return this.http.get<Article[]>(url);
   
  }
  doRefresh($event) {
this.loadData()

.subscribe((data:Article[]) => {
  console.log('articles à partir de doRefresh', data);
  this.articles = data ;
  $event.target.complete();

})
  }

}
    
  

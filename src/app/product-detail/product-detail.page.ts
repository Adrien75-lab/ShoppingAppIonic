import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/models/article-interface';
import { environnement } from 'src/models/environnements';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  article : Article;
  rate : any;
  slidesOp={
    speed: 1000,
    autoplay: {
      delay:500
    }

  }
  

  constructor(private activatedRoute: ActivatedRoute, 
    private http:HttpClient, 
    private photoViewer : PhotoViewer,
    private toastCtrl: ToastController,
    
    ) { }

  ngOnInit() {
    // on récupère le paramètre 'id' qui est l'id de l'article à afficher
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',id);
    // on lance la requette pour récuperer l'article correspondant à cette 'id'
    this.loadData(id)
    .subscribe(data =>{
      // on stocke cette article dans la propriété 'article'
      this.article = data;
    })
  }
  onModelChange($event){
    console.log('event',$event);
    
  }
  // Voici la methode pour charger l'article
  loadData(id:string) : Observable<Article> {
    let url: string = `${environnement.api_url}/NewArticles/${id}`;
    return this.http.get<Article>(url);
   
  }
  showImage(imgId: string, imgTitle:string){
    event.stopPropagation();
    this.photoViewer.show(`http://localhost:3000/api/Containers/photos/download/${imgId}`, 
    imgTitle, {share: true});

  }
  // Voici la methode pour laisser une note à un article
  leaveNote() : void {
    console.log('rate', this.rate);
    // on stocke la moyenne dans 'average'
    let average: number = (this.article.averageStar + this.rate)/2;
    // on arrondi 'average' et on stocke le résultat dans 'aroundi'
    let aroundi : number = Math.ceil(average);
    let utilisateurId: string = this.article.utilisateurId;
    let articleId: string = this.article.id;
    let url: string = `${environnement.api_url}/Utilisateurs/${utilisateurId}/articles/${articleId}`;
    console.log('url', url);
    this.http.put(url,{"averageStar":aroundi})
    .subscribe(res => {
      this.presentToast('Votre note est validé !', 2000);
    })


  }
  //  on affiche un message toast grace à cette methode
  async presentToast(message: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}

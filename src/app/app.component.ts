import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";


declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myTag: any | undefined;
  myPhoto: any | undefined;
  myPhotosBk: any;
  closeResult: any;
  editData: any;


  constructor(private AppService: AppService, private modalService: NgbModal, private httpClient: HttpClient) {
  }


  ngOnInit(): void {
    this.AppService.getTag().subscribe((data) => {
      this.myTag = data;
    })
    this.AppService.getPhoto().subscribe((data) => {
      this.myPhoto = data;
      this.myPhotosBk = data;
    })

  }

  onChooseATag(val: any) {
    if (val.currentTarget.value == 0) {
      this.myPhoto = this.myPhotosBk
    } else {
      this.myPhoto = this.myPhotosBk
      let filteredPhoto = this.myPhoto.filter((p: any) =>
        p.tag == val.currentTarget.value
      )
      this.myPhoto = filteredPhoto
    }


  }

  open(content: any) {
    this.modalService.open(content)
  }


  onSubmit(data: any) {
    // let verifyType = data.url.split('.');

    // if(verifyType[1] === 'jpg' || verifyType[1] ==='png'){
    this.httpClient.post('http://localhost:3005/photo', data).subscribe((res) => {
      console.log(res);
    })

    this.httpClient.post('http://localhost:3005/tag', {title: data.tag}).subscribe((res) => {
      console.log(res);
    })
    // }else{
    //   throw Error("Type not accepted!")
    // }

    // })

  }

  delete(data: any) {
    this.httpClient.delete(`http://localhost:3005/photo/${data.currentTarget.id}`).subscribe((res) => {
      console.log(res)
    })

  }

  async edit(data: any) {
    this.modalService.open(data)
    // await this.httpClient.get(`http://localhost:3005/photo/${data.currentTarget.id}`).subscribe((res) => {
    //   this.editData = res;
    // })
    //to be continued
  }
}

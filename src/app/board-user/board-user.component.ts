import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {BoardUserService} from '../_services/board-user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';
  private filesToUpload = [];

  constructor(private userService: UserService,
              private boardUser: BoardUserService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  handleFileInput(file: FileList) {
    // this.fileToUpload = file.item(0);
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      this.filesToUpload.push(file.item(i));
    }
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.boardUser.postFile(this.filesToUpload[i]).subscribe(data => {
        // do something, if upload success
      }, error => {
        console.log(error);
      });
      if (i === this.filesToUpload.length - 1) {
        this.filesToUpload = [];
      }
    }
  }


}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../_services/user.service';
import {BoardUserService} from '../_services/board-user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class BoardUserComponent implements OnInit {
  content = '';
  private filesToUpload = [];
  uploadForm: FormGroup;
  submitted = false;
  isUploaded = false;
  filesName = [];
  qrCodeEdit: string;
  code: any;
  name: string;

  constructor(private userService: UserService,
              private boardUser: BoardUserService,
              private formBuilder: FormBuilder,
              public translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.translate.use(sessionStorage.getItem('language'));
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadFile: [''],
    });
    this.qrCodeEdit = this.route.snapshot.paramMap.get('id');
    if (this.qrCodeEdit) {
      this.getCode();
    }
  }

  reloadPage() {
    window.location.reload();
  }

  handleFileInput(file: FileList) {
    for (let i = 0; i < file.length; i++) {
      this.filesToUpload.push(file.item(i));
    }
    if (this.filesToUpload.length > 0) {
      this.isUploaded = true;
      this.filesName = this.filesToUpload.map(f => f.name);
    }
  }

  uploadFileToActivity() {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.boardUser.postFile(this.filesToUpload[i], this.uploadForm.value.name).subscribe(data => {
          this.toastr.success(this.translate.instant('added'));
          this.router.navigateByUrl('/listOfCodes');
      }, error => {
        console.log(error);
      });
      if (i === this.filesToUpload.length - 1) {
        this.filesToUpload = [];
      }
    }
  }

  editQrCode(id: string) {
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.boardUser.editFile(this.filesToUpload[i], this.uploadForm.value.name, id).subscribe(data => {
        this.toastr.success(this.translate.instant('edited'));
        this.router.navigateByUrl('/listOfCodes');
      }, error => {
        console.log(error);
      });
      if (i === this.filesToUpload.length - 1) {
        this.filesToUpload = [];
      }
    }
  }

  getCode() {
    this.boardUser.getCode(this.qrCodeEdit).subscribe((data) => {
      this.code = data;
      this.name = this.code.qrCode.name;
    });
  }

  onSubmit() {
    if (this.isUploaded) {
      this.submitted = true;
      if (this.uploadForm.invalid) {
        return;
      }
      if (this.qrCodeEdit) {
        this.editQrCode(this.qrCodeEdit);
      } else {
        this.uploadFileToActivity();
      }
    } else {
      this.toastr.warning(this.translate.instant('uploadFile'));
    }

  }

  get f() { return this.uploadForm.controls; }


}

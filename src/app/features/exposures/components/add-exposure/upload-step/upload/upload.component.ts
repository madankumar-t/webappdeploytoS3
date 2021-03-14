import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreConfigService } from '@app/core/services/config.service';
import { ExposureService } from '@app/features/exposures/services/exposure.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  fileUpload: any;
  uploadStatus: string = 'none';
  progress: number = 0;
  percentage: string = 'Step 1/3 Uploading…';
  fileName: any;
  message: string = '';
  errorMsg: string = '';
  currentFile?: File;
  workspaceId: string = '';
  s3keys: string = '';
  userId: number = 0;
  fileTypeIssue = false;

  constructor(
    private exposureService: ExposureService,
    private _coreService: CoreConfigService
  ) {}

  ngOnInit(): void {
    this.userId = this._coreService.getUserId();
    this._coreService.currentWorkspace.subscribe((id: any) => {
      this.workspaceId = id;
    });
    this.checkUserLimit();
  }

  fileSelected(event: any, fileUpload: any) {
    const [first] = fileUpload.msgs;
    if (first && first.severity == 'error') {
      this.fileTypeIssue = true;
      this.errorMsg =
        'Wrong file type. We only support xlsx, xls, csv and etf files. Please verify your file.';
      this.uploadStatus = 'failed';
    } else {
      this.fileTypeIssue = false;
      this.uploadStatus = 'file-selected';
      if (event.files && event.files.length > 0) {
        this.fileName = this.exposureService.getOnlyFileName(
          event.files[0].name
        );
      }
    }
  }

  hasFiles() {
    return true;
  }

  upload(event: any, form: any) {
    this.fileUpload = form;
    let file = { ...event };
    if (file && file.files.length > 0) {
      let [first] = file.files;
      const oldName = first.name;
      const fileExtension = oldName.slice(
        oldName.lastIndexOf('.') - oldName.length
      );
      const str = this.fileName
        .slice(0, oldName.lastIndexOf('.'))
        .replace(/[^\w]/gi, '');
      Object.defineProperty(first, 'importSetName', {
        writable: true,
        value: str,
      });
      Object.defineProperty(first, 'originalFileName', {
        writable: true,
        value: str + fileExtension,
      });
      Object.defineProperty(first, 'isPortfolio', {
        writable: true,
        value: false,
      });
      this.uploadStatus = 'upload';
      this.message = this.fileName;
      this.currentFile = first;
      this.uploadFile(first);
    }
  }

  uploadFile(file: any) {
    let fileName = file.originalFileName;
    this.exposureService.getSigInedUrl(fileName).subscribe((data: any) => {
      if (!!data) {
        this.s3keys = data.S3_Key;
        this.exposureService
          .uploadFileS3(data.uploadURL, file)
          .subscribe((status: any) => {
            this.progress = 33.4;
            this.uploadStatus = 'upload';
            this.message = 'Hold on! it takes a while sometimes…';
            this.percentage = 'Step 2/3 Uploading..';
            setTimeout(() => {
              this.registerFile();
            }, 3000);
          });
      }
    });
  }
  checkUserLimit() {
    this.exposureService
      .checkExposureLimit(this.userId)
      .subscribe((data: any) => {
        if (data.limit_reached) {
          this.errorMsg = 'Exposure limit reached';
          this.uploadStatus = 'limit_exceeded';
        }
      });
  }
  registerFile() {
    const s3Key = this.s3keys;
    if (s3Key) {
      this.exposureService
        .registerExposure(s3Key, this.workspaceId, this.userId, this.fileName)
        .subscribe((data: any) => {
          if (data.Error) {
            this.errorMsg = data.Error;
            this.uploadStatus = 'failed';
          } else {
            this.progress = 99.99;
            this.message = 'Hold on! it takes a while sometimes…';
            this.percentage = 'Step 3/3 Uploding...';
            setTimeout(() => {
              this.uploadStatus = 'upload-sucess';
              this.exposureService.setImportStatus(this.uploadStatus);
            }, 3000);
          }
        });
    }
  }

  clearFile() {
    this.uploadStatus = 'none';
    this.fileUpload.clear();
    this.progress = 0;
    this.percentage = 'Step 0/3 Uploading…';
  }

  tryAgain() {
    this.progress = 0;
    this.percentage = 'Step 0/3 Uploading…';
    this.uploadStatus = 'upload';
    this.uploadFile(this.currentFile);
  }

  changeFileName(fileName: string) {
    this.fileName = fileName;
  }
}

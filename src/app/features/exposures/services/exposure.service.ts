import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { APIRequestUrls } from 'app/shared/api';
import { Pagination } from '@app/shared/models/shared.models';
import { CommonService } from '@app/shared/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class ExposureService {
  constructor(private http: HttpClient, private commonService: CommonService) {}
  importStatus: string = 'none';

  private importStatusSource = new BehaviorSubject<string>(this.importStatus);

  currentImportStatus = this.importStatusSource.asObservable();

  setImportStatus(status: string) {
    localStorage.setItem('importStatus', status);
    this.importStatusSource.next(status);
  }
  getOnlyFileName(fileName: string) {
    return fileName.slice(0, fileName.lastIndexOf('.')).replace(/[^\w]/gi, '');
  }

  checkExposureLimit(userId: number) {
    return new Observable((observer) => {
      let checkExpLmtRequest: any = {
        action: APIRequestUrls.checkexposurelimit + userId,
        success: (response: any) => {
          observer.next(response);
        },
        error: (error: any) => {
          observer.next(error);
        },
      };
      return this.commonService.getRequest(checkExpLmtRequest);
    });
  }

  getSigInedUrl(fileName: String) {
    return new Observable((observer) => {
      let sigInedUrlRequest: any = {
        action: APIRequestUrls.importFileFileSiginedS3Url,
        params: { fileName: fileName },
        success: (response: any) => {
          observer.next(response);
        },
        error: (error: any) => {
          observer.next(error);
        },
      };
      return this.commonService.postRequest(sigInedUrlRequest);
    });
  }

  uploadFileS3(url: string, file: File) {
    // let formData = new FormData();
    // formData.append('file', file, file.name);
    return new Observable((observer) => {
      let uploadFileS3Request: any = {
        action: url,
        params: file,
        success: (response: any) => {
          observer.next(response);
        },
        error: (error: any) => {
          observer.next(error);
        },
      };
      return this.commonService.putRequest(uploadFileS3Request);
    });
  }

  registerExposure(
    s3Key: string,
    workspaceId: string,
    userId: number,
    importsetname: string
  ) {
    let fileNames = s3Key.toString().split('/');
    if (fileNames && fileNames.length > 0) {
      const filepath = fileNames[0];
      const filename = fileNames[1];
      const fileExtension = filename.slice(
        filename.lastIndexOf('.') - filename.length
      );
      let stage = 1,
        processTypeId = 10;
      if (
        fileExtension.toLowerCase() == 'etf' ||
        fileExtension.toLowerCase() == 'eetf'
      ) {
        stage = 2;
        processTypeId = 8;
      }
      let input = {
        S3Bucket: 'nonprod-f-er',
        S3Key: s3Key,
        sessionId: null,
        originalFileName: '',
        filename: filename,
        filepath: filepath,
        importsetname: importsetname,
        stage: stage,
        userId: userId,
        processTypeId: processTypeId,
        parameter: null,
        augmentParams: null,
        coverageHierarchyCheck: 'N',
        validationFileId: null,
        accountId: workspaceId,
        parentProcessId: null,
      };
      return new Observable((observer) => {
        let registerRequest: any = {
          action: APIRequestUrls.registerexposureupload,
          params: input,
          success: (response: any) => {
            observer.next(response);
          },
          error: (error: any) => {
            observer.next(error);
          },
        };
        return this.commonService.postRequest(registerRequest);
      });
    } else {
      return new Observable((observer) => {
        return observer.next(null);
      });
    }
  }

  getExposureItem(pagination: Pagination, parms: any) {
    return new Observable((observer) => {
      return this.http
        .get(
          APIRequestUrls.workspaceObjects +
            parms.userId +
            '/' +
            parms.workspaceId +
            '/' +
            parms.activeTab +
            '?from=' +
            pagination.from +
            '&&size=' +
            pagination.size +
            '&&sort_by=' +
            parms.sortBy.code +
            '&&active_tab=' +
            parms.activeTab +
            '&&q=' +
            parms.query
        )
        .subscribe((workspaces: any) => {
          observer.next(workspaces);
        });
    });
  }
}

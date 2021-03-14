import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import {
  RecentActivities,
  RecentEvent,
  WorkSpaces,
} from '../models/home.model';
import {
  APIRequestUrls,
  MapPointers,
  TriggerdAlertImagesPath,
} from 'app/shared/api';
import { DatePipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { DraggableOverlay } from '@app/shared/services/draggable.overlay';
// import { MercatorProjection } from '@app/shared/services/mercator.projection';
declare var google: any;
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  lastActivityDate: any;
  isSingleAlertPage: boolean = false;

  /*** this is for alert  */
  triggeredAlertList: Array<any> = [];
  totalTrgAlrts: Array<any> = [];
  activeButton: any;
  selectedButton: any;
  alerts: Array<any> = [];
  totalAssets: Array<any> = [];
  assetsForPage = {};
  count: number = 1;
  currentPageNum: number = 1;
  userInput: string = '';
  reloadData: any;
  catalogHandDrawnShapeFeatures = {
    strokeWeight: 0,
    draggable: false,
  };
  tileHeight = 256;
  tileWidth = 256;
  wmsStandardParams = {
    REQUEST: 'GetMap',
    SERVICE: 'WMS',
    VERSION: '1.3.0',
    BGCOLOR: '0x000000',
    TRANSPARENT: 'TRUE',
    WIDTH: this.tileWidth,
    HEIGHT: this.tileHeight,
  };
  requestedAccountId: any;
  allAlertsLength: number | undefined;
  alertRecord: any;
  /*** this is for alert  */
  private alertsdata = new Subject<any>();
  private totalAssetsData = new Subject<any>();
  private activeButtonState = new Subject<any>();
  private userInputData = new Subject<any>();
  private ToAndFromDate = new Subject<any>();
  private filterCmpInput = new Subject<any>();
  private scrollTheSelectedWs = new Subject<any>();

  /**************************today changes */
  private selectedAlertOnHomePage = new Subject<any>();
  filteredObject: any;
  checkFltrCmpVal: any;
  clearAllOtherFilters: boolean = false;
  selectedObjectId?: number;
  selectedObjectType?: string;
  scrollSelectedObject?: boolean;
  maximizeTheMapToFullScreen: boolean = false;
  isDefaultAlerts: boolean = false;
  private tabIndex = new Subject<any>();
  private homePageAlerts = new Subject<any>();

  accountId?: number;
  //total alerts
  filterObj: any;
  accountIdAndExp = {};
  currentPage: number = 1;
  pageSize: number = 25;
  activeButtonForAlerts: any;
  userInputForAlerts: string = '';
  regetCount: boolean = false;
  currentUrl: any;
  previousUrl: any;
  singleAlertPageRefreshed: boolean = true;
  isFromHomePage: boolean = false;
  url?: string;
  // variable is used to display a statement in homepage
  alertCallStatus: number = 1;
  filterCount: number = 0;
  /****************************Today changes end */
  constructor(private http: HttpClient) {}

  getTriggeredAlertsData(userID: number, workspaceId: string) {
    return new Observable((observer) => {
      return this.http
        .get(APIRequestUrls.getRecentAlert + userID + '/' + workspaceId)
        .subscribe((alertData: any) => {
          this.alertRecord = alertData;
          this.allAlertsLength = alertData.length;
          this.processTriggeredAlertData(alertData);
          observer.next(alertData);
        });
    });
  }
  processTriggeredAlertData(
    data: Array<any> = [],
    index = 0,
    ele = { account_id: 0 }
  ) {
    data.forEach((alertInfo: any = {}, i: number) => {
      alertInfo['alert_json'] = alertInfo['alert_json'] || {};
      let alert: any = {
        specificObject: {
          iconUrl: 'erassets/Images/WorkSpace_Images/icon_exposure.svg',
        },
        counts: [],
        assets: [],
      };
      alert['id'] = alertInfo.id;
      alert['perilName'] = alertInfo.peril_name;
      alert['perilId'] = alertInfo.peril_id;
      alert['schedule_id'] = alertInfo.schedule_id;
      alert['exp_type'] = alertInfo.exp_type;
      alert['isForecasted'] = alertInfo.is_fore_casted;
      alert['isObserved'] = alertInfo.is_observed;
      alert['eventDesciption'] = alertInfo.event_description;
      alert['sub_peril'] = alertInfo.sub_peril;
      alert['mapS3Url'] = alertInfo.map_s3_url;
      let datePipe = new DatePipe('en-US');
      let startDate = datePipe.transform(
        alertInfo.event_start_at,
        'MMM-dd-yyyy HH:MM:SS'
      );
      alert['startDate'] = startDate;
      let endDate = datePipe.transform(
        alertInfo.event_end_at,
        'MMM-dd-yyyy HH:MM:SS'
      );
      alert['endDate'] = endDate;
      let issueDate = new Date(alertInfo.alert_time);
      alert['issuedDate'] = datePipe.transform(
        alertInfo.alert_time,
        'MMM-dd-yyyy'
      );
      let hours =
        issueDate.getHours() < 10
          ? '0' + issueDate.getHours()
          : issueDate.getHours();
      let minutes =
        issueDate.getMinutes() < 10
          ? '0' + issueDate.getMinutes()
          : issueDate.getMinutes();
      let seconds =
        issueDate.getSeconds() < 10
          ? '0' + issueDate.getSeconds()
          : issueDate.getSeconds();
      alert['issuedDate'] =
        alert['issuedDate'] + ' ' + hours + ':' + minutes + ':' + seconds;
      alert['alertTime'] = alertInfo.alert_time;
      alert['eventType'] = alertInfo.event_type;
      alert['intensity_unit'] = alertInfo.intensity_unit;
      alert['intensity_defintion'] = alertInfo.intensity_defintion;
      alert['show_gu_loss'] = alertInfo.show_gu_loss;
      alert['event_set_id'] = alertInfo.event_set_id;
      alert['event_id'] = alertInfo.event_id;
      alert['sev_model_id'] = alertInfo.sev_model_id;
      alert['accountId'] =
        alertInfo.account_id >= 0 ? alertInfo.account_id : ele.account_id;
      this.isSingleAlertPage
        ? (this.alerts[index] = alert)
        : this.alerts.push(alert);
      this.prepareAssetData(
        alertInfo,
        this.isSingleAlertPage ? index : i,
        alertInfo.exposure_name
      );
      this.count++;
    });
  }
  prepareAssetData(object: any = {}, index: number, exposureName: any) {
    this.alerts[index] = this.alerts[index] || {};

    object.alert_json = object.alert_json || {};
    if (object.alert_json['topCounties']) {
      this.alerts[index]['county'] = [];
      object.alert_json['topCounties'].forEach((county: any) => {
        this.alerts[index]['county'].push(county);
      });
    }
    this.alerts[index]['title'] = object.alert_json['Event Name']
      ? object.alert_json['Event Name']
      : '';
    this.alerts[index]['evenSetName'] = object.alert_json['Event Set Name'];
    this.alerts[index]['expName'] = exposureName;
    this.alerts[index]['source'] = object.alert_json['Source'];
    this.alerts[index].specificObject['name'] = exposureName;
    this.alerts[index].specificObject['schedule_id'] = this.alerts[index][
      'schedule_id'
    ];
    this.alerts[index].specificObject['exp_Type'] = this.alerts[index][
      'exp_type'
    ];
    //for getting the time stamp to pass in exposure analytics url
    let listOfExp: any[] = [];
    let reqiredExposureData = listOfExp.filter(
      (item: { id: any }) => item.id == this.alerts[index]['schedule_id']
    );
    // if (reqiredExposureData[0]) {
    //     // reqiredExposureData[0].iconUrl = this.mawsService.getIconUrl(this.url, reqiredExposureData[0]);
    // }
    reqiredExposureData = reqiredExposureData || [];
    reqiredExposureData[0] = reqiredExposureData[0] || {};
    this.alerts[index].specificObject['nameWithDate'] =
      reqiredExposureData[0].nameWithDate;
    this.alerts[index].specificObject['completeExposure'] =
      reqiredExposureData[0];
    this.alerts[index].specificObject['iconUrl'] =
      reqiredExposureData[0].iconUrl;
    this.alerts[index].specificObject['account_name'] =
      reqiredExposureData[0].account_name;
    let analysisDate = object.alert_json['Analysis Date'];
    let analysisDateArray = analysisDate.split(' ');
    let formattedAnalysisDate =
      analysisDateArray[3] +
      ' ' +
      analysisDateArray[5] +
      ' ' +
      analysisDateArray[2] +
      '-' +
      analysisDateArray[1] +
      '-' +
      analysisDateArray[4] +
      ' ' +
      analysisDateArray[0];
    this.alerts[index]['date'] = formattedAnalysisDate;
    this.alerts[index].counts.push({
      title: '# Assets',
      count: object.alert_json['Num Assets'] || 0,
      formattedCount: 0,
    });
    let tiv: any = object.alert_json['TIV']
      ? Math.floor(Number(object.alert_json['TIV']) * 100) / 100
      : 0;
    let formattedTIV: any = object.alert_json['Formatted TIV']
      ? object.alert_json['Formatted TIV']
      : 0;
    // formattedTIV = this.removeCurrencyFromValues(formattedTIV);
    this.alerts[index].counts.push({
      title: 'TIV',
      count: tiv,
      formattedCount: formattedTIV,
    }); //TIV Value
    let elossSplit: any = new String(object.alert_json['GU Loss']);
    let eloss: any = 0;
    if (elossSplit.includes(' ')) {
      elossSplit = elossSplit ? elossSplit.split(' ') : [];
      eloss =
        elossSplit.length > 0
          ? Math.floor(Number(elossSplit[0] * 100)) / 100
          : 0;
      eloss = elossSplit[1] ? eloss + ' ' + elossSplit[1] : eloss;
    }
    let formattedGULoss: any = object.alert_json['Formatted GU Loss'];
    formattedGULoss = this.removeCurrencyFromValues(formattedGULoss);
    let formattedGrossExposedLimit: any =
      object.alert_json['grossExposedLimit'];
    formattedGrossExposedLimit = this.removeCurrencyFromValues(
      formattedGrossExposedLimit
    );
    let formatedGrossLoss: any = object.alert_json['grossLoss'];
    formatedGrossLoss = this.removeCurrencyFromValues(formatedGrossLoss);
    this.alerts[index].counts.push({
      title: 'Ground Up Loss**',
      count: eloss,
      formattedCount: formattedGULoss,
      show_est_loss: this.alerts[index].show_gu_loss,
    });
    this.alerts[index].counts.push({
      title: '# Contracts',
      count: object.alert_json['#contracts'] || '',
      formattedCount: object.alert_json['#contracts'],
    }); //contract Value
    this.alerts[index].counts.push({
      title: 'Exposed Limit',
      count: object.alert_json['grossExposedLimit'] || '',
      formattedCount: formattedGrossExposedLimit,
    }); //grossExposedLimit
    this.alerts[index].counts.push({
      title: 'Gross Loss**',
      count: object.alert_json['grossLoss'] || '',
      formattedCount: formatedGrossLoss,
    }); //gross loss
    this.alerts[index].counts.push({
      title: 'Currency',
      count: object.alert_json['Currency'] || '',
      formattedCount: object.alert_json['Currency'],
    }); //currency
    let keys: any = Object.keys(object.alert_json);
    keys = keys.filter((o: any) => o.toLowerCase().includes('top'));
    object.alert_json[keys[0]] = object.alert_json[keys[0]] || [];
    this.alerts[index].assets = [];
    let currentPageAssets: any[] = [];
    object.alert_json[keys[0]].forEach((itm: any) => {
      let asset: any = {};
      asset.schedule_id =
        this.alerts[index]['exp_type'] == 'A'
          ? this.alerts[index]['schedule_id']
          : itm.schedule_id;
      asset.expType = this.alerts[index]['exp_type'];
      asset.isPortfolio = this.alerts[index]['exp_type'] == 'P' ? true : false;
      let latLon: any = itm.LatLon;
      latLon = latLon.split(',') || [];
      asset.lat = Number(latLon[0] || 0);
      asset.lon = Number(latLon[1] || 0);
      let tiv = 0;
      let formattedTIV: any = itm['Formatted TIV'] ? itm['Formatted TIV'] : '';
      if (!formattedTIV || formattedTIV.length == 0) {
        formattedTIV = itm['TIV'] ? itm['TIV'] : '';
      }
      asset.tiv = { title: 'TIV', count: tiv, formattedCount: formattedTIV };
      let elossSplit: any = new String(itm['GU Loss']);
      let eloss: any = 0;
      if (elossSplit.includes(' ')) {
        elossSplit = elossSplit ? elossSplit.split(' ') : [];
        eloss =
          elossSplit.length > 0
            ? Math.floor(Number(elossSplit[0] * 100)) / 100
            : 0;
        eloss = elossSplit[1] ? eloss + ' ' + elossSplit[1] : eloss;
      }
      let formattedGULoss: any = itm['GU Loss'];
      asset.asset = {
        title: 'Asset Number',
        count: itm['Asset Number'] || 0,
        formattedCount: itm['Asset Number'] || 0,
      };
      asset.estimated_loss = {
        title: 'Ground Up Loss',
        count: eloss,
        formattedCount: formattedGULoss,
      };
      asset.contract = {
        title: '# Contracts',
        count: itm['contractName'] || '',
        formattedCount: itm['contractName'] || '',
      };
      asset.exposedLimit = {
        title: 'Exposed Limit',
        count: itm['grossExposedLimit'] || '',
        formattedCount: itm['grossExposedLimit'] || '',
      };
      asset.grossLoss = {
        title: 'Gross Loss',
        count: itm['grossLoss'] || '',
        formattedCount: itm['grossLoss'] || '',
      };
      let formattedIntCount = (itm.Intensity + '').split(' ')[0];
      if ((itm.Intensity + '').split(' ')[1] != '') {
        formattedIntCount = itm.Intensity + '';
      }
      asset.intensity = {
        title: 'Intensity',
        count: itm.Intensity,
        formattedCount: formattedIntCount,
      };
      let damage_factor = itm['Damage Factor'] ? itm['Damage Factor'] : '';
      if (itm['Damage Factor'] && !isNaN(itm['Damage Factor'])) {
        damage_factor = Math.round(itm['Damage Factor'] * 100 * 100) / 100;
      } else if (damage_factor.length > 0) {
        damage_factor = damage_factor.includes('%')
          ? damage_factor.replace('%', '')
          : damage_factor;
        damage_factor = parseFloat(damage_factor);
        damage_factor = Math.round(itm['Damage Factor'] * 100 * 100) / 100;
      }
      asset['Asset Name'] = itm['Asset Name'];
      asset.damage_factor = {
        title: 'Damage Factor',
        count: damage_factor,
        formattedCount: damage_factor,
      }; // Need to replace with orginal value
      asset.type = this.alerts[index].perilName;
      asset.perilName = this.alerts[index].perilName;
      asset.id = this.alerts[index].id;
      asset.address = itm.address1 ? itm.address1 : '';
      asset.isObserved = this.alerts[index].isObserved;
      asset.isForecasted = this.alerts[index].isForecasted;
      asset.title = this.alerts[index]['title'];
      asset['expName'] = this.alerts[index]['expName'];
      asset['accountIdForHome'] = this.alerts[index]['accountId'];
      this.alerts[index].assets.push(asset);
      this.totalAssets.push(asset);
      currentPageAssets.push(asset);
    });
    if (this.activeButton && this.activeButton.pageNumber) {
      // this.assetsForPage[this.activeButton.pageNumber] = currentPageAssets;
    }
    if (this.count == this.allAlertsLength || this.isSingleAlertPage) {
      this.pushAlerts();
    }
  }

  pushAlerts() {
    this.setTriggeredAlertList(this.alerts);
    this.setTotalAssets(this.totalAssets);
    this.alerts.forEach((alrt) => {
      this.totalTrgAlrts.push(alrt);
    });
    this.isSingleAlertPage = false;
  }

  setTriggeredAlertList(data: Array<any> = []) {
    this.triggeredAlertList = data;
    this.alertsdata.next({ response: data });
  }
  setTotalAssets(data: Array<any> = []) {
    this.totalAssets = data;
    this.totalAssetsData.next({ response: data });
  }

  getTotalAssets(): Observable<any> {
    return this.totalAssetsData.asObservable();
  }

  getTotalAssetsData() {
    return this.totalAssets;
  }
  getMapPointers(key: string) {
    if (!key) return '';
    return MapPointers[key.toLowerCase()];
  }
  get getAlertData() {
    return this.alertRecord;
  }

  /**
   * getting the alert images based on the object type
   * @param key ---objectType
   */
  getAlertImage(key: any) {
    if (key) {
      key = key.toLowerCase();
      return TriggerdAlertImagesPath[key];
    } else {
      return '';
    }
  }

  /**************************Letest Changes Start *******************/
  /**
   * set the selected alert from home page
   * @param refreshList
   */
  setSelectedAlertAsset(alert: boolean) {
    this.selectedAlertOnHomePage.next({ response: alert });
  }

  /**
   * Method that can be subscribed from any component to get the selected alert
   */
  getSelectedAlertAsset(): Observable<any> {
    return this.selectedAlertOnHomePage.asObservable();
  }

  addOverlayImage(map: any, overlayDetails: any = {}) {
    if (
      overlayDetails &&
      overlayDetails.shapeData &&
      overlayDetails.shapeData.shapeType == 'JSON'
    ) {
      overlayDetails.shapeData.shapeType = 'Multicircle';
    }
    if (
      overlayDetails &&
      overlayDetails.shapeData &&
      overlayDetails.shapeData.shapeType == 'TIFF'
    ) {
      let shapeJson: any = overlayDetails['SHAPE_JSON'] || {};
      shapeJson.bounds = shapeJson.bounds || {};
      if (overlayDetails.shapeData.layer_name) {
        // this event is served as a WMS layer from geo.eigenrisk
        var customParams = {
          FORMAT: 'image/png',
          LAYERS: overlayDetails.shapeData.layer_name,
          CRS: 'EPSG:3857',
          EXCEPTIONS: 'XML',
          STYLES: '',
        };
        var baseUrl = `https://${window.geoServerURL}/geoserver/BigTiff/wms`;
        // var newOverlay = this.loadWMS(map, baseUrl, customParams, overlayDetails.shapeData.layer_name);
        var newOverlayBounds = {
          swBound: [shapeJson.bounds.swBound[1], shapeJson.bounds.swBound[0]],
          neBound: [shapeJson.bounds.neBound[1], shapeJson.bounds.neBound[0]],
        };
        var swBound, neBound;
        if (
          newOverlayBounds &&
          newOverlayBounds.swBound &&
          newOverlayBounds.neBound
        ) {
          swBound = new google.maps.LatLng(
            newOverlayBounds.swBound[0],
            newOverlayBounds.swBound[1]
          );
          neBound = new google.maps.LatLng(
            newOverlayBounds.neBound[0],
            newOverlayBounds.neBound[1]
          );
        } else {
          var currentBounds = map.getBounds().toUrlValue().split(',');
          swBound = new google.maps.LatLng(currentBounds[0], currentBounds[1]);
          neBound = new google.maps.LatLng(currentBounds[2], currentBounds[3]);
        }

        // newOverlay.bounds = new google.maps.LatLngBounds(swBound, neBound);
        // // add this to the map
        // map.overlayMapTypes.push(newOverlay);
      } else {
        let overlayInfo = {
          overlayType: 'geotiff',
          overlayImage: overlayDetails['SHAPE_THUMBNAIL'],
          bounds: {
            swBound: [shapeJson.bounds.swBound[1], shapeJson.bounds.swBound[0]],
            neBound: [shapeJson.bounds.neBound[1], shapeJson.bounds.neBound[0]],
          },
        };
        let newOverlay: any = this.setOverLay(overlayInfo, map);
      }
      let catalogHandDrawnShapeFeatures = {
        strokeWeight: 0,
        draggable: false,
      };
      let newOverlayMask: any = new google.maps.Polygon(
        _.extend(
          {
            map: map,
            geodesic: false,
            draggable: false,
            fillOpacity: 0,
            editable: false,
            strokeWeight: 0,
            path: [
              {
                lat: shapeJson.bounds.swBound[1],
                lng: shapeJson.bounds.swBound[0],
              },
              {
                lat: shapeJson.bounds.neBound[1],
                lng: shapeJson.bounds.swBound[0],
              },
              {
                lat: shapeJson.bounds.neBound[1],
                lng: shapeJson.bounds.neBound[0],
              },
              {
                lat: shapeJson.bounds.swBound[1],
                lng: shapeJson.bounds.neBound[0],
              },
            ],
          },
          catalogHandDrawnShapeFeatures
        )
      );
      let center = new google.maps.LatLng(
        shapeJson.bounds.center[1],
        shapeJson.bounds.center[0]
      );
      if (!google.maps.geometry.poly.containsLocation(center, newOverlayMask)) {
        let path: any = [
          {
            lat: shapeJson.bounds.swBound[1],
            lng: shapeJson.bounds.swBound[0],
          },
          {
            lat: shapeJson.bounds.neBound[1],
            lng: shapeJson.bounds.swBound[0],
          },
          {
            lat: shapeJson.bounds.neBound[1],
            lng: shapeJson.bounds.center[0],
          },
          {
            lat: shapeJson.bounds.neBound[1],
            lng: shapeJson.bounds.neBound[0],
          },
          {
            lat: shapeJson.bounds.swBound[1],
            lng: shapeJson.bounds.neBound[0],
          },
          {
            lat: shapeJson.bounds.swBound[1],
            lng: shapeJson.bounds.center[0],
          },
        ];
        newOverlayMask.setPath(path);
      }
    } else if (
      overlayDetails &&
      overlayDetails.shapeData &&
      overlayDetails.shapeData.shapeType == 'GEOJSON'
    ) {
      let allLats = [];
      let allLongs = [];
      let shapeData = overlayDetails.shapeData;
      var bound = new google.maps.LatLngBounds();
      // Copied from old module, but not using
      function processPoints(arr: any) {
        if (!_.isArray(arr)) {
          return;
        }

        if (_.isArray(arr[0])) {
          _.each(arr, function (arrElem) {
            processPoints(arrElem);
          });
        } else {
          arr[1] += 0;
          arr[0] += 0;
          bound.extend(new google.maps.LatLng(arr[1], arr[0]));
          allLats.push(arr[1]);
          allLongs.push(arr[0]);
        }
      }
      // Copied from old module, but not using
      _.each(shapeData.features, function (feature) {
        feature.properties.eventSevModel = shapeData.severityModelID;
        // copy the original color for reapplying
        if (feature.properties.color) {
          feature.properties.originalColor = feature.properties.color;
        }
        feature.geometry && processPoints(feature.geometry.coordinates);
      });

      map.data.addGeoJson(shapeData.shapeData);
      map.data.setStyle(function (feature: any) {
        return {
          strokeWeight: 0,
          fillColor: feature.getProperty('color'),
        };
      });
    } else if (
      overlayDetails &&
      overlayDetails.shapeData &&
      (overlayDetails.shapeData.shapeType == 'circle' ||
        overlayDetails.shapeData.shapeType == 'Multicircle')
    ) {
      let allLats = [];
      let allLongs = [];
      let deltaLon = 0;
      let deltaLat = 0;
      let shapeData = overlayDetails.shapeData.shapeData;
      let me = this;
      if (!shapeData.features) {
        if (
          shapeData.concentricCircles &&
          shapeData.concentricCircles.length > 0
        ) {
          let outShape = [];
          outShape.push(this.getConcentricCircles(shapeData, map));
          return outShape[0];
        } else {
          return new google.maps.Circle(
            _.extend(
              {
                center: shapeData.getCenter(),
                radius: shapeData.getRadius(),
                map: map,
              },
              me.catalogHandDrawnShapeFeatures
            )
          );
        }
      } else {
        let outShape: any = [];
        shapeData.features.forEach(function (feature: any, index: any) {
          allLongs.push(feature.CenterLon + deltaLon);
          allLats.push(feature.CenterLat + deltaLat);

          let concentrics = feature.Concentrics;
          if (concentrics && concentrics.length > 0) {
            outShape.push(
              me.getOuterCircleForConcentricCircles(
                feature,
                concentrics,
                map,
                deltaLat,
                deltaLon
              )
            );
          } else {
            outShape.push(
              new google.maps.Circle(
                _.extend(
                  {
                    center: new google.maps.LatLng(
                      feature.CenterLat + deltaLat,
                      feature.CenterLon + deltaLon
                    ),
                    radius: feature.Radii * 1000,
                    map: map,
                  },
                  me.catalogHandDrawnShapeFeatures
                )
              )
            );
          }
        });
        if (outShape.length == 1) {
          return outShape[0];
        } else {
          if (outShape.length) {
            let bounds: any;
            _.each(outShape, function (item) {
              if (!bounds) {
                bounds = item.getBounds();
              } else {
                bounds = bounds.union(item.getBounds());
              }
            });
          }
          return outShape;
        }
      }
    } else {
    }
  }

  setOverLay(overlayInfo: any, map: any) {
    let overlayImage: any = overlayInfo.overlayImage;
    if (!_.isString(overlayImage)) {
      return;
    }

    let swBound: any, neBound: any;
    if (
      overlayInfo.bounds &&
      overlayInfo.bounds.swBound &&
      overlayInfo.bounds.neBound
    ) {
      swBound = new google.maps.LatLng(
        overlayInfo.bounds.swBound[0],
        overlayInfo.bounds.swBound[1]
      );
      neBound = new google.maps.LatLng(
        overlayInfo.bounds.neBound[0],
        overlayInfo.bounds.neBound[1]
      );
    } else {
      let currentBounds = map.getBounds().toUrlValue().split(',');
      swBound = new google.maps.LatLng(currentBounds[0], currentBounds[1]);
      neBound = new google.maps.LatLng(currentBounds[2], currentBounds[3]);
    }

    let bounds: any = new google.maps.LatLngBounds(swBound, neBound);
    let srcImage: any = 'data:image/png;base64,' + overlayImage; // base64 image encoding needed

    let contentHtml: any =
      '<img style="height:100%; width:100%; position:absolute" src="' +
      srcImage +
      '">';

    let newOverlay: any = new DraggableOverlay(map, {
      bounds: bounds,
      content: contentHtml,
    });
    newOverlay['bounds'] = bounds;

    return newOverlay;
  }

  getConcentricCircles(shapeData: any, map: any) {
    let circles: any = [];
    let immovableShapeFeatures = {
      strokeWeight: 0,
      draggable: false,
    };
    for (let i = 0; i < shapeData.concentricCircles.length; i++) {
      let c = new google.maps.Circle(
        _.extend(
          {
            center: shapeData.concentricCircles[i].getCenter(),
            radius: shapeData.concentricCircles[i].getRadius(),
            map: map,
            Intensity: shapeData.concentricCircles[i].Intensity,
            fillColor: shapeData.concentricCircles[i].color,
          },
          immovableShapeFeatures
        )
      );
      c.color = shapeData.concentricCircles[i].color;
      circles.push(c);
    }

    let moveableCircle = new google.maps.Circle(
      _.extend(
        {
          center: shapeData.getCenter(),
          radius: shapeData.getRadius(),
          map: map,
          Intensity: shapeData.Intensity,
          fillColor: shapeData.color || '#000000',
        },
        this.catalogHandDrawnShapeFeatures
      )
    );
    moveableCircle.color = shapeData.color || '#000000';

    google.maps.event.addListener(
      moveableCircle,
      'center_changed',
      function () {
        circles.forEach(function (circle: any) {
          circle.setCenter(moveableCircle.getCenter());
        });
      }
    );
    moveableCircle.concentricCircles = circles;
    return moveableCircle;
  }

  getOuterCircleForConcentricCircles(
    feature: any,
    concentrics: any,
    map: any,
    deltaLat: any,
    deltaLon: any
  ) {
    if (!deltaLat) {
      deltaLat = 0;
    }

    if (!deltaLon) {
      deltaLon = 0;
    }

    let me = this;
    let immovableShapeFeatures = {
        strokeWeight: 0,
        draggable: false,
      },
      circles: any = [],
      center = new google.maps.LatLng(
        feature.CenterLat + deltaLat,
        feature.CenterLon + deltaLon
      ),
      radii: any = [],
      Intensities: any = [],
      colors: any = [],
      originalRadii = feature.Radii;

    immovableShapeFeatures.draggable = false;
    concentrics.forEach(function (circleData: any, index: any) {
      if (index < concentrics.length - 1) {
        radii.push(originalRadii + circleData.Radii);
        Intensities.push(circleData.Intensity);
        colors.push(circleData.Color || '#000000');
      }
    });

    //All others except the last
    for (let i = 0; i < radii.length; i++) {
      let c = new google.maps.Circle(
        _.extend(
          {
            center: center,
            radius: radii[i] * 1000,
            map: map,
            Intensity: Intensities[i],
            fillColor: colors[i],
          },
          immovableShapeFeatures
        )
      );
      c.color = colors[i];
      circles.push(c);
    }

    //Moveable circle
    let moveableCircle = new google.maps.Circle(
      _.extend(
        {
          center: center,
          radius:
            (originalRadii + concentrics[concentrics.length - 1].Radii) * 1000,
          map: map,
          Intensity: concentrics[concentrics.length - 1].Intensity,
          fillColor: concentrics[concentrics.length - 1].Color || '#000000',
        },
        me.catalogHandDrawnShapeFeatures
      )
    );
    moveableCircle.color =
      concentrics[concentrics.length - 1].Color || '#000000';
    google.maps.event.addListener(
      moveableCircle,
      'center_changed',
      function () {
        circles.forEach(function (circle: any) {
          circle.setCenter(moveableCircle.getCenter());
        });
      }
    );
    moveableCircle.concentricCircles = circles;
    return moveableCircle;
  }

  // loadWMS(map:any, baseURL:any, customParams:any, layerName:any) {
  //   let isPng = true;
  //   let minZoomLevel = 2;
  //   let maxZoomLevel = 28;

  //   //add additional parameters
  //   let wmsParams = _.extend(this.wmsStandardParams,customParams);
  //   let baseQuery = "";
  //   _.each(wmsParams, function(val, key){
  //       baseQuery += key + "=" + val + "&";
  //   });
  //   let overlayOptions:any = {
  //       getTileUrl: function(coord:any, zoom:any) {
  //           let lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
  //           let lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);

  //           // let projectionMap = new MercatorProjection();

  //           let lULg = projectionMap.fromDivPixelToSphericalMercator(lULP, zoom);
  //           let lLRg  = projectionMap.fromDivPixelToSphericalMercator(lLRP, zoom);

  //           let lUL_Latitude = lULg.y;
  //           let lUL_Longitude = lULg.x;
  //           let lLR_Latitude = lLRg.y;
  //           let lLR_Longitude = lLRg.x;
  //           //GJ: there is a bug when crossing the -180 longitude border (tile does not render) - this check seems to fix it
  //           if (lLR_Longitude < lUL_Longitude) {
  //             lLR_Longitude = Math.abs(lLR_Longitude);
  //           }
  //           let urlResult = baseURL + '?' + baseQuery + "bbox=" + lUL_Longitude + "," + lUL_Latitude + "," + lLR_Longitude + "," + lLR_Latitude;
  //           return urlResult;
  //       },

  //       tileSize: new google.maps.Size(this.tileHeight, this.tileWidth),

  //       minZoom: minZoomLevel,
  //       maxZoom: maxZoomLevel,
  //       opacity: 0.8,
  //       isPng: isPng
  //   };
  //   if(layerName) {
  //       overlayOptions['name'] = layerName;
  //   }

  //   let overlayWMS = new google.maps.ImageMapType(overlayOptions);
  //   return overlayWMS;
  // }

  numberWithCommas(x: any) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  }

  /**************************Letest Changes end *******************/

  getFormatedDate(date: any) {
    let datePipe = new DatePipe('en-US');
    let todaysDate = datePipe.transform(new Date(), 'MMM-dd-yyyy');
    let dateForFilter = datePipe.transform(date, 'MMM-dd-yyyy');
    let newDate = new Date(date);
    let hour: string | Number = newDate.getHours();
    let minute: string | Number = newDate.getMinutes();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    let time = hour + ':' + minute;

    let actualDate = '';
    if (dateForFilter == todaysDate) {
      actualDate = time + ' Today';
    } else {
      let concatActivityDate = dateForFilter
        ?.replace('-', ' ')
        .replace('-', ', ');
      actualDate = time + ' ' + concatActivityDate;
    }
    return actualDate;
  }

  removeCurrencyFromValues(value: string) {
    value = value + '';
    let data = value.split(' ', 2);
    let Newvalue = '';
    data.forEach((singlevalue) => {
      Newvalue = Newvalue + singlevalue + ' ';
    });
    return Newvalue;
  }

  /**
   * calculating the differences in dates.
   */
  getDateDiffFromToday(date: any, onlyDays: boolean = false) {
    var now: any = new Date();
    if (onlyDays) {
      let diff = Math.floor((now - date) / 1000 / 60 / 60 / 24);
      if (diff > 0) {
        return { dateDiff: diff, datePart: 'days' };
      } else {
        diff = Math.floor((now - date) / 1000 / 60 / 60);
        if (diff > 0) {
          return { hoursDiff: diff, datePart: 'hours' };
        } else {
          diff = Math.floor((now - date) / 1000 / 60);
          if (diff > 0) {
            return { minuteDiff: diff, datePart: 'minutes' };
          } else {
            diff = Math.floor((now - date) / 1000);
            return { secondsDiff: diff, datePart: 'seconds' };
          }
        }
      }
    } else {
      if (
        date.getFullYear() == now.getFullYear() &&
        date.getMonth() == now.getMonth() &&
        date.getDate() == now.getDate()
      ) {
        let hourDiff = now.getHours() - date.getHours();
        if (hourDiff == 0) {
          return {
            minuteDiff: now.getMinutes() - date.getMinutes(),
            dateDiff: now.getDate() - date.getDate(),
            datePart: 'minutes',
          };
        } else {
          return {
            hoursDiff: now.getHours() - date.getHours(),
            dateDiff: now.getDate() - date.getDate(),
            datePart: 'hours',
          };
        }
      } else if (
        date.getFullYear() == now.getFullYear() &&
        date.getMonth() == now.getMonth()
      ) {
        if (now.getDate() > date.getDate()) {
          return { dateDiff: now.getDate() - date.getDate(), datePart: 'days' };
        } else {
          return { dateDiff: date.getDate() - now.getDate(), datePart: 'days' };
        }
      } else if (
        date.getFullYear() == now.getFullYear() &&
        date.getMonth() != now.getMonth()
      ) {
        if (now.getMonth() > date.getMonth()) {
          return {
            dateDiff: now.getMonth() - date.getMonth(),
            datePart: 'months',
          };
        } else {
          return {
            dateDiff: date.getMonth() - now.getMonth(),
            datePart: 'months',
          };
        }
      } else if (date.getFullYear() != now.getFullYear()) {
        return {
          dateDiff: now.getFullYear() - date.getFullYear(),
          datePart: 'years',
        };
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@app/core/services/config.service';
import { HomePageService } from '@app/features/home/services/home-page.service';
import { CommonService } from '@app/shared/services/common.service';
import { APIRequestUrls } from 'app/shared/api';
import { DraggableOverlay } from '@app/shared/services/draggable.overlay';
import * as _ from 'underscore';

declare var google: any;

@Component({
  selector: 'triggered-alert-map',
  templateUrl: './triggered-alert-map.component.html',
  styleUrls: ['./triggered-alert-map.component.scss'],
})
export class TriggeredAlertMapComponent implements OnInit {
  [x: string]: any;
  map: any;

  constructor(
    private homePageService: HomePageService,
    private _coreService: CoreConfigService,
    private commonService: CommonService
  ) {}
  selectedID?: number;
  alertData = [];
  overlayDetails: any;
  userInput: string = '';
  workspaceId: string = 'all';
  currentInfoWin: any = null;

  ngOnInit(): void {
    // this.getTriggeredAlerts();
    // this.renderMap();
    this.homePageService.getSelectedAlertAsset().subscribe((data) => {
      if (this.homePageService.isDefaultAlerts) {
        this.selectedID = 0;
        this.addMapWithMarkers();
      } else {
        if (data.response.id) {
          this.selectedAlertID(data.response.id);
        }
      }
    });
    this.subscription = this._coreService.currentWorkspace.subscribe(
      (id: any) => {
        this.workspaceId = id;
        this.getTriggeredAlerts(this.workspaceId);
      }
    );
  }
  getTriggeredAlerts(workspaceId: string) {
    let userId = this._coreService.getUserId();
    this.homePageService
      .getTriggeredAlertsData(userId, workspaceId)
      .subscribe((alerts: any) => {
        this.alertData = alerts;
        if (alerts.length > 0) {
          setTimeout(() => {
            this.addMapWithMarkers();
          });
        } else {
          var triggeredMapInterval = setInterval(() => {
            if (document.getElementById('triggeredMap')) {
              this.renderMap();
            }
            clearInterval(triggeredMapInterval);
          }, 100);
        }
      });
  }

  addMapWithMarkers() {
    this.renderMap();
    if (this.selectedID) {
      this.homePageService.addOverlayImage(this.map, this.overlayDetails);
    }
    let bounds: any = new google.maps.LatLngBounds();
    this.fullAssets.forEach((item, index) => {
      let label: any = index + 1;
      label = label.toString();
      let myLatLng: any = { lat: item.lat, lng: item.lon };
      let marker: any = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        icon: this.homePageService.getMapPointers(item.type),
        id: item.id,
        asset: item,
      });

      bounds.extend(marker.getPosition());
      let scope: any = this;
      google.maps.event.addListener(marker, 'click', () => {
        let elmnt: any = document.getElementById(marker.id);
        // elmnt.scrollIntoView();
        if (scope.currentInfoWin !== null) {
          scope.currentInfoWin.close(this.map, this);
        }
        scope.currentInfoWin = this.infoWin;
        scope.singleAlert = scope.alertData.filter(
          (alert: any) => alert.id == marker.id
        )[0];
        let infoWindow: any = scope.getinfoWindow(marker.asset);
        scope.currentInfoWin = infoWindow;
        infoWindow.open(this.map, marker);
        setTimeout(() => {
          if (document.getElementById('mapMoreInfo' + marker.id)) {
            // document.getElementById('mapMoreInfo' + marker.id).addEventListener('click', function () {
            //   scope.mapMoreInfo(marker.asset.id, marker.asset);
            // }
            // );
          }
        }, 1000);
      });
    });
    this.map.fitBounds(bounds);
  }

  /*****************************Latest changes */

  getinfoWindow(asset: any) {
    let scope: any = this;
    return new google.maps.InfoWindow({
      maxWidth: 510,
      maxHeight: 400,
      zIndex: 5000,
      content: `<div class=' padding alert' style="z-index:1 !important;">
              <div class="p-grid ">
                <div class="p-col-2 alert-image" style = "" >
                  <img width = "24" height= "24" src='${scope.homePageService.getAlertImage(
                    asset.type
                  )}' title="${asset.type}">
                </div>
                <div class="p-col-10 p-pl-0 p-pr-0" >
                    <div class=" triggered-content map-event-name alert__asset"  title="${
                      asset['title']
                    }">
                      ${asset['title']}</div>
                    <div class="triggered-content map-event-name asset alert__asset__name"  title="${
                      asset['Asset Name']
                    }">
                      ${asset['Asset Name']}
                    </div>
                    <div class=" triggered-content map-event-name asset asset-name" title="${
                      asset['title']
                    }">
                      ${scope.singleAlert.intensity_defintion} = ${
        asset['intensity'].count
      } 
                      <span *ngIf="singleAlert?.intensity_unit && singleAlert?.intensity_unit != 'None'"> ( ${
                        scope.singleAlert.intensity_unit
                      } )</span></div>
                  </div>
              </div>
              <div class="p-grid padding int-estloss int-estloss-in-map">
                <div class="p-col-4 p-pr-0 p-pt-0 p-pb-0    padding">
                  <div class="padding asset__details">
                    <div  class="asset__details__name triggered-sub-titles position-relative" toolTip  [elementName]="'Asset'" [toolTipPosition]="'left'" [order]=1>
                      Asset#
                    </div>
                    <div class="details-value details-value-in-map triggered-content">
                      ${asset.asset.formattedCount}
                    </div>
                  </div>
                </div>
                <div class="p-col-4 p-pr-0 p-pt-0 p-pb-0  padding details">
                  <div  class="asset__details__name triggered-sub-titles position-relative" toolTip  [elementName]="'TIV'" [toolTipPosition]="'left'" [order]=1>
                    TIV
                  </div>
                  <div class="details-value details-value-in-map triggered-content">
                    ${asset.tiv.formattedCount}
                  </div>
                </div>
                <div class="p-col-4 p-pr-0 p-pt-0 p-pb-0  padding details">
                  <div style = "font-size:9px; font-weight:Roboto; color:#8887a3;" class="details-name triggered-sub-titles position-relative" toolTip  [elementName]="'Ground Up Loss'" [toolTipPosition]="'left'" [order]=1>
                  Ground Up Loss**
                  </div>
                  <div class="details-value details-value-in-map triggered-content">
                    ${
                      scope.singleAlert.show_gu_loss == false
                        ? '-'
                        : asset.estimated_loss.formattedCount
                    } 
                  </div>
                </div>
              </div>

              <div class='${scope.getClassForPortfolio(
                asset.isPortfolio
              )} p-grid' class=" padding int-estloss">
                <div class="p-col-4 padding">
                    <div style = "font-size:9px; font-weight:Roboto; color:#10f;" class="details-name triggered-portfolio-sub-titles position-relative" toolTip  [elementName]="'Contract'" [toolTipPosition]="'left'" [order]=1>
                      #Contract
                    </div>
                    <div  class="details-value details-value-in-map triggered-portfolio-content">
                      ${asset.contract.count}
                    </div>
                </div>
                <div class="p-col-4 padding details">
                  <div style = "font-size:9px; font-weight:Roboto; color:#10f;" class="details-name triggered-portfolio-sub-titles position-relative" toolTip  [elementName]="'Event News'" [toolTipPosition]="'left'" [order]=1>
                    Exposed Limit
                  </div>
                  <div class="details-value details-value-in-map triggered-portfolio-content">
                    ${asset.exposedLimit.count}
                  </div>
                </div>
                <div class="p-col-4 p-pr-0 padding details">
                  <div style = "font-size:9px; font-weight:Roboto; color:#10f;" class="details-name triggered-portfolio-sub-titles position-relative" toolTip  [elementName]="'Event News'" [toolTipPosition]="'left'" [order]=1>
                    Gross Loss**
                  </div>
                  <div class="details-value details-value-in-map triggered-portfolio-content" toolTip  [elementName]="'Event News'" [toolTipPosition]="'left'" [order]=1>
                    ${asset.grossLoss.count} 
                  </div>
                </div>
              </div>
              <div class = "p-grid">
                <div id="mapMoreInfo${
                  asset.id
                }" style="text-align:center; font-weight:400; font-family:Roboto; cursor:pointer; color: #43425d; background-color:#ccc;" class="p-col-12 p-pt-0 p-pb-0 more-info more-info-in-map padding" toolTip  [elementName]="'Event News'" [toolTipPosition]="'left'" [order]=1>More Info</div>
              </div>
            </div>`,
    });
  }

  selectedAlertID(id: any) {
    let element: any = document.getElementById('triggeredMap');
    if (element && element.firstChild && element.children.length > 0) {
      element.removeChild(element.firstChild);
    }
    if (this.selectedID == id) {
      this.selectedID = 0;
      this.addMapWithMarkers();
    } else {
      this.selectedID = id;
      this.getOverlayImage();
    }
  }

  addOverlayImage(map: any) {
    let shapeJson: any = this.overlayDetails['SHAPE_JSON'] || {};
    shapeJson.bounds = shapeJson.bounds || {};
    let overlayInfo = {
      overlayType: 'geotiff',
      overlayImage: this.overlayDetails['SHAPE_THUMBNAIL'],
      bounds: {
        swBound: [shapeJson.bounds.swBound[1], shapeJson.bounds.swBound[0]],
        neBound: [shapeJson.bounds.neBound[1], shapeJson.bounds.neBound[0]],
      },
    };
    let newOverlay: any = this.setOverLay(overlayInfo, map);
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
  }

  getOverlayImage() {
    let alerts: Array<any> =
      this.alertData.filter((o: any) => o.id == this.selectedID) || [];

    let shapeDataParams: any = {};
    shapeDataParams['eventID'] = alerts[0]['event_id'];
    shapeDataParams['severityModelID'] = alerts[0]['sev_model_id'];
    //as per the old module, here, need to pass event name
    //but in api, this will be used to return with the shape data only.
    //so to test using passing event set name
    shapeDataParams['eventName'] = alerts[0]['evenSetName'];
    shapeDataParams['accountId'] = 0; //this.mawsService.getSelectedAccountId();
    let shapeDataParamsList: any = [];
    shapeDataParamsList.push(shapeDataParams);
    let request: any = {
      action: `${APIRequestUrls.getOverlayImage}${alerts[0]['event_id']}/${alerts[0]['sev_model_id']}`,
      success: (data: any) => {
        this.overlayDetails = data || {};

        let shapeRequest: any = {
          action: APIRequestUrls.getShapeData,
          params: shapeDataParamsList,
          success: (data: any) => {
            // As we send only one request object, we expect to receive only one response object
            this.overlayDetails['shapeData'] = data[0] || {};
            this.addMapWithMarkers();
          },
        };
        this.commonService.postRequest(shapeRequest);
      },
    };
    this.commonService.getRequest(request);
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

  get totalAssets() {
    return this.homePageService.getTotalAssetsData();
  }

  get fullAssets(): Array<any> {
    let fullAssets = [];
    if (!this.userInput) {
      fullAssets = this.totalAssets;
    } else {
      fullAssets = this.totalAssets.filter(
        (item) =>
          item.perilName.toLowerCase().indexOf(this.userInput.toLowerCase()) !==
            -1 ||
          item.title.toLowerCase().indexOf(this.userInput.toLowerCase()) !==
            -1 ||
          item.expName.toLowerCase().indexOf(this.userInput.toLowerCase()) !==
            -1
      );
    }
    if (this.selectedID) {
      fullAssets = fullAssets.filter((o) => o.id == this.selectedID);
    }
    return fullAssets;
  }

  getClassForPortfolio(isPortfolio: any) {
    if (isPortfolio) {
      return 'is-portfolio-object';
    } else {
      return 'is-not-portfolio';
    }
  }
  // showOrHideCmp(alert, filteredObject) {
  //   let hide: boolean = false;
  //   let filtersSelected: boolean = false;
  //   alert.isMatched = false;
  //   if (filteredObject.isByDefault) {
  //     return hide;
  //   }
  //   else if (alert) {
  //     let keys: Array<any> = Object.keys(filteredObject) || [];
  //     for (let i = 0; i < keys.length; i++) {
  //       if (keys[i] != 'isByDefault' && keys[i] != 'observedEventSets' && keys[i] != 'forecastedEventSets' && filteredObject[keys[i]]) {
  //         filtersSelected = true;
  //         if (keys[i] == alert.perilName) {
  //           alert.isMatched = true;
  //           break;
  //         }
  //       }
  //     }
  //     if (!alert.isMatched && filtersSelected) {
  //       hide = true;
  //     }
  //     if ((filteredObject.observedEventSets && !alert.isObserved) && (filteredObject.forecastedEventSets && !alert.isForecasted)) {
  //       hide = true;
  //     }
  //     return hide;
  //   }
  // }
  /****************************Latest Changes end */

  renderMap() {
    this.map = new google.maps.Map(document.getElementById('triggeredMap'), {
      zoom: 8,
      controlSize: 22,
      tilt: 0,
      center: { lat: 0, lng: 0 },
      mapTypeId: 'roadmap',
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: false,
      backgroundColor: 'transparent',
    });
    return this.map;
  }
}

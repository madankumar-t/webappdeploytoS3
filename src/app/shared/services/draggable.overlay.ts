declare var google: any;

export class DraggableOverlay extends google.maps.OverlayView {
  constructor(map: any, overlayInfo: any) {
    super();
    this.setValues({
      position: overlayInfo.bounds
        ? overlayInfo.bounds.getCenter()
        : overlayInfo.position,
      container: null,
      content: overlayInfo.content,
      bounds: overlayInfo.bounds,
      map: map,
      id: overlayInfo.id,
      reference: overlayInfo.bounds.getSouthWest(),
      MapHandlers: {},
    });
  }

  onAdd() {
    let container: any = document.createElement('div');
    let that: any = this;

    container.innerHTML = this.get('content');
    container.style.position = 'absolute';
    container.id = this.id;
    container.draggable = false;

    this.set('container', container);
    this.getPanes().overlayLayer.appendChild(container);
  }

  draw() {
    let overlayProjection = this.getProjection();

    if (this.get('bounds')) {
      let sw: any = overlayProjection.fromLatLngToDivPixel(
        this.get('bounds').getSouthWest()
      );
      let ne: any = overlayProjection.fromLatLngToDivPixel(
        this.get('bounds').getNorthEast()
      );
      if (ne.x < sw.x) {
        if (ne.x > 0) {
          sw.x -= overlayProjection.getWorldWidth();
        } else {
          ne.x += overlayProjection.getWorldWidth();
        }
      }
      this.get('container').style.left = sw.x + 'px';
      this.get('container').style.top = ne.y + 'px';
      this.get('container').style.width = ne.x - sw.x + 'px';
      this.get('container').style.height = sw.y - ne.y + 'px';
      this.set('position', this.get('bounds').getCenter());
    } else {
      let pos: any = overlayProjection.fromLatLngToDivPixel(
        this.get('position')
      );
      this.get('container').style.left = pos.x + 'px';
      this.get('container').style.top = pos.y + 'px';
    }
  }

  onRemove() {
    this.get('container').parentNode.removeChild(this.get('container'));
    this.set('container', null);
  }

  setImageOpacity(opacity: any) {
    let container: any = this.get('container');
    if (container) {
      let img: any = container.childNodes[0];
      img.style.opacity = opacity;
      img.style.filter =
        'alpha(opacity=' + opacity * 100 + ')'; /* For IE8 and earlier */
    }
  }
}

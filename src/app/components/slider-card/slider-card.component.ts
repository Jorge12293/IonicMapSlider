import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

declare const Swiper: any;
declare var google: any;
@Component({
  selector: 'app-slider-card',
  templateUrl: './slider-card.component.html',
  styleUrls: ['./slider-card.component.scss'],
})
export class SliderCardComponent  implements OnInit {
  map:any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('swiperContainer', { read: ElementRef }) swiperContainer?: ElementRef<HTMLDivElement>;
  itemSelect:any=null;
  mapMarkers: any[] = [];
  swiperItems = [
    { 
      id:1,
      title: 'Card Title 1 Buenos Aires', 
      subtitle: 'Card Subtitle 1', 
      content: 'Heres a small text description for the card content. Nothing more, nothing less.',
      position: { lat: -34.603722, lng: -58.381592 }, // Buenos Aires, Argentina
    },
    { 
      id:2,
      title: 'Card Title 2 Nueva York', 
      subtitle: 'Card Subtitle 2', 
      content: 'Content 2',
     position: { lat: 40.712776, lng: -74.005974 }, // Nueva York, Estados Unidos 
    },
    { 
      id:3,
      title: 'Card Title 3 París', 
      subtitle: 'Card Subtitle 3', 
      content: 'Heres a small text description for the card content. Nothing more, nothing less.',
      position: { lat: 48.856613, lng: 2.352222 }, // París, Francia  
    }
  ];

  constructor() { }

  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3&key=apikey&libraries=places';
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Error loading Google Maps API.'));
      };
      document.body.appendChild(script);
    });
  }


  onSlideChange(event:any) {
    this.itemSelect=null;
    const swiperInstance = event.detail[0];
    const activeIndex = swiperInstance.realIndex; 
    this.updateMapCenter(this.swiperItems[activeIndex].position);
  }
  

  initMap() {
      const originalCenter = this.swiperItems[0].position; 
      const mapOptions = {
        zoom: 10, 
        center: this.adjustCoordinates(originalCenter, -0.10),
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.swiperItems.forEach((item) => {
        this.addMarker(item);
      });

  }

  addMarker(item: any) {
    const marker = new google.maps.Marker({
      position: item.position,
      map: this.map,
      title: 'Marcador'
    });

    marker.addListener('click', ()=> this.moveMarker(item));
    this.mapMarkers.push(marker);
  }


  updateMapCenter(newCenter: any) {
    this.map.setCenter(this.adjustCoordinates(newCenter, -0.10));
    const newZoom = 10; 
    this.map.setZoom(newZoom);
  }


  adjustCoordinates(originalCoordinates: any, verticalOffset: number): any {
    const adjustedCoordinates = {
      lat: originalCoordinates.lat + verticalOffset,
      lng: originalCoordinates.lng
    };
    return adjustedCoordinates;
  }

  moveMarker(item: any){
    this.itemSelect = item;
    this.updateMapCenter(item.position);
  }
  

}

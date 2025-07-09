import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject, output } from '@angular/core';
import * as L from 'leaflet';
import { RepositoryService } from '../../services/repository.service';
import { leafletModel } from './leaflet.model';

@Component({
  selector: 'lcdj-leaflet-map',
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements AfterViewInit, OnInit {

  onSelect = output<leafletModel>();

  ngOnInit(): void {

    this.repositoryService.getStations().then(stations => {

      stations.forEach(station => {
        L.circleMarker([station.latitude as number, station.longitude as number], {
          color: this.getColor(station.climateName),
          fillColor: this.getFillColor(station.climateName),
          fillOpacity: 0.6,
          radius: 4
        })
        .bindPopup(station.name + ' (' + station.codeDepartement + ')')
        .on('click', (e) => {
          this.onSelect.emit({
            selectedStationId : station.id,
            selectedStationName : `${station.name} (${station.codeDepartement})`
          });

        })
        .addTo(this.map);

      });
    });

  }

  getFillColor(climat: string | null | undefined) {
    switch(climat) {
      case 'Océanique':
        return '#4242FF';
      case 'Tempéré':
        return 'green';
      case 'Continental':
        return 'orange';
      case 'Méditérranéen':
        return 'red';
      case 'Montagnard':
        return 'blue';
      default :
        return 'brown';
    }
  }

  getColor(climat: string | null | undefined) {
    switch(climat) {
      case 'Océanique':
        return '#9691FF';
      case 'Tempéré':
        return 'green';
      case 'Continental':
        return 'orange';
      case 'Méditérranéen':
        return 'red';
      case 'Montagnard':
        return 'blue';
      default :
        return 'brown';
    }
  }

  repositoryService = inject(RepositoryService);

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  private map!: L.Map

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {

    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    this.map = L.map(this.mapElementRef.nativeElement, {
      center : [46.79662973665167, 1.8901048383114634],
      zoom : 5,
      maxZoom: 12,
      minZoom: 5
    });
    L.tileLayer(baseMapURl).addTo(this.map);

  }

}

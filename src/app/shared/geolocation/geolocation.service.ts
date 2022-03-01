import { Injectable } from '@angular/core';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { GetWeatherService } from 'app/shared/weather/get-weather.service';

@Injectable({
  providedIn: 'root'
})
export class GetGeolocationService {
  arrWeatherInfo
  arrPosition
  constructor(
    public GeolocationService$: GeolocationService,
    public GetWeatherService: GetWeatherService,
  ) { }

  async GetGeo() {
    //localStorage.removeItem('okta_lat');
    //localStorage.removeItem('okta_long');

    await this.GeolocationService$.pipe(take(1)).subscribe(position => {
      //  localStorage.setItem('okta_lat',JSON.stringify(position.coords.latitude));
      //  localStorage.setItem('okta_long',JSON.stringify(position.coords.longitude));

      console.log(position.coords.latitude + " : " + position.coords.longitude)
      this.arrPosition = this.GetWeatherService.GetWeather(position.coords.latitude, position.coords.longitude);
    })
  }
}

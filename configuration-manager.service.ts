import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfigurations } from '../../../assets/Configurations/IConfigurations.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationManagerService {

  static settings:IConfigurations

  constructor(private http: HttpClient) { }
  load() {
    const jsonFile = './assets/Configurations/Configurations.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then(
        success => {
          ConfigurationManagerService.settings = <IConfigurations>JSON.parse(JSON.stringify(success));
          resolve();
        },
        error => {
          console.log("Logging:" + error);
          reject('Could not load configuration file');
        });
    });
  }
}

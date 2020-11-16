import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  getTableData() {
    return this.http.get(
      'https://bi.syncfusion.com/northwindservice/api/orders'
    );
  }
}

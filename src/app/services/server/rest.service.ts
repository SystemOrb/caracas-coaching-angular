import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private global: GlobalService, private _http: HttpClient) { }

  public GetInfoFormDB(operationType: string, courseId: number, routeFile: string) {
    let url = `${environment.REST}/${routeFile}.php`;
    url += `?operationType=${operationType}&course_id=${courseId}`;
    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.global.OpenSnackBar('Operación fallida, inténtelo más tarde');
        return new Observable<string | boolean>();
      })
    );
  }
}

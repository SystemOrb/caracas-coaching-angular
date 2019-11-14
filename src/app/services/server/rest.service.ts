import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MailerClass } from '../../classes/mailer.class';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private global: GlobalService, private _http: HttpClient) { }

  public GetInfoFormDB(operationType: string, courseId: number, routeFile: string) {
    let url = `https://api.caracascoaching.com/routes/${routeFile}.php`;
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
  // Add to cart with get param
  public WooCommerceAddToCart(product_id: string) {
    /*const url = `https://caracascoaching.com/cart?add-to-cart=${product_id}`;*/
    const param = new HttpParams();
    param.set('add-to-cart', product_id);
    const url = `https://caracascoaching.com/cart`;
    return this._http.jsonp(url, 'action').pipe(
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
  // Sendgrid
  public SendGrid(TicketMail: MailerClass, file: string) {
    const url = `./sendgrid/${file}.php`;
    const form = new FormData();
    form.append('name', TicketMail.name);
    form.append('email', TicketMail.email);
    form.append('phone', TicketMail.phone);
    form.append('company', TicketMail.company);
    form.append('task', TicketMail.task);
    form.append('msg', TicketMail.msg);
    form.append('course_id', TicketMail.course_ref);
    form.append('course_name', TicketMail.course_name);
    return this._http.post(url, form).pipe(
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

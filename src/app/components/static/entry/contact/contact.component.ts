import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { RestService } from '../../../../services/server/rest.service';
import { MailerClass } from '../../../../classes/mailer.class';
import { GlobalService } from '../../../../services/global/global.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public courseData: any;
  public defaultMsgText: string = '';
  public defaultCheckOption: string = '';
  public loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<ContactComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private rest: RestService,
              private global: GlobalService) {
                this.courseData = this.data;
              }

  ngOnInit() {
    console.log(this.courseData);
    // tslint:disable-next-line:max-line-length
    this.defaultMsgText = `Quiero más información del curso : Ref. ${this.courseData.seller.lp_ref} | ${this.courseData.description.post_title}`;

  }
  SendForm(formData: NgForm): void {
    if (formData.invalid) {
      throw new Error('Form invalid');
    }
    this.loading = true;
    const ticket = new MailerClass(`${formData.value.name} ${formData.value.lastname}`, formData.value.email,
    formData.value.phone, formData.value.company, formData.value.task, formData.value.msg, this.courseData.seller.lp_ref,
    this.courseData.description.post_title);
    this.rest.SendGrid(ticket, 'cegos').subscribe((data) => {
      if (data.status) {
        this.loading = false;
        formData.reset();
        this.global.OpenSnackBar('Gracias, nos pondremos en contacto contigo pronto!');
        this.dialogRef.close();
      } else {
        console.log(data);
      }
    });
  }
}

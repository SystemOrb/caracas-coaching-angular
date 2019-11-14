import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../services/server/rest.service';
import { CourseDataClass } from 'src/app/classes/course.class';
import { CourseMetaClass } from 'src/app/classes/course.meta.class';
import { CourseDataSellerClass } from 'src/app/classes/course.sell.class';
import { CourseCvClass } from '../../../classes/course.cv.class';
import { CourseCommentData } from '../../../classes/course.comment.class';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ContactComponent } from '../../static/entry/contact/contact.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public CourseId: string = '';
  public CourseDescription: CourseDataClass; // Descripción del curso
  public CourseMetaData: CourseMetaClass[] = []; // Meta data del curso
  public CourseModuleSell: CourseDataSellerClass = null; // Pestañas del curso
  public CourseFeatures: CourseMetaClass[] = [];
  public CoursesCV: CourseCvClass[] = []; // Modulos del curso [Contenido]
  public CoursesSimilars: any[] = []; // Cursos similares
  public CourseThumbnail: CourseDataClass; // Foto del curso
  public CourseComments: CourseCommentData[] = []; // Comentarios del curso
  public CourseTax: any = '';
  public stickyCourseBanner: boolean = false; // Si hace scroll muestra el banner superior
  public StickyOnTheFooter: boolean = false; // Si llega al final del footer, debemos eliminar el sticky del curso
  @HostListener('window:scroll', ['$event']) onScroll(event) {
    if (window.pageYOffset >= 1) {
      this.stickyCourseBanner = true;
    } else {
      this.stickyCourseBanner = false;
    }
    // Final de la pagina dinamica por dispositivo
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.StickyOnTheFooter = true;
    } else {
      this.StickyOnTheFooter = false;
    }
  }

  constructor(private param: ActivatedRoute, private _course: RestService,
              private route: Router, private dialog: MatDialog,
              private snackBar: MatSnackBar, private title: Title) {
    this.param.queryParams.subscribe((get) => {
      if (get.post !== '' && (get.post) !== null && (get.post) !== undefined && (get.post)) {
        this.CourseId = get.post;
      } else {
        throw new Error('No se proporciono, ningún curso');
      }
    });
  }

  async ngOnInit() {
    setTimeout(async () => {
      this.CourseDescription = await this.GetCourseDescription(); // Descripción del curso
      this.title.setTitle(`Cursos - ${this.CourseDescription.post_title}`);
      this.CourseMetaData = await this.GetCourseMetaData(); // Variables del curso
      this.CourseTax = await this.GetCurrentCourseTAX(); // Obtener info del valor del curso online
      this.CourseThumbnail = await this.GetThumbnail();
      this.CourseFeatures = await this.GetCourseFeatures(); // Caracteristicas del curso
      const ModuleSell = await this.GetCourseModuleSell(); // Modo de venta del curso
      if (ModuleSell !== null) {
        this.CourseModuleSell = ModuleSell[0];
      }
      // Módulos del curso
      if (await this.GetCourseModulesCV() !== null) {
        this.CoursesCV = await this.GetCourseModulesCV(); // Curriculum del curso
        this.CoursesCV = await this.GetChildLessons(); // Lecciones del curso
      }
      // Similares
      const courses = await this.GetSimilarCourses();
      if (courses !== null) {
        this.CoursesSimilars = courses;
      }
      // Comentarios
      const coments = await this.GetCourseComments();
      if (coments !== null) {
        this.CourseComments = coments;
      }
    }, 500);
  }

  GetCourseDescription(): Promise<CourseDataClass> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('getCourseDescription', Number(this.CourseId), 'courses')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.data[0]);
          } else {
            resolve(null);
          }
        });
    });
  }
  GetCourseMetaData(): Promise<CourseMetaClass[]> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('getCourseMeta', Number(this.CourseId), 'courses')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.data);
          } else {
            resolve(null);
          }
        });
    });
  }
  GetCourseModuleSell(): Promise<CourseDataSellerClass> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('getCourseModule', Number(this.CourseId), 'courses')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.data);
          } else {
            resolve(null);
          }
        });
    });
  }
  // Esto nos permitirá obtener la información vital para mostrar el cliente
  GetCourseFeatures(): Promise<CourseMetaClass[]> {
    return new Promise((resolve, reject) => {
      if (this.CourseMetaData.length >= 1) {
        const ArrayFeatures = new Array();
        // Como no toda la información debe ser mostrada, haremos un bucle y dentro del bucle distintos condicionales
        for (const Features of this.CourseMetaData) {
          switch (Features.meta_key) {
            case '_lp_duration':
              Features.icon = 'timer';
              Features.label = 'Duración del curso';
              ArrayFeatures.push(Features);
              break;
            case '_lp_students':
              Features.icon = 'people';
              Features.label = 'Estudiantes inscritos';
              ArrayFeatures.push(Features);
              break;
            case '_lp_max_students':
              Features.icon = 'person_outline';
              Features.label = 'Capacidad máxima de estudiantes';
              ArrayFeatures.push(Features);
              break;
            case 'thim_course_skill_level':
              Features.icon = 'emoji_objects';
              Features.label = 'Dificultad del curso';
              ArrayFeatures.push(Features);
              break;
            case 'thim_course_language':
              Features.icon = 'language';
              Features.label = 'Idioma';
              ArrayFeatures.push(Features);
              break;
            case 'thim_course_duration':
              Features.icon = 'edit';
              Features.label = 'Duración estimada por clase';
              ArrayFeatures.push(Features);
              break;
          }
        }
        resolve(ArrayFeatures);
      }
    });
  }
  // Para obtener los módulo que contiene el curso
  GetCourseModulesCV(): Promise<CourseCvClass[]> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('CourseCV', Number(this.CourseId), 'courses')
      .subscribe((data) => {
        if (data.status) {
          resolve(data.data);
        } else {
          resolve(null);
        }
      });
    });
  }
  // Para obtener información de los componentes hijos del modulo CV
  GetChildLessons(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const ArrayPost: any = new Array();
      for (const cv of this.CoursesCV) {
        this._course.GetInfoFormDB('GetLessons', cv.section_id, 'courses')
          .subscribe((data) => {
            if (data.status) {
              cv.child = data.data;
              ArrayPost.push(cv);
            }
          });
      }
      resolve(ArrayPost);
    });
  }
  // Cursos similares del mismo author
  GetSimilarCourses(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('GetSimilarCourses', Number(this.CourseDescription.post_author), 'courses')
      .subscribe(async (data) => {
        if (data.status) {
          // Ahora necesitamos sacar el precio, asi que hacemos un bucle y por cada post, le anexamos el precio al JSON
          for (const post of data.data) {
            const price: CourseMetaClass = await this.GetTaxCourse(post.post_id);
            if (price !== null) {
              // No es gratis
              post.price = price;
            } else {
              // Es gratis
              post.price = 'free';
            }
          }
          resolve(data.data);
        } else {
          resolve(null);
        }
      });
    });
  }
  // Sacar la información del precio deu n curso, si tiene descuento, si es gratis, etc
  GetTaxCourse(post_id: number): Promise<CourseMetaClass> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('GetCoursePriceGeneral', post_id, 'courses')
        .subscribe((PriceFee) => {
          // Necesitamso validar si tiene precio de descuento o no, si no tiene buscamos si tiene un precio unico, sino es gratis
          if (PriceFee.status) {
            // Entonces tiene descuento
            resolve(PriceFee.data[0]);
          } else {
            // Hacemos el match del precio unico
            this._course.GetInfoFormDB('CourseUniquePrice', post_id, 'courses')
              .subscribe((unique) => {
                if (unique.status) {
                  // Tiene el precio
                  resolve(unique.data[0]);
                } else {
                  // Es gratis
                  resolve(null);
                }
              });
          }
        });
    });
  }
  Navigate(url: string, post_id: number): void {
    this.route.navigate([`/courses/${url}`], {
      queryParams: {
        post: post_id
      },
    });
  }
  // Obtener la foto del encabezado del curso
  GetThumbnail(): Promise<CourseDataClass> {
    return new Promise((resolve, reject) => {
      // Verificamos el metadata del curso
      for (const meta of this.CourseMetaData) {
        if (meta.meta_key === '_thumbnail_id') {
          this._course.GetInfoFormDB('GetCurrentThumbnail', Number(meta.meta_value), 'courses')
          .subscribe((thumb) => {
            if (thumb.status) {
              // Tiene el precio
              resolve(thumb.data[0]);
              console.log(thumb.data[0]);
            } else {
              // Es gratis
              resolve(null);
            }
          });
        }
      }
    });
  }
  // Obtener los comentarios del curso
  GetCourseComments(): Promise<CourseCommentData[]> {
    return new Promise((resolve, reject) => {
      this._course.GetInfoFormDB('GetComments', Number(this.CourseId), 'courses')
      .subscribe((comments) => {
        if (comments.status) {
          // Tiene el precio
          resolve(comments.data);
        } else {
          // Es gratis
          resolve(null);
        }
      });
    });
  }
  GetCurrentCourseTAX(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Verificamos si el curso tiene descuento
      const item: any = {
        discount: null,
        price: null
      };
      for (const fee of this.CourseMetaData) {
        if (fee.meta_key === '_lp_sale_price') {
          item.discount = fee;
        }
        if (fee.meta_key === '_lp_price') {
          item.price = fee;
        } else {
          item.price = 'free';
        }
      }
      resolve(item);
    });
  }
  /*
  Popup donde enviará la información del formulario
  */
 openDialog(interest: string): void {
    const DialogRef = this.dialog.open(ContactComponent, {
      data: {
        description: this.CourseDescription,
        META: this.CourseMetaData,
        seller: this.CourseModuleSell,
        tax: this.CourseTax,
        interest
      },
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      disableClose: true,
      autoFocus: false
    });
    // Verificamos si envio o no el formulario
    DialogRef.afterClosed().subscribe(
      (data) => {
        if (data.role === 'send') {
          this.snackBar.open('Gracias por ponerte en contacto con nosotros, en breve serás atendido', null, {
            duration: 8000
          });
        }
      }
    );
  }
  /*
  Buy course
  */
 BuyCourseOnline(): void {
    location.href = `https://caracascoaching.com/checkout?add-to-cart=${Number(this.CourseDescription.ID)}`;
  }
 }

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
    { path: 'courses/:course', component: CourseComponent },
    { path: 'contact', component: ContactComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

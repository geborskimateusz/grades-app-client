import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './shared/errors/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { ProjectInfoComponent } from './project-info/project-info.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'welcome'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'about', component: ProjectInfoComponent},
  {path: 'student', loadChildren: './student/student.module#StudentModule', canLoad: [AuthGuard]},
  {path: '**', redirectTo: '404'},
  {path: '404', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

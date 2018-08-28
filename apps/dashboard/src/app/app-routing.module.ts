import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { PomosComponent } from './pomos/pomos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'pomos', component: PomosComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}

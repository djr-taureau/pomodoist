import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonDataModule } from '@workspace/common-data';
import { TotalsViewModule } from '@workspace/totals-view';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TasksTotalComponent } from './tasks/tasks-total/tasks-total.component';
import { TasksComponent } from './tasks/tasks.component';
import { PomoDetailComponent } from './pomos/pomo-detail/pomo-detail.component';
import { PomosListComponent } from './pomos/pomos-list/pomos-list.component';
import { PomosTotalComponent } from './pomos/pomos-total/pomos-total.component';
import { PomosComponent } from './pomos/pomos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    TasksListComponent,
    TaskDetailComponent,
    TasksTotalComponent,
    PomosComponent,
    PomoDetailComponent,
    PomosListComponent,
    PomosTotalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppMaterialModule,
    CommonDataModule,
    TotalsViewModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

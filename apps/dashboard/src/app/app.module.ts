import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonDataModule } from '@workspace/common-data';
import { TotalsViewModule } from '@workspace/totals-view';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DraggableDirective } from './shared/directives/draggable/draggable.directive';
import { DraggableHelperDirective } from './shared/directives/draggable/draggable-helper.directive';
import { MinuteSecondsPipe } from './shared/pipes/timer-pipe';
import { TotalTimePipe } from './shared/pipes/total-time.pipe';
import { DroppableService } from './shared/directives/droppable/droppable.service';
import { DropZoneDirective } from './shared/directives/droppable/drop-zone.directive';
import { DroppableDirective } from './shared/directives/droppable/droppable.directive';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TasksPomosListComponent } from './tasks/tasks-pomos-list/tasks-pomos-list.component';
import { TasksTotalComponent } from './tasks/tasks-total/tasks-total.component';
import { TasksComponent } from './tasks/tasks.component';
import { BoardComponent } from './task-board/board.component';
import { TaskBoardComponent } from './task-board/task-board.component';


@NgModule({
  declarations: [
    AppComponent,
    DraggableDirective,
    DraggableHelperDirective,
    DroppableDirective,
    DropZoneDirective,
    HomeComponent,
    TasksComponent,
    TasksListComponent,
    TasksPomosListComponent,
    TaskDetailComponent,
    TasksTotalComponent,
    BoardComponent,
    TaskBoardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    OverlayModule,
    FormsModule,
    AppRoutingModule,
    AppMaterialModule,
    CommonDataModule,
    TotalsViewModule
  ],
  providers: [DroppableService, MinuteSecondsPipe, TotalTimePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

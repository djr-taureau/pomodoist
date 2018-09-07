
import { Component, ChangeDetectorRef, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '@workspace/common-data';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDrop,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { DroppableEvent } from '../shared/directives/droppable/droppable.service'
@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.scss']
})
export class TaskBoardComponent implements OnInit {

  @Input() tasks: Task[];
  backlogTasks: Task[];
  workingTasks: Task[];
  doneTasks: Task[];

  dropZones: any[] = [
    { id: 'zone-1', title: 'backlog', items: [] },
    { id: 'zone-2', title: 'working', items: [] },
    { id: 'zone-3', title: 'done', items: [] },
  ];



  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(){
    console.log(this.tasks);
    this.backlogTasks = this.tasks;
    console.log('backlog tasks', this.backlogTasks);
  }

  dropped(event: DroppableEvent, zone: any): void {
    zone.items.push(event.data);
    event.data.selected = true;
  }

  // onDrop(event: CdkDragDrop<object[]>) {
  //   moveItemInArray(this.backlogTasks, event.previousIndex, event.currentIndex);
  // }

  // isAllowed = (drag?: CdkDrag, drop?: CdkDrop) => {
  //   return false;
  // };

  // addToList(event: CdkDragDrop<object[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }
}


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
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  @Input() tasks: Task[];

  backlogTasks: Task[];
  workingTasks: Task[];
  doneTasks: Task[];



  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(){
    console.log(this.tasks);
    this.backlogTasks = this.tasks;
    // console.log('backlog tasks', this.backlogTasks);
  }



  onDrop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  isAllowed = (drag?: CdkDrag, drop?: CdkDrop) => {
    return true;
  };

  addToList(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

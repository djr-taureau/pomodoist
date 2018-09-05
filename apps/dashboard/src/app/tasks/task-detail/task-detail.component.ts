import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, Pomo } from '@workspace/common-data';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  originalContent: string;
  selectedTask: Task;

  @Input() taskPomos: Pomo[];
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set task(value: Task) {
    if (value) { this.originalContent = value.content; }
    this.selectedTask = Object.assign({}, value);
  }
}

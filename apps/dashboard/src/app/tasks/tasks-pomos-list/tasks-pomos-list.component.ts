import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pomo, Task } from '@workspace/common-data';

@Component({
  selector: 'app-tasks-pomos-list',
  templateUrl: './tasks-pomos-list.component.html',
  styleUrls: ['./tasks-pomos-list.component.css']
})
export class TasksPomosListComponent {
  selectedTask: Task;
  @Input() set task(value: Task) {
    this.selectedTask = Object.assign({}, value);
  }
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}

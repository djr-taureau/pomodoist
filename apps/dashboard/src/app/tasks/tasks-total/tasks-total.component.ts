import { Component, Input, OnInit } from '@angular/core';
import { Task } from '@workspace/common-data';

@Component({
  selector: 'app-tasks-total',
  templateUrl: './tasks-total.component.html',
  styleUrls: ['./tasks-total.component.css']
})
export class TasksTotalComponent implements OnInit {
  @Input() tasks: Task;

  constructor() { }

  ngOnInit() {
  }

}

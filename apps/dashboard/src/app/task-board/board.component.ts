import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TasksFacade } from '@workspace/common-data';

@Component({
  selector: 'app-board',
  template: `
    <app-task-board [tasks]="tasks$ | async"></app-task-board>
  `,
})
export class BoardComponent implements OnInit {
  tasks$: Observable<Task[]> = this.tasksFacade.allTasks$;

  currentTask$: Observable<Task> = this.tasksFacade.currentTask$;

  constructor(private tasksFacade: TasksFacade) { }

  ngOnInit() {
    this.tasksFacade.loadAll();
    this.tasksFacade.mutations$.subscribe(_ => this.resetCurrentTask());
    this.resetCurrentTask();
  }

  resetCurrentTask() {
    // this.selectTask({id: null});
  }

}

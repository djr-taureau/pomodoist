import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TasksFacade } from '@workspace/common-data';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]> = this.tasksFacade.allTasks$;
  currentTask$: Observable<Task> = this.tasksFacade.currentTask$;

  constructor(private tasksFacade: TasksFacade,) { }

  ngOnInit() {
    this.tasksFacade.loadAll();
    this.tasksFacade.mutations$.subscribe(_ => this.resetCurrentTask());
    this.resetCurrentTask();
  }

  resetCurrentTask() {
    this.selectTask({id: null});
  }

  selectTask(task) {
    this.tasksFacade.selectTask(task.id);
  }

  saveTask(task) {
    if (!task.id) {
      this.tasksFacade.addTask(Task);
    } else {
      this.tasksFacade.updateTask(Task);
    }
  }

  deleteTask(task) {
    this.tasksFacade.deleteTask(Task);
  }
}

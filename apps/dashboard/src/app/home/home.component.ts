import { Component, OnInit } from '@angular/core';
import { Task, TasksFacade, User, UsersFacade, Pomo, PomosFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  users$: Observable<User[]> = this.usersFacade.allUsers$;

  constructor(
    private usersFacade: UsersFacade,
    private tasksFacade: TasksFacade,
    private pomosFacade: PomosFacade
  ) {}

  ngOnInit() {
    this.tasksFacade.loadAll();
    this.pomosFacade.loadAll();
    this.usersFacade.loadUsers();
  }
}

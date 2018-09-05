import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pomodoist v2';
  links = [
    { path: '/home', icon: 'home', label: 'Home'},
    { path: '/tasks', icon: 'list', label: 'Tasks'},
    { path: '/dash', icon: 'view_quilt', label: 'Dashboard'}
  ];
}

import { Component, Input, OnInit } from '@angular/core';
import { Pomo } from '@workspace/common-data';

@Component({
  selector: 'app-pomos-total',
  templateUrl: './pomos-total.component.html',
  styleUrls: ['./pomos-total.component.css']
})
export class PomosTotalComponent implements OnInit {
  @Input() pomos: Pomo[];

  constructor() { }

  ngOnInit() {
  }

}

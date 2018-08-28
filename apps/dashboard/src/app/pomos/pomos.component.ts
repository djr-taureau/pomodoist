import { Component, OnInit } from '@angular/core';
import { Pomo, PomosFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pomos',
  templateUrl: './Pomos.component.html',
  styleUrls: ['./Pomos.component.css']
})
export class PomosComponent implements OnInit {
  pomos$: Observable<Pomo[]> = this.pomosFacade.allPomos$;
  currentPomo$: Observable<Pomo> = this.pomosFacade.currentPomo$;

  constructor(private pomosFacade: PomosFacade) { }

  ngOnInit() {
    this.pomosFacade.loadAll();
    this.pomosFacade.mutations$.subscribe(_ => this.reset());
    this.reset();
  }

  reset() {
    this.selectPomo({id: null});
  }

  selectPomo(pomo) {
    this.pomosFacade.selectPomo(pomo.id);
  }

  savePomo(pomo) {
    if (!pomo.id) {
      this.pomosFacade.addPomo(pomo);
    } else {
      this.pomosFacade.updatePomo(pomo);
    }
  }

  deletePomo(pomo) {
    this.pomosFacade.deletePomo(pomo);
  }
}

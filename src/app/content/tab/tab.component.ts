import { Component, OnInit, Input } from '@angular/core';

import { mainContent } from 'src/app/shared/mainAnimations.';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: mainContent,
})
export class TabComponent implements OnInit {
  state = window.history.state;
  constructor() {}

  ngOnInit(): void {}
}

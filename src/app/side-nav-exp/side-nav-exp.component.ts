import { Component, OnInit, Input } from '@angular/core';

import { mainAnimations } from '../mainAnimations.';

@Component({
  selector: 'app-side-nav-exp',
  templateUrl: './side-nav-exp.component.html',
  styleUrls: ['./side-nav-exp.component.scss'],
  animations: mainAnimations,
})
export class SideNavExpComponent implements OnInit {
  @Input() show: boolean;

  constructor() {}

  ngOnInit(): void {}
}

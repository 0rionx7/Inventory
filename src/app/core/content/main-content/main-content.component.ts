import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { mainContent } from 'src/app/core/mainAnimations.';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  animations: mainContent,
})
export class MainContentComponent implements OnInit {
  $number = this.route.data;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}

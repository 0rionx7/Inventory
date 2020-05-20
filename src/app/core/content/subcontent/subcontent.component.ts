import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcontent',
  templateUrl: './subcontent.component.html',
  styleUrls: ['./subcontent.component.scss'],
})
export class SubcontentComponent implements OnInit {
  data = window.history.state;
  constructor() {}

  ngOnInit(): void {}
}

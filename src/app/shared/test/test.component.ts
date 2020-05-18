import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  show = false;
  constructor() {}

  ngOnInit(): void {}
  onClick(): void {
    console.log('sdfsf');
  }
}

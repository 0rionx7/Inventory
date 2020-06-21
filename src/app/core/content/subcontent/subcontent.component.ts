import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { Dropdown2Directive } from '@inventory-app/core/dropdown2.directive';

@Component({
  selector: 'app-subcontent',
  templateUrl: './subcontent.component.html',
  styleUrls: ['./subcontent.component.scss'],
})
export class SubcontentComponent implements OnInit {
  @ViewChild(CdkCopyToClipboard, { static: true }) clb: CdkCopyToClipboard;
  data = window.history.state;
  code = 'alelamachine';

  constructor() {}

  ngOnInit(): void {
    this.clb.copied.subscribe(console.log);
    navigator.geolocation.getCurrentPosition((x) => {
      console.log({
        lat: x.coords.latitude,
        lng: x.coords.longitude,
      });
    });
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _toggleExpantion = new Subject<boolean>();
  constructor() {}
}

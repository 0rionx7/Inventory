import { trigger, style, transition, animate } from '@angular/animations';

export const sidenavAnimations = [
  trigger('subMenus', [
    transition(':enter', [style({ height: 0 }), animate('0.3s ease-in')]),
    transition(':leave', [animate('0.3s ease-in', style({ height: 0 }))]),
  ]),
];

export const mainContent = [
  trigger('mainContent', [
    transition(':enter', [style({ opacity: 0 }), animate('0.3s ease-in')]),
    // transition(':leave', [animate('0.3s ease-in', style({ opacity: 0 }))]),
  ]),
];

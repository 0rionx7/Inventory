import {
  trigger,
  state,
  style,
  transition,
  query,
  animateChild,
  animate,
  group,
} from '@angular/animations';

export const sidenavAnimations = [
  trigger('expandSidenav', [
    state(
      'true',
      style({
        width: '255px',
      })
    ),
    transition('false <=> true', [
      group([
        query('@subMenus', animateChild(), { optional: true }),
        animate('0.3s ease-in-out'),
      ]),
    ]),
  ]),
  trigger('subMenus', [
    transition(':enter', [style({ height: 0 }), animate('0.3s ease-in')]),
    transition(':leave', [animate('0.3s ease-in', style({ height: 0 }))]),
  ]),
  trigger('subArrow', [
    state(
      'false',
      style({
        transform: 'translateX(0)',
      })
    ),
    state(
      'true',
      style({
        transform: 'rotate(90deg)',
      })
    ),
    transition('true <=> false', [animate('0.3s')]),
  ]),
];

export const mainContent = [
  trigger('mainContent', [
    transition(':enter', [style({ opacity: 0 }), animate('0.3s ease-in')]),
    // transition(':leave', [animate('0.3s ease-in', style({ opacity: 0 }))]),
  ]),
];

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
      'false',
      style({
        width: '0px',
      })
    ),
    state(
      'true',
      style({
        width: '255px',
      })
    ),
    transition('false <=> true', [
      group([
        query('@contentVisibility', animateChild()),
        animate('0.3s ease-in-out'),
      ]),
    ]),
  ]),
  trigger('contentVisibility', [
    state(
      'false',
      style({
        opacity: 0,
      })
    ),
    state(
      'true',
      style({
        opacity: 1,
      })
    ),
    transition('false <=> true', animate('0.3s')),
  ]),
];

export const toggleArrowAnimations = [
  trigger('toggleArrow', [
    state(
      'right',
      style({
        transform: 'translateX(0)',
        margin: '8px',
      })
    ),
    state(
      'left',
      style({
        transform: 'rotate(180deg)',
        margin: '8px',
      })
    ),
    transition('left <=> right', [animate('{{ ale }}s')], {
      params: { ale: 1 },
    }),
  ]),
];
export const mainContent = [
  trigger('expandSidenav', [
    state(
      'false',
      style({
        paddingLeft: '54px',
      })
    ),
    state(
      'true',
      style({
        paddingLeft: '309px',
      })
    ),
    transition('false <=> true', [
      group([
        query('@mainContent', animateChild(), { optional: true }),
        animate('0.3s ease-in-out'),
      ]),
    ]),
  ]),
  trigger('mainContent', [
    transition(':enter', [style({ opacity: 0 }), animate('0.6s ease-in')]),
    transition(':leave', [animate('0.3s ease-in', style({ opacity: 0 }))]),
  ]),
];
export const subContent = [
  trigger('subContent', [
    transition(':enter', [style({ height: 0 }), animate('0.3s ease-in')]),
    transition(':leave', [animate('0.3s ease-in', style({ height: 0 }))]),
  ]),
  trigger('subArrow', [
    state(
      'right',
      style({
        transform: 'translateX(0)',
      })
    ),
    state(
      'down',
      style({
        transform: 'rotate(90deg)',
      })
    ),
    transition('down <=> right', [animate('0.3s')]),
  ]),
];

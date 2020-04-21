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
        padding: '0 13px 0 13px',
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
        transform: 'translateX(240px) rotate(180deg)',
        margin: '8px',
      })
    ),
    transition('left <=> right', animate('0.3s')),
  ]),
];

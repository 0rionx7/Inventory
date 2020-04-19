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

export const mainAnimations = [
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
        padding: '0 0 0 13px',
      })
    ),
    transition('false <=> true', animate('0.3s')),
  ]),
];

import { animate, state, style, transition, trigger } from '@angular/animations';

export const nodeToggle = trigger('expand', [
  state('true', style({ height: '*' })),
  state('false', style({ height: 0 })),
  transition('* => *', animate('250ms ease-in-out'))
]);

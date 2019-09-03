import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const expandTableRowTrigger = trigger('detailExpand', [
  state('collapsed', style({ height: '0px', minHeight: '0', display: 'none', opacity:'0.2' })),
  state('expanded', style({ height: '*' })),
  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);

export const horizontalFadeInTrigger = trigger('horizontalFadeState', [
  transition(':enter',
    animate('250ms ease-out', keyframes([
      style({
        opacity: 0,
        offset: 0
      }),
      style({
        opacity: 0.5,
        offset: 0.7,
      }),
      style({
        opacity: 1,
        offset: 1,
      })
    ])))
]);

export const verticalFadeInTrigger = trigger('verticalFadeState', [
  transition('* <=> *',
    animate('1200ms ease-out', keyframes([
      style({
        opacity: 0,
        offset: 0,
        transform: 'translateY(-10px)'
      }),
      style({
        opacity: 0.5,
        offset: 0.7,
        transform: 'translateY(-5px)'
      }),
      style({
        opacity: 1,
        offset: 1,
        transform: 'translateY(-1px)'
      })
    ])))
]);

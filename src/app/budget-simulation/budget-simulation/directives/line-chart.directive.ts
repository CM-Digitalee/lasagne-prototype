import { Directive, ElementRef, Inject, Input, LOCALE_ID, NgZone } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { ChartAPI, Data, generate } from 'c3';

import { AmountPipe } from 'src/app/shared';

@Directive({
  selector: '[lineChart]'
})
export class LineChartDirective {
  @Input('lineChart') set data(data: Pick<Data, 'columns' | 'regions' | 'colors'>) {
    if (data) {
      asyncScheduler.schedule(() => {
        this.zone.runOutsideAngular(() => {
          if (!this.chart) {
            this.chart = generate({
              bindto: this.elt.nativeElement,
              data,
              tooltip: { format: { value: value => this.amountPipe.transform(value, '', '', '1.0-0') } },
              axis: {
                x: {
                  tick: { culling: false },
                  padding: { left: 0 }
                },
                y: {
                  tick: { format: value => this.amountPipe.transform(value, '', '', '1.0-0') },
                  padding: { bottom: 0 }
                }
              }
            });
          }
          // @ts-ignore:disable-next-line
          this.chart.load(data);
        });
      });
    }
  }

  private chart: ChartAPI;
  private amountPipe = new AmountPipe(this.locale);

  constructor(private elt: ElementRef, private zone: NgZone, @Inject(LOCALE_ID) private locale) { }
}

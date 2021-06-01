import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  colors = {
    buttercup: '#F0B90B',
    'mountain-meadow': '#0ECB81',
    'brick-red': '#CF304A',
    'buddha-gold': '#C99400',
    mako: '#474D57',
    shark: '#1E2329',
    saffron: '#F8D12F',
    raven: '#707A8A',
    'regent-gray': '#848e9ce6',
    bunker: '#0B0E11',
    'ebony-cla': '#212833',
    alabaster: '#FAFAFA',
    mischka: '#D8DCE1',
    black: '#000000',
  };

  transform(value: string): string {
    // @ts-ignore
    return this.colors[value] || value;
  }

}

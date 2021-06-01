import { Pipe, PipeTransform } from '@angular/core';

import { ToastrType } from '../../core/models/toastr';

@Pipe({
  name: 'toastrColor'
})
export class ToastrColorPipe implements PipeTransform {

  transform(type: ToastrType, field: any): string {
    let data = {
      bg: '',
      image: '',
      icon: '',
    };
    if (type === ToastrType.Success) {
      data = {
        bg: 'alert-success bg-color-blue-romance',
        image: 'assets/icons/toastr/check.svg',
        icon: 'jewel',
      };
    } else if (type === ToastrType.Info) {
      data = {
        bg: 'alert-info bg-color-humming-bird',
        image: 'assets/icons/toastr/help.svg',
        icon: 'atoll',
      };
    } else if (type === ToastrType.Warning) {
      data = {
        bg: 'alert-warning bg-color-peach',
        image: 'assets/icons/toastr/question.svg',
        icon: 'tangerine',
      };
    } else if (type === ToastrType.Danger) {
      data = {
        bg: 'alert-danger bg-color-cosmos',
        image: 'assets/icons/toastr/danger.svg',
        icon: 'merlot',
      };
    }
    // @ts-ignore
    return data[field];
  }

}

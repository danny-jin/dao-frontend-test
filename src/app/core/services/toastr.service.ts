import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Toastr, ToastrType } from '../models/toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  sendToastr$: Subject<Toastr> = new Subject<Toastr>();

  constructor(
  ) { }

  show(type: ToastrType, text: string, title?: string): void {
    this.sendToastr$.next({type, title, text});
  }

  success(text: string, title?: string): void {
    this.sendToastr$.next({type: ToastrType.Success, title, text});
  }

  info(text: string, title?: string): void {
    this.sendToastr$.next({type: ToastrType.Info, title, text});
  }

  warning(text: string, title?: string): void {
    this.sendToastr$.next({type: ToastrType.Warning, title, text});
  }

  danger(text: string, title?: string): void {
    this.sendToastr$.next({type: ToastrType.Danger, title, text});
  }

  error(error: any, custom: string): void {
    if (error && error.error && error.message && typeof error.error.message === 'string') {
      this.danger(error.error.message);
    } else if (error && error.error && error.message && typeof error.error.message === 'object') {
      let messages = error.error.message;
      if (error.status === 400 && messages.length) {
        messages = messages.map((x: string) => `<li>${x}</li>`);
        this.danger(`<ul class="mb-0 pl-20 mt-10 pb-0">${messages.join('')}</ul>`, 'Warning');
      } else {
        this.danger('Bad request. Please try again or call customer support', 'Warning');
      }
    } else if (error && error.message && typeof error.message === 'string') {
      this.danger(error.message);
    } else {
      this.danger(custom);
    }
  }
}

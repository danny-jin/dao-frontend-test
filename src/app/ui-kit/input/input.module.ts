import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  declarations: [
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TextInputComponent,
  ]
})
export class InputModule {
}

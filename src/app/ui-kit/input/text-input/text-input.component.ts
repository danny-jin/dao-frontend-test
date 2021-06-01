import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  // @ts-ignore
  @Input() value;
  // @ts-ignore
  @Input() min;
  // @ts-ignore
  @Input() readonly;

  // @ts-ignore
  onChange;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  change(value: any): void {
    if (this.type === 'number') {
      value = +value;
    }
    // only when change method registered
    if (this.onChange) {
      this.onChange(value);
    }
  }
}

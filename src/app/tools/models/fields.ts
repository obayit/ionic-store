import { FormControl, Validators } from '@angular/forms';

export class Field{
    key: string;
    label: string;
    value: any;
    type: string;
    required = false;
    getControl(){
      let res = this.required ? new FormControlField(this.value || '', Validators.required)
        : new FormControlField(this.value || '');
      res.modelField = this;
    }
}
export class CharField extends Field{
    value: string;
    type = 'text';
}

declare module '@angular/forms' {
  interface AbstractControl {
    modelField: Field;
  }

}

export class FormControlField extends FormControl {
  public modelField: Field;

  constructor(...args) {
    super(...args);
  }
}
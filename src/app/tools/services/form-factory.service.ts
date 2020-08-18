import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field } from 'src/app/tools/models/fields';

@Injectable({
  providedIn: 'root'
})
export class FormFactoryService {

  constructor() { }
  generate(model: any) {
    const group: any = {};
    for(let key of Object.keys(model)){
      if(model[key] instanceof Field){
        const field = model[key] as Field;
        group[field.key] = field.getControl();
      }
    }
    return new FormGroup(group);
  }
}

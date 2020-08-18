import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharField } from 'src/app/tools/models/fields';

@Component({
  selector: 'app-char-input',
  templateUrl: './char-input.component.html',
  styleUrls: ['./char-input.component.scss'],
})
export class CharInputComponent implements OnInit {
  @Input() field: CharField;
  @Input() form: FormGroup;

  constructor() { }

  get isValid() { return this.form.controls[this.field.key].valid; }

  ngOnInit() {}

}

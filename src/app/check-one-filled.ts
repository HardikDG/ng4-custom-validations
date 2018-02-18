import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export class MyValidatores {

  public static oneFilledOutValidator(group: FormGroup): { [key: string]: boolean } {

    const empty = Object.values(group.value)
      .filter(i => !i || !i.length);
      
      // console.log(empty.length,Object.keys(group.value).length )
    return (empty.length != Object.keys(group.value).length) && empty.length != 0  ? {
      oneFilledOut: true
    } : null;
  };

  public static noWhitespaceValidator(control: AbstractControl): { [key: string]: any } {

    let result = (control.value).trim().length === 0 && control.value != '';
    // console.log(control.value);
    return result ? { 'whitespace': 'value is only whitespace' } : null

  }
}
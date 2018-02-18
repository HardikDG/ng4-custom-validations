import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, Validators } from '@angular/forms';
import { MyValidatores } from './check-one-filled';

import { CreditCardValidator } from 'ngx-credit-cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl(),
      'birthYear': new FormControl(),
      'address': new FormGroup({
        'address1': new FormControl('',MyValidatores.noWhitespaceValidator),
        'city': new FormControl('',MyValidatores.noWhitespaceValidator),
        'state': new FormControl('',MyValidatores.noWhitespaceValidator),
        'zip': new FormControl('',MyValidatores.noWhitespaceValidator),
      }, { validators: MyValidatores.oneFilledOutValidator }),
      'card': new FormGroup({
        'cardNumber': new FormControl('',MyValidatores.noWhitespaceValidator),
        'expiry': new FormControl('',MyValidatores.noWhitespaceValidator),
        'cvv': new FormControl('',MyValidatores.noWhitespaceValidator),
      }, { validators: MyValidatores.oneFilledOutValidator })
    });
  }

  updateValidation(){
    if(this.myForm.status == "VALID" && this.myForm.get('card').get('cardNumber').value.length > 0){
      this.myForm.get('card').get('cardNumber').setValidators([CreditCardValidator.validateCardNumber]);
      this.myForm.get('card').get('cardNumber').updateValueAndValidity();
      this.myForm.get('card').get('expiry').setValidators([CreditCardValidator.validateCardExpiry]);
      this.myForm.get('card').get('expiry').updateValueAndValidity();
      this.myForm.get('card').get('cvv').setValidators([CreditCardValidator.validateCardCvc]);
      this.myForm.get('card').get('cvv').updateValueAndValidity();
    }

    if(this.myForm.status == "INVALID" && this.myForm.get('card').get('cardNumber').value.length == 0 && this.myForm.get('card').get('expiry').value.length == 0 && this.myForm.get('card').get('cvv').value.length == 0){
      this.myForm.get('card').get('cardNumber').clearValidators();
      this.myForm.get('card').get('cardNumber').updateValueAndValidity();
      this.myForm.get('card').get('expiry').clearValidators();;
      this.myForm.get('card').get('expiry').updateValueAndValidity();
      this.myForm.get('card').get('cvv').clearValidators();;
      this.myForm.get('card').get('cvv').updateValueAndValidity();
    }
  }

  register(myForm: NgForm) {
    if(this.myForm.status == "VALID"){
      console.log('Registration successful.');
    console.log(myForm.value);
    }
  }
}

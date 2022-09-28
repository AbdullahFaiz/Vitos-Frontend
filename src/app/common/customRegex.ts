import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";


const allCharacters = [];

export const capitalRegexValidator = Validators.pattern('^([A-Z]*[A-Z]){3}$');  
export const minimum3ValueValidator = Validators.minLength(3);  
export const maximum3ValueValidator = Validators.maxLength(3); 
export const maximum15ValueValidator = Validators.maxLength(15); 
export const nameValidator = Validators.pattern('^[a-zA-Z0-9& ]*[a-zA-Z0-9&]$');

export const fullNameValidator = Validators.pattern('^[a-zA-Z ]*[a-zA-Z]$');
export const accountNoValidator = Validators.pattern('^\.?[0-9]{5,14}$');
export const phoneValidator = Validators.pattern('[- +()0-9]+');
export const phoneCode = Validators.pattern('[- +][0-9]+');
export const contactNo = Validators.pattern('^[0-9]{9}$');  
// export const contactNoLKR = Validators.pattern('^[0-9]{9}$');  
export const contactNoLKR = Validators.pattern('^[7][0-9]{8}$');  
export const interestRatePattern = Validators.pattern('[0-1]?[0-9]?[0-9]?');  
export const checkWhiteSpace = Validators.pattern('^\w+( +\w+)*$');  
export const nicOldAndNewValidator = Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{15})$');
export const nicValidator = Validators.pattern('^[0-9]{13}$');
export const lankanNicValidator = Validators.pattern('^([0-9]{9}[x|X|v|V]|[0-9]{12})$');
export const numbersOnlyValidator = Validators.pattern('^[0-9\.,]+$');

export const emailValidator = Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}


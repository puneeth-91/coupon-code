import { FormControl } from '@angular/forms';

export class CustomValidators {
  // Custom Select Drop Down validator.
  static SelectDropdownValidator(emptyValue: string) {
    return (group: FormControl): { [key: string]: any } | null => {
      if (group.value != emptyValue) {
        return null;
      } else {
        return { 'required': true };
      }
    };
  }

  // Custom Comapre Text with some value validator.
  static CompareTextValidator(textToCompare: string) {
    return (group: FormControl): { [key: string]: any } | null => {
      if (!group.value || (group.value.toLowerCase() === textToCompare.toLowerCase())) {
        return null;
      } else {
        return { 'textmismatch': true };
      }
    };
  }

  // Custom white space validator.
  static NoWhitespaceValidator() {
    return (group: FormControl): { [key: string]: any } | null => {
      const isWhitespace = (group.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      if (!group.value || isValid) {
        return null;
      } else {
        return { 'whitespace': true };
      }
    };
  }
}

import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationManagerService } from './configuration-manager.service';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {

  constructor(private datePipe: DatePipe, private memberService: MemberService, public router: Router) { }

  // Scroll to error & Cursor Focus to element passed in 'Id' as parameter in form when Submit is clicked.
  scrollToError(id: string): void {
    if (id && id != undefined) {
      let formField = document.getElementById(id);
      if (formField && formField != undefined) {
        formField.focus();
        formField.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
      else {
        this.ScrollToTop();
      }
    }
  }

  // Marks all controls in a form group as touched which has errors
  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl.errors) {
        abstractControl.markAsTouched();
      }

      if (abstractControl instanceof FormGroup) {
        this.markFormGroupTouched(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            if (control.errors) {
              control.markAsTouched();
            }
            this.markFormGroupTouched(control);
          }
        }
      }
    });
  }

  // Marks all controls in a form group as not touched.
  markFormGroupUnTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      abstractControl.markAsUntouched();
      abstractControl.markAsPristine();

      if (abstractControl instanceof FormGroup) {
        this.markFormGroupTouched(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            control.markAsUntouched();
            control.markAsPristine();
            this.markFormGroupUnTouched(control);
          }
        }
      }
    });
  }

  // Remove all Validators to the form group passed in as parameter.
  ClearAllValidatorsInFormGroup(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      abstractControl.clearValidators();
      abstractControl.updateValueAndValidity();

      if (abstractControl instanceof FormGroup) {
        this.ClearAllValidatorsInFormGroup(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            control.clearValidators();
            control.updateValueAndValidity();
            this.ClearAllValidatorsInFormGroup(control);
          }
        }
      }
    });
  }

  // Update Value and validity to the form group passed in as parameter.
  UpdateValueAndValidityInFormGroup(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      abstractControl.updateValueAndValidity();

      if (abstractControl instanceof FormGroup) {
        this.UpdateValueAndValidityInFormGroup(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            control.updateValueAndValidity();
            this.UpdateValueAndValidityInFormGroup(control);
          }
        }
      }
    });
  }

  // Scroll to top of document body
  ScrollToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Calculate & return Coverage Effective Date .
  // If date between 1 and 20(i.e End of Month date) then return 1st of next month
  // If date greater than 20(i.e End of Month date) then return 1st of next of next month
  // Example: Member signs up between 7/1 and 7/20 effective date would be 8/1.
  // Member signs up between 7/21 and EOM, effective date would be 9/1.
  GetCoverageEffectiveDate(): string {
    let today: Date = new Date();
    let nextMonthFirst: Date = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    let endOfMonthDate: number = ConfigurationManagerService.settings.EndOfMonthDate;
    if (today.getDate() <= endOfMonthDate) {
      return this.datePipe.transform(nextMonthFirst, 'MM/dd/yyyy');
    }
    else {
      let afterNextMonth: Date = new Date(nextMonthFirst.getFullYear(), nextMonthFirst.getMonth() + 1, 1);
      return this.datePipe.transform(afterNextMonth, 'MM/dd/yyyy');
    }
  }

  // On Tab press of last element in modal, focus to 1st element provided in id parameter.
  FocusToFirstElementInModal(event: Event, id: string) {
    event.preventDefault();
    var el = document.getElementById(id);
    el.focus();
  }

  // Validate for valid dob and format
  isDateValid(value): boolean {
    let date = new Date(value);
    if (date.toString() != "Invalid Date") {
      let formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      return value == formattedDate;
    }
    return false;
  }

  // Go To Home page, passing agent code as query string if present.
  GoToHomePage() {
    let agentCode: string = this.memberService.GetAgentCodeResponse(); // Get AgentCode from form data model.
    if (agentCode != undefined && agentCode) {
      this.router.navigate([''], { queryParams: { agentcode: agentCode } });
    }
    else {
      this.router.navigate(['']);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private forms = new Map<string, BehaviorSubject<FormGroup | null>>();

  // Get the observable for a specific form
  getFormGroup$(formKey: string) {
    if (!this.forms.has(formKey)) {
      this.forms.set(formKey, new BehaviorSubject<FormGroup | null>(null));
    }
    return this.forms.get(formKey)!.asObservable();
  }

  // Set the form group for a specific form
  setFormGroup(formKey: string, formGroup: FormGroup) {
    if (!this.forms.has(formKey)) {
      this.forms.set(formKey, new BehaviorSubject<FormGroup | null>(formGroup));
    }
    this.forms.get(formKey)!.next(formGroup);
  }
}

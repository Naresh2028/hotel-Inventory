import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidator {

  //Name validation
  static validateName(control: AbstractControl) {
    const value = control.value as string;

    if (value.includes('test')) {
      return {
        invalidName: true,
      };
    } 
    return null;
  }

  //Special character validation
  static ValidateSpecialChar(char:string){
    return (control:AbstractControl) => {
        const value = control.value as string;

        if(value.includes(char)){
            return{
                invalidSpecialChar:true
            };
        }
        return null;
    }
  }

  //Validate date functinality
  static validatedate(control:FormGroup){
    const checkinDate : any = new Date( control.get('checkinDate')?.value);
    const checkOutDate : any = new Date(control.get('checkoutDate')?.value);

    const diffTime = checkOutDate - checkinDate;
    const diffDays = Math.ceil(diffTime/(1000 * 60 * 60 * 24));
    console.log(diffTime);
    console.log(diffTime);
    if(diffDays <= 0){
      control.get('checkoutDate')?.setErrors({
        invalid:true,
      })
        return {invalidate:true}
    }
    return null;
  }

  //ChatGPT suggesion
  static validateDate(control: FormGroup) {
    const checkinDateControl = control.get('checkinDate');
    const checkoutDateControl = control.get('checkoutDate');

    if (!checkinDateControl || !checkoutDateControl) {
      return null; // Return null if controls are not found
    }
  
    const checkinDateValue = checkinDateControl.value;
    const checkoutDateValue = checkoutDateControl.value;
 
    const checkinDate = new Date(checkinDateValue);
    const checkoutDate = new Date(checkoutDateValue);

    const diffTime = checkoutDate.getTime() - checkinDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays <= 0) {
      checkoutDateControl.setErrors({ invalid: true });
      return { invalidate: true };
    }
    return null;

  }

}

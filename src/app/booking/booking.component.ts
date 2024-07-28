import { BookingService } from './booking.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { ConfigService } from 'src/services/config.service';
import { __values } from 'tslib';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  //guests = this.bookingForm.get('guestS') as FormArray;

  get guests() {
    return this.bookingForm.get('guestS') as FormArray;
  }


  constructor(private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    const roomId = this.route.snapshot.paramMap.get('roomid');

    this.bookingForm = this.fb.group({
      roomId: [roomId, 
        { validators: [Validators.required] }
      ],
      guestEmail: [
        '',
        {
          updateOn: 'blur',
          Validators: [Validators.required, Validators.email]
        }
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['',
        {
          updateOn: 'blur',
        }
      ],
      guestName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          CustomValidator.validateName,
          CustomValidator.ValidateSpecialChar('!')
        ]
      ],
      address: this.fb.group({
        addressLine1: ['', { validators: [Validators.required] }],
        addressLine2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guestS: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.required] }),
    }, {
      updateOn: 'blur', validators: [CustomValidator.validateDate]
    }
    );

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe(data);
    // });

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());


    this.bookingForm.reset(
      {
        roomId: '2',
        guestEmail: '',
        checkinDate: '',
        checkoutDate: '',
        bookingStatus: '',
        bookingAmount: '',
        bookingDate: '',
        mobileNumber: '',
        guestName: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
        },
        guestS: [],
        tnc: false
      }
    );
  }

  getBookingData() {
    this.bookingForm.patchValue(
      {
        guestEmail: 'test@gmail.com',
        checkinDate: new Date('21.07.2024'),

        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: '',
        mobileNumber: '',
        guestName: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
        },
        guestS: [],
        tnc: false
      }
    )
  }

  addGuest() {
    this.guests.push(
      this.addGuestControl()
    );
  }

  addGuestControl() {
    return this.fb.group({
      guestName: new FormControl('', { validators: [Validators.required] }),
      age: new FormControl('')
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

}


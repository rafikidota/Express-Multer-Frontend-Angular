import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sweetalert from 'sweetalert2';
import { Doctor } from './doctor';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  public profileForm!: FormGroup;
  public doctor!: Doctor;
  public image!: File;
  public imageTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
  ) {
    this.doctor = new Doctor('', '');
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['Chiri Moya', [Validators.required]],
      email: ['chirimoya@gmail.com', [Validators.required, Validators.email]],
    });
  }

  save() {
    const name = this.profileForm.get('name')?.value;
    const email = this.profileForm.get('email')?.value;
    this.doctor.name = name;
    this.doctor.email = email;

    this.doctorService.create(this.doctor, this.image).subscribe({
      next: (res) => {
        if (res.ok === true) {
          console.log(res);
          sweetalert.fire('Saved', 'Doctor saved successfully', 'success');
        }
      },
      error: (res) => {
        if (res.status === 0) {
          sweetalert.fire('Error', 'Server offline', 'error');
        } else {
          sweetalert.fire('Error', res.error.msg, 'error');
        }
      }
    });
  }

  changeImage(event: any) {
    const file = event.target?.files[0];
    this.image = file;
    if (!file) {
      return this.imageTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    }
    return;
  }

  deleteImage() {
    this.imageTemp = null;
  }
}

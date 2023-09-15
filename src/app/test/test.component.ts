import {Component, OnInit} from '@angular/core';
import {Address, Test} from "../test";
import {TestService} from "../test.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {result, UserInterface} from "../user.interface";
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  listUsers: UserInterface[] = [];
  userDetail: UserInterface | undefined;

  public form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    adress: new FormControl(''),
    label: new FormControl(''),
    postalCode: new FormControl(''),
    contry: new FormControl(''),
    birth: new FormControl(''),
    // image: new FormControl('')
  });
  constructor(private service: TestService, private datePipe: DatePipe) {
  }
  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.service.getAllUser().subscribe(Users => {
      this.listUsers = Users;
    });
  }
  viewOneUser(id: number){
    this.service.getUserById(id).subscribe(userResult =>{
      this.userDetail = userResult;
    })
  }

  onSubmit() {
    // window.location.reload();
    if (this.form.valid) {
       window.location.reload();
      const formattedBirth = this.datePipe.transform(this.form.value.birth, 'dd/MM/yyyy');

      const user: UserInterface = {
        id: 0,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        gender: this.form.value.gender,
        adress: {
          label: this.form.value.label,
          contry: this.form.value.contry,
          postalCode: this.form.value.postalCode
        },
        password: this.form.value.password,
        birth: formattedBirth
      };

      this.service.addUser(user).subscribe(response => {
        this.getUser();
        this.form.reset();
      });
    } else {
      console.log('Formulaire invalide');
    }
  }


  delete(id: number, index: number) {
    this.service.deleteUser(id).subscribe(resultatDelete => {
        this.listUsers.splice(index,1);
        console.log(this.listUsers);
  });

  }


}


import {Component} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ToastModule
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authControl = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private messageService: MessageService, private router: Router) {}

  login() {
    if (this.authControl.valid) {
      this.successLogin()
      this.router.navigate(['/'])
    } else {
      this.warningLogin()

    }
  }

  private successLogin() {
    this.messageService.add({ severity: 'success', summary: 'Вход', detail: 'Вы успешно вошли в систему' });
  }

  private warningLogin() {
    this.messageService.add({ severity: 'warn', summary: 'Вход', detail: 'Логин и/или пароль введены неверно' });
  }
}

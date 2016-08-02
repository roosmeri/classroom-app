import { Component, OnInit, Inject } from '@angular/core';
import { CLASSROOM_API_URL } from '../app.tokens';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  constructor(@Inject(CLASSROOM_API_URL) private apiUrl) {}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(){
  }
  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin)=>{
      this.usuarioLogin = resp;

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.id = this.usuarioLogin.id
      environment.foto = this.usuarioLogin.foto
      environment.tipo = this.usuarioLogin.tipo

      console.log(environment)

      this.router.navigate(['/inicio']);
    }, erro => {
      if(erro.status == 401){
        alert('Usuario ou senha incorretos')
      }
    })
    }

}

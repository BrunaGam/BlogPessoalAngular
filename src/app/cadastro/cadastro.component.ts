import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

usuario: Usuario = new Usuario();
confirmarSenha: string
tipoUsuario: string

  constructor() { }

  ngOnInit(){
    window.scroll(0,0)
  }
confirmSenha(event: any){
this.confirmarSenha = event.target.value
console.log(this.confirmarSenha)
}

tipoUser(event: any){
  this.tipoUsuario = event.target.value
  console.log(this.tipoUsuario)
}
cadastrar(){
  this.usuario.tipo = this.tipoUsuario

}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  //variáveis para o tema: 
  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  //variáveis para o usuário: 
  idUser = environment.id
  usuario: Usuario = new Usuario()

 //variaveis para postagem:
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]


  constructor(
    private router: Router,
    private temaService: TemaService,
    private auth: AuthService,
    private postagemService: PostagemService
    ) { }

  ngOnInit(){

    if(environment.token == ''){
      alert('Sua sessão expirou! Faça o login novamente.')
      this.router.navigate(['/login'])
      }
      
      this.auth.refreshToken();
      this.getAllTemas()
      this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTemas(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findUserById(){
    this.auth.getUserById(this.idUser).subscribe((resp: Usuario) =>{
      this.usuario = resp
    })
  }
  
    getAllPostagens(){
      this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!!!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-cadastrar-jogo",
  templateUrl: "./cadastrar-jogo.component.html",
  styleUrls: ["./cadastrar-jogo.component.css"],
})
export class CadastrarJogoComponent implements OnInit {
  jogo!: string;
  selecoes!: Selecao[];
  selecao1: any;
  selecao2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar").subscribe({
      next: (selecao) => {
        this.selecoes = selecao;
        this.selecao1 = this.selecoes[0]
        this.selecao2 = this.selecoes[1]
      },
    });
  }

  cadastrar(): void {
    let jogo: Jogo = {
        selecaoA: this.selecao1,
        selecaoB: this.selecao2
    };

    this.http
      .post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogo)
      .subscribe({
        next: (funcionario) => {
          this._snackBar.open("Jogo cadastrado!", "Ok!", {
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.router.navigate(["pages/jogo/cadastrar"]);
        },
        error: (error) => {
          console.error("Algum erro aconteceu!");
        },
      });
  }

}

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
  selecoes?: Selecao[];
  selecao1!: number;
  selecao2!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar").subscribe({
      next: (selecao) => {
        this.selecoes = selecao;
        console.log(this.selecoes[0].nome)
      },
    });
  }

    valorSelect1 = "";
    valorSelect2 = "";
    onChange1(valor: any) {
      console.log(valor);
      this.valorSelect1 = valor;
    }

    onChange2(valor: any) {
      console.log(valor);
      this.valorSelect2 = valor;
    }

  cadastrar(): void {
    let jogo: Jogo = {
      selecaoA: this.selecoes?.find(s => s.id == this.selecao1),
      selecaoB: this.selecoes?.find(s => s.id == this.selecao2)
    };

    this.http
      .post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogo)
      .subscribe({
        next: (jogo) => {
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

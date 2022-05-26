import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  marcasLista = ["Marca 1", "Marca 2", "Marca 3"];
  produtoForm!: FormGroup;
  actionBtn: string = "Salvar";
  nomeBtn: string = "Adicionar Produto";

  constructor(private formBuilder:FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editarDados: any, private dialog:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
    produtoNome: ['', Validators.required],
    categoria: ['', Validators.required],
    marca: ['', Validators.required],
    preco: ['', Validators.required],
    observacoes: ['', Validators.required],
    data: ['', Validators.required]
    });

    if(this.editarDados) {
      this.nomeBtn = "Editar Produto";
      this.actionBtn = "Atualizar";
      this.produtoForm.controls['produtoNome'].setValue(this.editarDados.produtoNome);
      this.produtoForm.controls['categoria'].setValue(this.editarDados.categoria);
      this.produtoForm.controls['marca'].setValue(this.editarDados.marca);
      this.produtoForm.controls['preco'].setValue(this.editarDados.preco);
      this.produtoForm.controls['observacoes'].setValue(this.editarDados.observacoes);
      this.produtoForm.controls['data'].setValue(this.editarDados.data);
    }
  }

    addProduto() {
      if(!this.editarDados) {
        if(this.produtoForm.valid) {
          this.api.postProduto(this.produtoForm.value).subscribe({
            next:(res) => {
              alert("Produto Adicionado com Sucesso");
              this.produtoForm.reset();
              this.dialog.close('Salvar');
            },
            error:() => {
              alert("Erro ao Adicionar Produto");
            }
          });
        }
      } else {
        this.atualizarProduto();
      }
    }

    atualizarProduto() {
      this.api.putProduto(this.produtoForm.value, this.editarDados.id).subscribe({
        next:(res) => {
          alert("Edição feita com Sucesso");
          this.produtoForm.reset();
          this.dialog.close('Atualizar');
        },
        error:(error) => {
          alert("Erro ao Atualizar");
        }
      })
    }
}

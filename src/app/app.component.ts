import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/services/api.service';
import { DialogComponent } from './dialog/dialog.component';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Material';
  displayedColumns: string[] = ['produtoNome', 'categoria', 'marca', 'preco', 'observacoes', 'data', 'opcoes'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(public dialog: MatDialog, private api:ApiService, private dateAdapter: DateAdapter<Date>) {
  this.dateAdapter.setLocale('pt-BR'); //dd/MM/yyyy
}
  ngOnInit(): void {
    this.getTodosProdutos();
  }

openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=> {
      if(val =='Salvar') {
        this.getTodosProdutos();
      }
    })
  }

  getTodosProdutos() {
    this.api.getProduto().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(erro) => {
        alert("Erro ao Carregar Produtos");
      }
    })
  }

  applyFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarProduto(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=> {
      if(val =='Atualizar') {
        this.getTodosProdutos();
  }
})
  }
  removerProduto(id: number) {
    this.api.deleteProduto(id).subscribe({
      next:(res) => {
        alert("Produto Removido com Sucesso.");
        this.getTodosProdutos();
      },
        error:() => {
          alert("Erro ao tentar Deletar Produto.");
        }
    })
  }
}


import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent implements OnInit {
  @Input() public label!: string;
  @Input() public icon!: string;
  @Input() public control!: FormControl;

  public ufControl = new FormControl('');
  public filteredOptions$!: Observable<UnidadeFederativa[]>;
  unidadesFederativas: UnidadeFederativa[] = [];

  constructor(private unidadeFederativaService: UnidadeFederativaService) {  }

  ngOnInit(): void {
    this.unidadeFederativaService.listar()
    .subscribe( dados => {
      this.unidadesFederativas = dados;
    })

    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarUfs(value))
    )
  }

  private filtrarUfs(value: string): UnidadeFederativa[] {
    const valorFiltrado = value?.toLowerCase();
    //return this.unidadesFederativas.filter(estado => estado.nome.toLowerCase().includes(filterValue));
    const result = this.unidadesFederativas.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado)
    )
    return result
  }
}

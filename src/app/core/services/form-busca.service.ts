import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {
  formBusca: FormGroup;

  constructor(public dialog: MatDialog) {
    this.formBusca = new FormGroup({
      somenteIda: new FormControl(false),
      origem: new FormControl(null),
      destino: new FormControl(null),
      tipo: new FormControl("Econômica"),
      adultos: new FormControl(1),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
    });
   }

   getDescricaoPassageiro (): string {
    const passageiros = [
      { key: 'adultos', label: 'adulto' },
      { key: 'criancas', label: 'criança' },
      { key: 'bebes', label: 'bebê' }
    ];

    const descricao = passageiros
      .map(passageiro => {
        const qtt = this.formBusca.get(passageiro.key)?.value;
        if (qtt && qtt >= 1) {
          return `${qtt} ${passageiro.label}${qtt > 1 ? 's' : ''}`;
        }

        return null;
      }).filter(Boolean)
      .join(' e ');

      return descricao;
    }

   obterControle(nome: string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }

  alteraTipo(evento: MatChipSelectionChange, tipo: string) {
    if(evento.selected) {
      this.formBusca.patchValue({tipo});
      console.log('Muda o tipo ', tipo)
    }
  }

  openDialog() {
    this.dialog.open(ModalComponent, { width: '50%' });
  }
}

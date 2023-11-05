import { Component, Input, OnInit } from '@angular/core';
import { Promocao } from 'src/app/core/types/type';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent implements OnInit {
  @Input() config!: Promocao;

  constructor() {}
  
  ngOnInit(): void {
  }

}

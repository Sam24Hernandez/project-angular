import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica-lineal',
  templateUrl: './grafica-lineal.component.html',
  styles: []
})
export class GraficaLinealComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input('chartData') lineChartData: MultiDataSet = [
      [],
      [],
      [],
  ];  

  constructor() { }

  ngOnInit() {
  }

}
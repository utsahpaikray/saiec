import { Component, Input } from '@angular/core';
import Chart  from 'chart.js/auto';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent  {
  public chart: any;
  @Input() data: any;
  @Input() mode: any;
  constructor() { }

  
  ngOnChanges(): void {
    if (this.data) {
      this.createChart();
      this.addData(this.chart, this.data.marks);
    }
  }
  createChart() {
    if(this.chart && this.chart.data.datasets.data.length>0){
      this.chart.destroy();
    }
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart
      data: {
        datasets: [{
          label: `${this.mode} Mark Graph`,
          data: this.data?.marks,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(154, 150, 235, 0.2)',
            'rgba(190, 144, 255, 0.2)',
            'rgba(230, 200, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            suggestedMax: 100
          }
        },
        parsing: {
          xAxisKey: 'sub',
          yAxisKey: 'total'
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                let label = context.formattedValue || '';

                if (label) {
                  label += `/ ${context['raw']['subjectTotal']}` || 0;
                }
                return label;
              }
            }
          }
        },
        aspectRatio: 2.5
      },

    });
  }
  addData(chart: any ,data: any) {
    chart.data.datasets.data =data
    chart.update();
  }
}

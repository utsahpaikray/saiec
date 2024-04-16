import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  template: `
    <ion-toggle [checked]="state" (ionChange)="onToggleChange($event)"></ion-toggle>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles:`ion-toggle {zoom: 0.5}`
})
export class CompanyRendererComponent implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: unknown;
  public parsedValue!: string;
  params?: any;
  label?: string;
  state = false;
  agInit(params: ICellRendererParams): void {
    this.params = params
    this.value = params.value;
    this.state = ( this.value==="Active" || this.value==="Y" || this.value===true||this.value==="true")
  }

  // Return Cell Value
  refresh(): boolean {
    return true;
  }
  onToggleChange(event: any): void {
    this.state = event.detail.checked;
    this.params.node.setDataValue(this.params.colDef.field, this.state ? "true" : "false");
    this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
  }
}

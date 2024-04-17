import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, MenuItemDef, ValueGetterParams } from 'ag-grid-community';

import { Observable } from 'rxjs';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  params: Params | undefined;

  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'Product Code' },
    { field: 'Name' },
    { field: 'Description' },
    { field: 'Qty',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
  },
    { field: 'Date of Purchase' },
    { field: 'Availability',
      aggFunc: "sum",
      valueParser: "Number(newValue)"
  },
    { field: 'PurchasePrice'
     },
    {
      field: 'SellingPrice'
    },
    {
      field: 'Total',
      valueGetter: this.priceValueGetter,
      aggFunc: "sum",
      editable: false,
      valueParser: "Number(newValue)"
    },
    {
      field: 'Avail Total',
      valueGetter: this.availPriceValueGetter,
      aggFunc: "sum",
      editable: false,
      valueParser: "Number(newValue)"
    }

  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
    editable: true,
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  public rowData: any

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions!: GridOptions;

  constructor( public firebaseService: FirebaseService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.params = this.route.snapshot.params;
  }
  priceValueGetter(params: ValueGetterParams) {
    return params.data.Qty * params.data.PurchasePrice;
}
  availPriceValueGetter(params: ValueGetterParams) {
    return params.data.Availability * params.data.PurchasePrice;
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.firebaseService.getAllProducts().subscribe(items => {
      this.rowData = items;
    })

  }
  updateAll(): void {

  }
  getContextMenuItems = (params: any) => {
    var result: (string | MenuItemDef)[] = [
      {
        name: 'Action',
        subMenu: [
          {
            name: 'Update',
            action: () => {
              this.update(params);
            },
          },
          {
            name: 'Delete',
            action: () => {
              this.delete(params)
            },
          }
        ],
      },
      'separator',
      'export',
      'autoSizeAll',
      'expandAll',
      'copyWithHeaders',
      'copy'
    ];
    return result;
  }
  public update(params: any) {
    this.firebaseService.updateProduct(params.node.data.$id, params.node.data)
  }
  public delete(params: any) {
   this.firebaseService.deleteProduct(params.node.data.$id)
  }
  addProduct() {
    let productObj = {
      'Product Code': '', 'Name': '', 'Description': '', 'Qty':'', 'Date of Purchase': '', 'Availability':'','Price':"",'Total':""
    }
    this.firebaseService.pushItems('store', productObj);
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  onBtExport() {
    this.gridApi.exportDataAsExcel({ fileName: 'products' });
  }
  saveData() {
    let allData = this.getAllRows();

  }
  getAllRows() {
    let rowData: any[] = [];

    this.gridApi.forEachNode((node: any) => {
      this.createStudentRecord(node.data)
      rowData.push(node.data)

    });
    return rowData;
  }
  createStudentRecord(data: any) {
    this.firebaseService.pushItems('staff-payment', data)
  }

}

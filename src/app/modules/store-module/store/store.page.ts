import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  MenuItemDef,
  ValueGetterParams,
} from 'ag-grid-community';

import { Observable } from 'rxjs';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/states/state.interface';
import { loadBookstore } from 'src/app/states/bookStore/bookstore.actions';
import {
  selectBookStore,
  selectLoadedStatus,
} from 'src/app/states/bookStore/bookstore.selector';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  params: Params | undefined;

  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'Product Code', headerName: 'Product Code', editable: true },
    { field: 'Name', headerName: 'Name', editable: true },
    { field: 'Description', headerName: 'Description', editable: true },
    { field: 'Qty', headerName: 'Qty', aggFunc: 'sum', valueParser: 'Number(newValue)', editable: true },
    { field: 'Date of Purchase', headerName: 'Date of Purchase', editable: true },
    { field: 'Availability', headerName: 'Availability', aggFunc: 'sum', valueParser: 'Number(newValue)', editable: true },
    { field: 'PurchasePrice', headerName: 'Purchase Price', editable: true },
    { field: 'SellingPrice', headerName: 'Selling Price', editable: true },
    { field: 'Total', headerName: 'Total', valueGetter: this.priceValueGetter, aggFunc: 'sum', editable: false, valueParser: 'Number(newValue)' },
    { field: 'Avail Total', headerName: 'Avail Total', valueGetter: this.availPriceValueGetter, aggFunc: 'sum', editable: false, valueParser: 'Number(newValue)' },
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
    enableRowGroup: true,
    enablePivot: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  public rowData: any;
  storeItems$!: Observable<any[]>;
  loaded$!: Observable<boolean>;
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridOptions!: GridOptions;

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}
  ngOnInit(): void {
    this.params = this.route.snapshot.params;
    this.getStoreItems();
  }

  priceValueGetter(params: ValueGetterParams) {
    return params.data.Qty * params.data.PurchasePrice;
}
  availPriceValueGetter(params: ValueGetterParams) {
    return params.data.Availability * params.data.PurchasePrice;
  }

  getStoreItems(): void {
    this.store.dispatch(loadBookstore()); // Dispatch action to load bookstore data
    this.storeItems$ = this.store.pipe(select(selectBookStore)); // Select the bookstore data from the store
    this.storeItems$.subscribe((items) => {
      if (items && items.length > 0) {
        this.rowData = items.map(item => ({ ...item })); // Update the rowData with the retrieved data
      } else {
        console.error('No data available from the store.');
      }
    });
    this.loaded$ = this.store.pipe(select(selectLoadedStatus));
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  onBtExport(): void {
    this.gridApi.exportDataAsExcel({ fileName: 'products' });
  }

  update(params: any) {
    this.firebaseService.updateProduct(params.node.data.$id, params.node.data);
  }

  delete(params: any) {
    this.firebaseService.deleteProduct(params.node.data.$id);
  }

  addProduct() {
    const productObj = {
      productCode: '',
      name: '',
      description: '',
      qty: '',
      dateOfPurchase: '',
      availability: '',
      purchasePrice: '',
      sellingPrice: '',
      total: '',
      availTotal: ''
    };
    this.rowData = [...this.rowData, { ...productObj }];
  }

  addItem(productObj: any) {
    this.firebaseService.pushItems('store', productObj.node.data);
  }

  getContextMenuItems = (params: any) => {
    const result: (string | MenuItemDef)[] = [
      {
        name: 'Action',
        subMenu: [
          {
            name: 'Add',
            action: () => {
              this.addItem(params);
            },
          },
          {
            name: 'Update',
            action: () => {
              this.update(params);
            },
          },
          {
            name: 'Delete',
            action: () => {
              this.delete(params);
            },
          },
        ],
      },
      'separator',
      'export',
      'autoSizeAll',
      'expandAll',
      'copyWithHeaders',
      'copy',
    ];
    return result;
  };

  onCellClicked(e: CellClickedEvent): void {
    // Handle cell clicked event
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}

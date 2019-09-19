import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LicenseManager} from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import {Column, ColumnApi} from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'betbuilder-scrollers';
  gridColumnApi: ColumnApi;

  columnDefs = [
    {headerName: 'PartitionKey', field: 'PartitionKey', sortable: true, filter: true, autoSize: true},
    {headerName: 'RowKey', field: 'RowKey', sortable: true, filter: true},
    {
      headerName: 'Timestamp', field: 'Timestamp', sortable: true, filter: true, valueGetter: this.convertEpochToDateTime
    },
    {headerName: 'Client', field: 'Client', sortable: true, filter: true},
    {headerName: 'Competition', field: 'Competition', sortable: true, filter: true},
    {headerName: 'Match', field: 'Match', sortable: true, filter: true},
    {headerName: 'TimeRequested', field: 'TimeRequested', sortable: true, filter: true, valueGetter: this.convertEpochToDateTime},
    {headerName: 'Acceptance', field: 'Acceptance', sortable: true, filter: true},
    {headerName: 'Stake', field: 'Stake', sortable: true, filter: true},
    {headerName: 'Odds', field: 'Odds', sortable: true, filter: true},
    {headerName: 'Liability', field: 'Liability', sortable: true, filter: true},
    {headerName: 'Status', field: 'Status', sortable: true, filter: true},
    {headerName: 'TimeSettled', field: 'TimeSettled', sortable: true, filter: true, valueGetter: this.convertEpochToDateTime},
    {headerName: 'Description', field: 'Description', sortable: true, filter: true},
    {headerName: 'BetSlipUid', field: 'BetSlipUid', sortable: true, filter: true}
  ];

  public rowData: any;
  public scrollerWidth: number = 0;
  public scrollerHeight: number = 0;

  convertEpochToDateTime(params) {
    const epoch = params.data.Timestamp.toString().substr(6, 13);
    console.log('**' + epoch + '**');
    const m = new Date(Number(epoch) );
    return m.getUTCFullYear() + '/' +
      ('0' + (m.getUTCMonth() + 1)).slice(-2) + '/' +
      ('0' + m.getUTCDate()).slice(-2) + ' ' +
      ('0' + m.getUTCHours()).slice(-2) + ':' +
      ('0' + m.getUTCMinutes()).slice(-2) + ':' +
      ('0' + m.getUTCSeconds()).slice(-2);

  }

  constructor(private http: HttpClient) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getComponentDims();
  }

  onGridReady(params) {
    // this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.autoSizeAll();

  }

  getComponentDims() {
    this.scrollerWidth = window.innerWidth;
    this.scrollerHeight = window.innerHeight;
  }

  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach((column: any) => {
      allColumnIds.push(column.colId);
    });
    console.log('allcolumnIDs', allColumnIds);
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  ngOnInit(): void {
    LicenseManager.setLicenseKey('no license');
    this.getComponentDims();

    this.http.get('assets/static/Mock_BetSlipSummarScrollerData.json').toPromise()
      .then(result => {
        this.rowData = result;
        console.log('result', result);
        setTimeout(() => {
          this.autoSizeAll();
        }, 100);
      }, fail => {
        console.log('fail', fail);
      });

  }


}

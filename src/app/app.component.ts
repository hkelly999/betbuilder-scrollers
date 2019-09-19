import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LicenseManager} from 'ag-grid-enterprise';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'betbuilder-scrollers';

  columnDefs = [
    {headerName: 'PartitionKey', field: 'PartitionKey', sortable: true, filter: true},
    {headerName: 'RowKey', field: 'RowKey', sortable: true, filter: true},
    {headerName: 'Timestamp', field: 'Timestamp', sortable: true, filter: true},
    {headerName: 'Client', field: 'Client', sortable: true, filter: true},
    {headerName: 'Competition', field: 'Competition', sortable: true, filter: true},
    {headerName: 'Match', field: 'Match', sortable: true, filter: true},
    {headerName: 'TimeRequested', field: 'TimeRequested', sortable: true, filter: true},
    {headerName: 'Acceptance', field: 'Acceptance', sortable: true, filter: true},
    {headerName: 'Stake', field: 'Stake', sortable: true, filter: true},
    {headerName: 'Odds', field: 'Odds', sortable: true, filter: true},
    {headerName: 'Liability', field: 'Liability', sortable: true, filter: true},
    {headerName: 'Status', field: 'Status', sortable: true, filter: true},
    {headerName: 'TimeSettled', field: 'TimeSettled', sortable: true, filter: true},
    {headerName: 'Description', field: 'Description', sortable: true, filter: true},
    {headerName: 'BetSlipUid', field: 'BetSlipUid', sortable: true, filter: true}
  ];

  rowData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    LicenseManager.setLicenseKey('no license');
    this.http.get('assets/static/Mock_BetSlipSummarScrollerData.json').toPromise()
      .then(result => {
        this.rowData = result;
        console.log('result', result);
      }, fail => {
        console.log('fail', fail);
      });

  }


}

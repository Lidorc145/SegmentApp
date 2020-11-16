import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../http.service';
import {PageEvent} from '@angular/material/paginator';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./order-table.component.css'],
  providers: [NgbTooltipConfig]
})
export class OrderTableComponent implements OnInit {
  selectedData;
  columns = {};
  settings = {};
  closeResult: string;
  filter: string;
  pageEvent: PageEvent;
  tableData: LocalDataSource;
  tableStyle = 'dark';

  userRowSelect() {
    console.log('dd');
  }

  constructor(private _http: HttpService, config: NgbTooltipConfig, private modalService: NgbModal, private _Activatedroute: ActivatedRoute) {
    config.placement = 'right';
    config.triggers = 'click';
  }

  ngOnInit() {
    this._http.getTableData().subscribe(data => {
      if (data['Items']) {
        for (let item in data['Items'][0]) {
          this.columns[item] = {title: item};
        }

        this.settings = {
          columns: this.columns,
          actions: {
            add: false,
            edit: false,
            delete: true,
            position: 'right'
          },
          pager: {
            display: true,
            perPage: 25
          },
          delete: {
            deletdeleteButtonContent: `<div class="btn btn-danger align-middle"><div class="align-middle"> Delete</div>`
          },
          rowClassFunction: row => {
            let ShipCountryNoSpace = row.data.ShipCountry.replaceAll(' ', '_');
            let ShipCityNoSpace = row.data.ShipCity.replaceAll(' ', '_');
            return ShipCountryNoSpace + ' ' + ShipCityNoSpace;
          }
        };

        this._Activatedroute.paramMap.subscribe(params => {
          this.filter = params.get('filter');
        });
        this.tableData = new LocalDataSource(data['Items']);

        if (this.filter === 'Germany' || this.filter === 'France') {
          this.tableData.addFilter({field: 'ShipCountry', search: this.filter});
        } else if (this.filter === 'Rio De Janeiro') {
          this.tableData.addFilter({field: 'ShipCity', search: 'Rio De Janeiro'});
        }
      }
    });
  }

  onUserRowSelect(popup, event): void {
    let tmpDetails = new Array();
    for (let i in event.data) {
      tmpDetails.push(new Array(i, event.data[i]));
    }
    console.log(tmpDetails);
    console.log(event.data);
    this.selectedData = tmpDetails;

    this.modalService.open(popup, {backdropClass: 'modal'});
  }
}

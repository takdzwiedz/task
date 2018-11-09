import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    displayedColumns: string[] = [
        'action_reason_id',
        'action_id',
        'action_name',
        'action_description',
        'reason_id',
        'reason_name',
        'reason_description',
        'action_reason_begin',
        'action_reason_end',
        'action_reason_create_id',
        'action_reason_create_user',
        'action_reason_create_date',
        'action_reason_modify_id',
        'action_reason_modify_user',
        'action_reason_modify_date',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

export interface PeriodicElement {
    action_reason_id: number;
    action_id: number;
    action_name: string;
    action_description: string;
    reason_id: number,
    reason_name: string,
    reason_description: string,
    action_reason_begin: string,
    action_reason_end: string,
    action_reason_create_id: number,
    action_reason_create_user: string,
    action_reason_create_date: string,
    action_reason_modify_id: number,
    action_reason_modify_user: string,
    action_reason_modify_date: any,
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        action_reason_id: 37,
        action_id: 13,
        action_name: 'Zwrot skladki',
        action_description: '',
        reason_id: 5,
        reason_name: 'Nadpłata po rekalkulacji składki',
        reason_description: '',
        action_reason_begin: '2018-10-04',
        action_reason_end: '',
        action_reason_create_id: 1,
        action_reason_create_user: 'System System',
        action_reason_create_date: '2018-10-04',
        action_reason_modify_id: 1,
        action_reason_modify_user: 'System System',
        action_reason_modify_date: '2018-10-04',
    },
    {
        action_reason_id: 38,
        action_id: 18,
        action_name: 'Zamiana wariantu w umowie',
        action_description: '',
        reason_id: 30,
        reason_name: 'Zmiana właściciela przedmiotu ubezpiecenia',
        reason_description: '',
        action_reason_begin: '2018-10-04',
        action_reason_end: '',
        action_reason_create_id: 1,
        action_reason_create_user: 'System System',
        action_reason_create_date: '2018-10-04',
        action_reason_modify_id: 1,
        action_reason_modify_user: 'System System',
        action_reason_modify_date: '2018-11-05',
    },
    {
        action_reason_id: 25,
        action_id: 18,
        action_name: 'Zamiana wariantu w umowie',
        action_description: '',
        reason_id: 36,
        reason_name: 'Przedterminowe zakończenie dobrowolnej umowy',
        reason_description: '',
        action_reason_begin: '2018-11-09',
        action_reason_end: '',
        action_reason_create_id: 2,
        action_reason_create_user: 'System System',
        action_reason_create_date: '2018-11-09',
        action_reason_modify_id: 2,
        action_reason_modify_user: 'System System',
        action_reason_modify_date: '2018-11-09',
    },
];
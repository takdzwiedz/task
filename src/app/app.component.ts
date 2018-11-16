import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
    exampleDatabase: ExampleHttpDao | null;

    data: ZendIssue[] = [];
    dataSource = new MatTableDataSource();

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.exampleDatabase = new ExampleHttpDao(this.http);

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.exampleDatabase!.getZendIssues(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex);
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data.total_count;

                    return data.data;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource.data = data);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

export interface ZendApi {
    items: ZendIssue[];
    total_count: number;
}

export interface ZendIssue {

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

export class ExampleHttpDao {
    constructor(private http: HttpClient) {
    }

    getZendIssues(sort: string, order: string, page: number): Observable<ZendApi> {
        const href = 'http://task-zend-2/album/json';
        const requestUrl =
            // `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
            `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

        return this.http.get<ZendApi>(requestUrl);
    }
}
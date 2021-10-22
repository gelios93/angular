import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  private currentUserSubject$ = new Subject<any>();
  private currentUser$ = new BehaviorSubject<any>({ name: 'no name' });
  private currentUserReplay$ = new ReplaySubject<any>(3);

  private readonly usersEndpoint =
    `${environment.apiUrl}/Token`;

  get currentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  constructor(private httpClient: HttpClient) {
  }

  login(name: string) {
    this.currentUser$.next({ id: '', name, age: 22 });
  }

  getUserName(): Observable<string> {
    this.login('Roman');
    this.login('noRoman');
    return this.httpClient.get<any>(this.usersEndpoint).pipe(
      map((user: any) => user.Name),
      delay(5000),
      catchError((response: HttpErrorResponse) => {
        console.log('Something went wrong', response);
        return of('No name');

        // Another approach
        // return throwError(response);
      })
    );
  }
}

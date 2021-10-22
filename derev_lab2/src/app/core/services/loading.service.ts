import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading$ = new BehaviorSubject<boolean>(true);

  getLoadingState(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setLoadingState(state: boolean): void {
    this.isLoading$.next(state);
  }
}

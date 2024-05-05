import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifyHTTPRequesting {
  private _requesting = new BehaviorSubject<boolean>(false);

  get requesting() {
    return this._requesting;
  }
}

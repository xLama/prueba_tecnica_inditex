import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NotifyHTTPRequesting } from '../interceptors/notify-request.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  showSpinner: Observable<boolean>;

  constructor(
    private router: Router,
    private notifyRequesting: NotifyHTTPRequesting
  ) {
    this.showSpinner = combineLatest([
      this.router.events,
      this.notifyRequesting.requesting,
    ]).pipe(
      map(([navigation, isRequesting]) => {
        return navigation instanceof NavigationStart || isRequesting;
      })
    );
  }
}

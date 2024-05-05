import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { PodcastService } from '../services/podcast.service';
import { Podcast } from '../model';
import { PodcastChipComponent } from '../podcast-chip/podcast-chip.component';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-podcast-list',
  standalone: true,
  imports: [
    CommonModule,
    PodcastChipComponent,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './podcast-list.component.html',
  styleUrl: './podcast-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastListComponent {
  podcastList: Podcast[] = [];
  filteredPodcastList: Podcast[] = [];
  podcastFilter = '';

  form = this.formBuilder.group({
    search: [''],
  });

  constructor(
    private podcastService: PodcastService,
    private cd: ChangeDetectorRef,
    private formBuilder: NonNullableFormBuilder
  ) {
    this.form.controls.search?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((typed) => this.filterPodcastList(typed));
  }

  ngOnInit() {
    this.podcastService.podcastList.subscribe((podcastList) => {
      this.podcastList = [...podcastList];
      this.filteredPodcastList = [...podcastList];
      this.cd.markForCheck();
    });
  }

  filterPodcastList(event: string) {
    this.filteredPodcastList = this.podcastList.filter(
      (podcast) =>
        podcast['im:name'].label.toUpperCase().includes(event.toUpperCase()) ||
        podcast['im:artist'].label.toUpperCase().includes(event.toUpperCase())
    );
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Podcast } from '../model/model';

@Component({
  selector: 'app-podcast-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcast-chip.component.html',
  styleUrl: './podcast-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastChipComponent {
  @Input() podcast: Podcast | undefined;
}

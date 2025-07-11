import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-feature-articles-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './feature-articles-list.component.html',
  styleUrl: './feature-articles-list.component.scss',
})
export class FeatureArticlesListComponent {
  protected routeIds = [1, 2, 3, 4, 5];
}

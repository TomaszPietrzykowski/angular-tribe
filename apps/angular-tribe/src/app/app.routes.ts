import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component'
import { FeatureArticlesListComponent } from '@angular-tribe/feature-articles-list';
import { FeatureArticleComponent } from '@angular-tribe/feature-article';
import { LayoutComponent } from '@angular-tribe/ui-layout';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: NxWelcomeComponent
            },
            {
                path: 'articles',
                component: FeatureArticlesListComponent
            },
            {
                path: 'article/:id',
                component: FeatureArticleComponent
            },
        ]
    }
];

import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component'
// import { ArticlesComponent } from './articles/articles.component';
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
            // {
            //     path: 'articles',
            //     component: ArticlesComponent
            // },
            {
                path: 'articles/:id',
                component: FeatureArticleComponent
            },
        ]
    }
];

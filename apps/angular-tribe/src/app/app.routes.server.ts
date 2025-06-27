import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { db } from './articles/articles-db'

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'articles',
        renderMode: RenderMode.Prerender,
    },
    {
        path: 'article/:id',
        renderMode: RenderMode.Prerender,
        fallback: PrerenderFallback.Server,
        async getPrerenderParams() {
            return db.map(article => ({ id: article.id.toString() }));
        },
    },
    {
        path: '**',
        renderMode: RenderMode.Server,
    },
];

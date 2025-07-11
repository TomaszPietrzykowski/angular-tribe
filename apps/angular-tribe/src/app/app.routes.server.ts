import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Prerender
    },
    {
        path: 'articles',
        renderMode: RenderMode.Prerender
    },
    {
        path: 'articles/:id',
        renderMode: RenderMode.Prerender,
        fallback: PrerenderFallback.Server,
        async getPrerenderParams() {
            return [1, 2, 3, 4, 5].map(id => ({ id: id.toString() }));
        },
    },
    {
        path: '**',
        renderMode: RenderMode.Server,
    },
];

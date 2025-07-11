import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Server
    },
    {
        path: 'articles',
        renderMode: RenderMode.Server
    },
    {
        path: 'articles/:id',
        renderMode: RenderMode.Prerender,
        fallback: PrerenderFallback.Server,
        async getPrerenderParams() {
            // return [1, 2, 3, 4, 5].map(id => ({ id: id.toString() }));
            return [
                { id: '1' },
                { id: '2' },
                { id: '3' },
                { id: '4' },
                { id: '5' },
            ];
        },
    },
    {
        path: 'editor',
        renderMode: RenderMode.Server
    },
    {
        path: 'contact',
        renderMode: RenderMode.Server
    },
    {
        path: '**',
        renderMode: RenderMode.Server,
    },
];

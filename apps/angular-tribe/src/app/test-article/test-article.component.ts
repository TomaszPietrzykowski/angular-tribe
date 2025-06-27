import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { db } from '../articles/articles-db'

interface Article {
    id: number,
    title: string,
    content: string
}

@Component({
    selector: 'app-test-article',
    imports: [CommonModule, RouterLink],
    templateUrl: './test-article.component.html',
    styleUrl: './test-article.component.scss',
})
export class TestArticleComponent {
    article: Article;

    constructor(private route: ActivatedRoute) {
        const id = this.route.snapshot.paramMap.get('id');
        this.article = db.find(x => x.id.toString() === id)!;
    }

}

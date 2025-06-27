import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { db } from './articles-db';
import { RouterLink } from '@angular/router';

interface Article {
    id: number,
    title: string,
    content: string
}

@Component({
    selector: 'app-articles',
    imports: [CommonModule, RouterLink],
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.scss',
})
export class ArticlesComponent {
    articles!: Article[];

    constructor() {
        this.articles = db;
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from "ngx-markdown";
import { HttpClient } from '@angular/common/http';

// interface Article {
//     id: number,
//     title: string,
//     content: string
// }

@Component({
    selector: 'lib-feature-article',
    imports: [CommonModule, RouterLink, MarkdownComponent],
    templateUrl: './feature-article.component.html',
    styleUrl: './feature-article.component.scss',
})
export class FeatureArticleComponent implements OnInit {
    private http = inject(HttpClient);
    protected markdownContent = '';

    ngOnInit() {
        this.loadMarkdownFile();
    }

    // onFileSelected(event: Event): void {
    //   const input = event.target as HTMLInputElement;
    //   const file = input.files?.[0];

    //   if (file) {
    //     this.readFileAsString(file);
    //   }
    // }

    // private readFileAsString(file: File): void {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.markdownContent = e.target?.result as string;
    //   };
    //   reader.onerror = (error) => {
    //     console.error('Error reading file:', error);
    //   };
    //   reader.readAsText(file);
    // }

    private loadMarkdownFile(): void {
        const filePath = '/test-article.md';

        this.http.get(filePath, { responseType: 'text' }).subscribe({
            next: (content) => {
                console.log("loadMarkdownFile response", content)
                this.markdownContent = content;
            },
            error: (error) => {
                console.error('Error loading markdown file:', error);
            }
        });
    }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'lib-ui-layout',
    imports: [CommonModule, HeaderComponent, RouterModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent { }

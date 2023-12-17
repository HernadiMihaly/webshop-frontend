import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../service/category';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  categories: Category[] | undefined;
  rootCategories: Category[] | undefined;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      
      this.getRootCategories(categories);
    });
  }

  titleCaseWord(word: String | undefined) {
    if (!word) return "";
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }

  getRootCategories(categories: Category[] | undefined) {
    if (categories) {
      this.rootCategories = categories.filter(category => !category.parentId);
    }
  }  
  
}

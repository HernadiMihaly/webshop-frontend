import { Component, OnInit } from '@angular/core';
import { Category } from '../../service/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  topLevelCategories: Category[] = [];
  subcategoriesMap: { [key: number]: Category[] } = {};

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;

      this.categories.forEach((category) => {
        if (category.parentCategory == null) {
          this.topLevelCategories.push(category);
        }
      });
    });
  }

  toggleSubcategories(category: Category): void {
    if (!this.subcategoriesMap[category.id]) {
      this.categoryService.getSubCategories(category).subscribe((subcategories) => {
        this.subcategoriesMap[category.id] = subcategories;
      });
    }

  }

}

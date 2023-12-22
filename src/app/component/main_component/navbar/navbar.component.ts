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
  dropdownImages = {
    'men' : "https://images.pexels.com/photos/6227715/pexels-photo-6227715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    'women' : "https://images.pexels.com/photos/6014873/pexels-photo-6014873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    'children' : "https://images.pexels.com/photos/6266237/pexels-photo-6266237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  };
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

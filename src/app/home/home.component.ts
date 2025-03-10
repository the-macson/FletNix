import { Component, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  Film,
  Filter,
  Search,
  Tv,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Loader
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../auth/auth.service';

interface Show {
  _id: string;
  title: string;
  type: string;
  release_year: number;
  rating: string;
  show_id: string;
  director: string;
  cast: string;
  country: string;
  date_added: string;
  duration: string;
  listed_in: string;
  description: string;
}

interface ApiResponse {
  shows: Show[];
  page: number;
  limit: number;
  isNextPage: boolean;
}
@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  readonly film = Film;
  readonly filter = Filter;
  readonly search = Search;
  readonly tv = Tv;
  readonly chevronLeft = ChevronLeft;
  readonly chevronRight = ChevronRight;
  readonly logOut = LogOut;
  readonly menu = Menu;
  readonly loader = Loader;

  showMobileMenu = false;
  showList: Show[] = [];
  page = 1;
  limit = 15;
  showType: string | undefined = undefined;
  searchKey: string | undefined = undefined;
  isNextPage: boolean = true;
  timeout: any;
  isLoading = true;
  
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchShows(this.page, this.limit, this.showType, this.searchKey);
  }

  fetchShows = (
    page: number,
    limit: number,
    type: string | undefined,
    searchKey: string | undefined
  ) => {
    this.isLoading = true;
    this.apiService.getShows(page, limit, type, searchKey).subscribe({
      next: (data: ApiResponse) => {
        this.isLoading = false;
        this.showList = data.shows;
        this.page = data.page;
        this.limit = data.limit;
        this.isNextPage = data.isNextPage;
      },
      error: (error) => {
        if(error.status === 401) {
          this.authService.logout();
        }
        this.isLoading = false;
        console.error(error);
      },
    });
  };

  nextPage() {
    this.page += 1;
    this.fetchShows(this.page, this.limit, this.showType, this.searchKey);
  }
  prevPage() {
    this.page -= 1;
    this.fetchShows(this.page, this.limit, this.showType, this.searchKey);
  }

  applyShowTypeFilter(type: string) {
    if (this.showType === type) {
      this.showType = undefined;
    } else this.showType = type;
    this.page = 1;
    this.fetchShows(this.page, this.limit, this.showType, this.searchKey);
  }

  searchShows(searchKey: string) {
    this.searchKey = searchKey;
    this.page = 1;
    this.debounce(() => {
      this.fetchShows(this.page, this.limit, this.showType, this.searchKey);
    }, 500)();
  }

  debounce(func: Function, wait: number) {
    return (...args: any[]) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  logout() {
    this.authService.logout();
  }
}

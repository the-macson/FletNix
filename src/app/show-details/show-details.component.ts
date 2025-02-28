import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Play,
  Plus,
  ThumbsUp,
  Share2,
  Download,
  Star,
  Clock,
  Calendar,
  Globe,
  ListFilter,
  ArrowLeft,
  Loader,
} from 'lucide-angular';

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

@Component({
  selector: 'app-show-details',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css',
})
export class ShowDetailsComponent implements OnInit {
  readonly play = Play;
  readonly plus = Plus;
  readonly thumbsUp = ThumbsUp;
  readonly share2 = Share2;
  readonly download = Download;
  readonly star = Star;
  readonly clock = Clock;
  readonly calendar = Calendar;
  readonly globe = Globe;
  readonly listFilter = ListFilter;
  readonly arrowLeft = ArrowLeft;
  readonly loader = Loader;
  showId: string | null = null;
  show: Show | null = null;
  isLoading = true;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.showId = params.get('id');
      if (this.showId) {
        this.fetchShowById(this.showId);
      }
    });
  }

  fetchShowById = (id: string) => {
    this.apiService.getShowById(id).subscribe({
      next: (data: Show) => {
        this.show = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  };

  goToHome() {
    this.router.navigate(['/']);
  }
}

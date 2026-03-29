import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Seo } from './service/seo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly title = signal('ang21');
  constructor(private seoService: Seo) {}
  ngOnInit() {
    this.seoService.setSEOData(
      'Angularssr',
      'Angularssr',
    );
  }
}

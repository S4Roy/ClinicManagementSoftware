import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import * as Global from 'src/app/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  PageMainTitle = Global.APP_NAME;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rt = this.getActivatedRouteChild(this.activatedRoute);
        rt.data.subscribe((data: any) => {
          if (data.pageTitle) {
            this.titleService.setTitle(data.pageTitle + ' - ' + this.PageMainTitle)
          } else {
            this.titleService.setTitle(this.PageMainTitle)
          }
        });
      }
    });
  }

  getActivatedRouteChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getActivatedRouteChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  navs: any = [
    {
      label: 'Meetings',
      slug: 'meetings',
      icon: 'calendar_month'
    },
    {
      label: 'Clients',
      slug: 'clients',
      icon: 'group'
    },
    {
      label: 'Services',
      slug: 'services',
      icon: 'receipt_long'
    },
    {
      label: 'Account Activity',
      slug: 'activity',
      icon: 'list'
    }
    , {
      label: 'Settings',
      slug: 'settings',
      icon: 'settings'
    }
  ]
}

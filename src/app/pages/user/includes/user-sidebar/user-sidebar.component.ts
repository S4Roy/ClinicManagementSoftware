import { Component } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent {
  navs: any = [
    {
      label: 'Calender',
      slug: 'appointments',
      icon: 'calendar_month'
    },
    {
      label: 'Clients',
      slug: 'clients',
      icon: 'group'
    },
    {
      label: 'Billing',
      slug: 'billing',
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

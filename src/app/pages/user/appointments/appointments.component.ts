import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timegridPlugin from '@fullcalendar/timegrid'; // a plugin!
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import * as Global from 'src/app/globals';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  Global = Global;
  center_list: any = []
  center_id: any = 454
  toogle_value: string = 'day'
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timegridPlugin],
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    initialView: 'timeGridDay',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() }
    ],
    dateClick: this.newSchedule.bind(this)
  };
  viewType: string = 'timeGridDay';
  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;
  calenderTitle: any;
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.center_list = [
      {
        name: 'Kolkata',
        _id: 454
      },
      {
        name: 'Contai',
        _id: 4542344
      }
    ]
    this.toogleCalender({ value: 'day' });
  }
  toogleCalender(event: any) {
    this.toogle_value = event?.value
    switch (this.toogle_value) {
      case 'day':
        this.viewType = 'timeGridDay'
        break;
      case 'week':
        this.viewType = 'timeGridWeek'
        break;
      case 'month':
        this.viewType = 'dayGridMonth'
        break;
      default:
        this.viewType = 'timeGridDay'
        break;
    }
    setTimeout(() => {
      this.calendarComponent.getApi().changeView(this.viewType)
      this.calenderTitle = this.calendarComponent.getApi().getCurrentData().viewTitle;
      this.fetchAppointement();
    });
  }
  newSchedule(data: any) {
    this.dialog.open(NewScheduleComponent, {
      data: data,
      width: '600px'
    }).afterClosed().subscribe((res:any)=>{
      if(res.status=='success'){
        this.fetchAppointement()
      }
    })
  }
  fetchAppointement() {
    this.spinner.show();
    this.userService.fetchAppointement({}).subscribe((res: any) => {
      if (res.status == 'success') {
        let data_list: any[] = []
        res.data.docs.forEach((element: any) => {
          let start = element.startDate
          let end = element.endDate;
          let title = element.client_data.first_name + ' ' + element.client_data.last_name
          let obj = {
            start,
            end,
            title,
          }
          data_list.push(obj)
        });
        this.calendarComponent.getApi().removeAllEventSources();
        this.calendarComponent.getApi().addEventSource(data_list);
        this.calendarComponent.getApi().refetchEvents();
      }
      this.spinner.hide()
    }, (err) => {
      this.spinner.hide();
      this.toastr.error(Global.showServerErrorMessage(err))
    })
  }
}

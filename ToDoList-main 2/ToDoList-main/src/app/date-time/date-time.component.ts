import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit, OnDestroy {
  currentTime: string;
  currentDate: string;

  private timerId: any;

  constructor() {
    this.currentTime = '';
    this.currentDate = '';
  }

  ngOnInit(): void {
    this.updateTime();
    this.timerId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateTime(): void {
    const dateTime = new Date();
    const date = dateTime.toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = dateTime.toLocaleString('pt-BR', {
      hour: '2-digit', minute:'2-digit'
    });

    this.currentDate = date;
    this.currentTime = time;
  }
}

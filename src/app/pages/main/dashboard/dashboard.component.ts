import { socialType, IPostDashboard } from './../../../shared/types/social.model';
import { MainFilterMobileComponent } from './../../../shared/components/modals/main-filter-mobile/main-filter-mobile.component';
import { PieStatisticsComponent } from './../../../shared/components/pie-statistics/pie-statistics.component';
import { MatDialog } from '@angular/material/dialog';
import { IAmountDashboard, IResponceDashboardData } from './types/dashboard.types';
import { DashboardService } from './dashboard.service';
import { MainFilterService } from './../../../shared/services/main-filter.service';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { IDataMonitoring, IPostByCategory } from './../../../shared/types/shared.types';
import { MonitoringService } from './../reports/monitoring/monitoring.service';
import { UserServiceService } from './../../../shared/services/user-service.service';
import { Component, OnInit } from '@angular/core';
interface INetwork {
  name: socialType;
  img: string;
  is_not_empty: boolean;
  active: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datasets: any[] = [];
  img = new Image();
  private unsubscribe$: Subject<any> = new Subject<any>();
  showFilter = false;
  data: any = [];
  options!: any;
  pluginAddText = {
    id: 'pluginAddText',
    afterDatasetDraw(chart: any, args: any, options: any) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = '16px sans-serif';
      let index = 0;
      let curr = 0;
      chart.config.data.datasets[0].data.forEach((el: any, i: number) => {
        if (el.x > curr) {
          curr = el.x;
          index = i;
        }
      });
      for (let x = 0; x < chart.config.data.datasets.length; x++) {
        for (let i = 0; i < chart.config.data.datasets[x].data.length; i++) {
          let offset = -15;
          let textWidth = ctx.measureText(chart.config.data.datasets[0].data[index].name).width;
          if (i == index) { offset = textWidth + 15 };
          ctx.fillText(chart.config.data.datasets[x].data[i].name, chart.getDatasetMeta(x).data[i].x - (offset), chart.getDatasetMeta(x).data[i].y - 5);
        }
      }
      ctx.restore();
    }
  }
  dataInfo: any;
  dataForChartFilter!: IPostByCategory;
  keywordLimit = { limit: 0, current: 0 };
  amount!: IAmountDashboard;
  dataChart!: IResponceDashboardData;
  pieChart: any;

  keySearch = '';
  activeSocial: socialType = 'FacebookPublic';
  currentSocials: IPostDashboard[] = [];
  showData = true;
  isNetwork: INetwork[] = [{ name: 'FacebookPublic', img: 'facebook', is_not_empty: true, active: true },
  { name: 'Twitter', img: 'twitter', is_not_empty: true, active: false },
  { name: 'Youtube', img: 'google', is_not_empty: true, active: false }, { name: 'Reddit', img: 'reddit', is_not_empty: true, active: false },
  { name: 'Instagram', img: 'instagram', is_not_empty: true, active: false },
  { name: 'Discord', img: 'discord', is_not_empty: false, active: false },
  { name: 'Google', img: 'google', is_not_empty: false, active: false },
  { name: 'Linkedin', img: 'LinkedIN', is_not_empty: false, active: false },

  { name: 'TikTok', img: 'tiktok', is_not_empty: false, active: false },
  ];
  totalItem = 0;
  currentPage = 0;
  constructor(private userServ: UserServiceService,
    private monitServ: MonitoringService,
    private filterServ: MainFilterService,
    private dashboardServ: DashboardService,
    public dialog: MatDialog) {
    combineLatest([
      this.filterServ.filterSettings$
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([]) => {
      // this.dashboardServ.getResultKey(this.currentPage, this.activeSocial).subscribe(res => {
      //   this.currentSocials = res.data.list;
      //   this.totalItem = res.data.count;
      //   this.showData = true;
      // });
      // ! REQUEST DASHBOARD
      // this.dashboardServ.getDataDashboard().subscribe(res => {
      //   if (res.success) {
      //     this.amount = res.data.amount;
      //     this.plugins = [this.pluginAddText];
      //     this.datasets = [{
      //       // type: 'scatter',
      //       data: res.data.statistic,
      //       backgroundColor: ['#0090FE'],
      //       hoverBackgroundColor: ['#0090FE'],
      //       pointRadius: 7,
      //       hoverRadius: 7,
      //       hoverPointRadius: 10,
      //     }]
      //   }
      // });

      // this.dashboardServ.getDataChartFilter().subscribe(res => {
      //   this.pieChart = res.data;
      // })
    })

    this.userServ.keywordsLimit$.subscribe(data => {
      this.keywordLimit = data;
    });
    this.img.src = 'assets/icons/point.png';
    this.options = {
      layout: {
        padding: {
          right: 10
        }
      },
      elements: {
        point: {
          pointStyle: [this.img]
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        animation: true,
        y: {
          grace: '3%',
          beginAtZero: true,
          min: 0,
          max: 100,
          title: {
            display: true,
            text: 'Positive Influence',
            color: '#828282',
            font: {
              size: 16,
              family: 'Exo',
              lineHeight: 1.4,
              weight: 'normal'
            }
          }
        },
        x: {
          beginAtZero: true,
          grace: '3%',
          title: {
            display: true,
            text: 'Network Presence',
            color: '#828282',
            font: {
              size: 16,
              family: 'Exo',
              lineHeight: 1.4,
              weight: 'normal'
            }
          }
        }
        // x: {
        //   beginAtZero: true,
        //   ticks: {
        //     color: 'red',
        //   },
        //   title: {
        //     display: true,
        //     text: 'Month222'
        //   }
        // }
      },
      // aspectRatio: 1,
      plugins: {
        legend: {
          display: false
        },
      },
    }
  }
  plugins: any[] = [];
  currentWord = 0;
  limitWords = 0;
  ngOnInit(): void {

  }

  scrollBlock() {
    if (this.totalItem > this.currentPage) {
      this.currentPage++;
      this.dashboardServ.getResultKey(this.currentPage, this.activeSocial).subscribe(res => {
        this.currentSocials = [
          ...this.currentSocials,
          ...res.data.list
        ];
        this.totalItem = res.data.count;
        this.showData = true;
      });
    }
  }
  getDataForChart(res: IDataMonitoring) {
    if (res) {
      const arrPosts = [...res.Posts, ...res.Comments];
      this.dataForChartFilter = {
        brands: arrPosts.filter(post => post.Category === 'brands'),
        category: arrPosts.filter(post => post.Category === 'category'),
        general: arrPosts.filter(post => post.Category === 'general'),
        interesting: arrPosts.filter(post => post.Category === 'interesting'),
      }
        //this.getDataForMainChart(arrPosts);
    }
  }

  openPie() {
    this.dashboardServ.getDataChartFilter().subscribe(res => {
      this.pieChart = res.data;
      const dialogRef = this.dialog.open(PieStatisticsComponent, {
        panelClass: 'modalSNI',
        data: {
          pieChart: res.data
        }
      });
    })

  }
  openFilter() {
    const dialogRef = this.dialog.open(MainFilterMobileComponent, {
      panelClass: 'modalSNI',
      data: {}
    });
  }

  changeNetwork(index: number) {
    if (!this.isNetwork[index].is_not_empty) return;

    this.isNetwork.forEach(el => {
      el.active = false;
    });
    this.activeSocial = this.isNetwork[index].name;
    this.isNetwork[index].active = !this.isNetwork[index].active;
    this.showData = false;
    this.currentPage = 0;
    this.dashboardServ.getResultKey(this.currentPage, this.activeSocial).subscribe(res => {
      this.currentSocials = res.data.list;
      this.totalItem = res.data.count;
      this.showData = true;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}

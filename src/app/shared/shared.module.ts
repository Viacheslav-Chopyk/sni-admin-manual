import { MatSelectModule } from '@angular/material/select';
import { CustomDatePipe } from './pipes/customDate.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgChartsModule } from 'ng2-charts';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperAuthComponent } from './components/stepper-auth/stepper-auth.component';
import { CustomPhoneInputComponent } from './components/custom-phone-input/custom-phone-input.component';
import { KeywordsComponent } from './components/keywords/keywords.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UpgradeModalsComponent } from './components/modals/upgrade-modals/upgrade-modals.component';
import { ChartMonitoringComponent } from './components/chart-monitoring/chart-monitoring.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MainFilterComponent } from './components/main-filter/main-filter.component';
import { MainFilterModalComponent } from './components/modals/main-filter-modal/main-filter-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CustomChartGroupsComponent } from './components/custom-chart-groups/custom-chart-groups.component';
import { ChartDoughnutComponent } from './components/chart-doughnut/chart-doughnut.component';
import { ChartFilterComponent } from './components/chart-filter/chart-filter.component';
import { MainFilterModalGroupsComponent } from './components/modals/main-filter-modal-groups/main-filter-modal-groups.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { TypeGroupKeywordComponent } from './components/type-group-keyword/type-group-keyword.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PieStatisticsComponent } from './components/pie-statistics/pie-statistics.component';
import { MainFilterMobileComponent } from './components/modals/main-filter-mobile/main-filter-mobile.component';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';
import { SpriteSvgComponent } from './components/sprite-svg/sprite-svg.component';
import { SocialFilterComponent } from './components/social-filter/social-filter.component';
import { ChartGroupsComponent } from './componens/chart-groups/chart-groups.component';
import { Keywords2Component } from './components/keywords2/keywords2.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const components = [
  StepperAuthComponent,
  CustomPhoneInputComponent,
  KeywordsComponent,
  HeaderComponent,
  SideBarComponent,
  UpgradeModalsComponent,
  ChartMonitoringComponent,
  MainFilterComponent,
  MainFilterModalComponent,
  SpinnerComponent,
  CustomChartGroupsComponent,
  ChartDoughnutComponent,
  ChartFilterComponent,
  SlideToggleComponent,
  MainFilterModalGroupsComponent,
  MainFilterComponent,
  MainFilterModalComponent,
  SpinnerComponent,
  CustomDatePipe,
  TypeGroupKeywordComponent,
  PieStatisticsComponent,
  MainFilterMobileComponent,
  SidebarMobileComponent,
  SpriteSvgComponent,
  SocialFilterComponent,
  ChartGroupsComponent,
]

@NgModule({
  declarations: [
    ...components,
    Keywords2Component,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxChartsModule,
    NgChartsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    InfiniteScrollModule
  ],
  exports: [
    ...components,
    NgChartsModule,
    MatSelectModule,
    Keywords2Component,
  ],
})
export class SharedModule { }

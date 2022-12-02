import { ReservationSuccessComponent } from './reservation-success/reservation-success.component';
import { ConfirmSelectionComponent } from './confirm-selection/confirm-selection.component';
import { InformationSelectionComponent } from './information-selection/information-selection.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { CenterListComponent } from './center-selection/center-search/center-list/center-list.component';
import { CenterSearchBarComponent } from './center-selection/center-search/center-searchBar/center-searchBar.component';
import { CenterSearchComponent } from './center-selection/center-search/center-search.component';
import { CsSearchOptionComponent } from './center-selection/cs-searchOption/cs-searchOption.component';
import { CenterSelectionComponent } from './center-selection/center-selection.component';
import { ReservationStepperComponent } from './reservation-stepper/reservation-stepper.component';
import { ReservationProgressBarComponent } from './reservation-progressBar/reservation-progressBar.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationPageComponent } from './reservationPage.component';
import { CenterItemComponent } from './center-selection/center-search/center-list/center-item/center-item.component';

/**
 * Module that contains the reservation process.
 *
 * @export
 * @class ReservationPageModule
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ReservationPageComponent,
    ReservationStepperComponent,
    CenterSelectionComponent,
    CenterSearchComponent,
    CenterSearchBarComponent,
    CenterListComponent,
    CenterItemComponent,
    CsSearchOptionComponent,
    ReservationProgressBarComponent,
    DateSelectionComponent,
    InformationSelectionComponent,
    ConfirmSelectionComponent,
    ReservationSuccessComponent
  ]
})
export class ReservationPageModule { }

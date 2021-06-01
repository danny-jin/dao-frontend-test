import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '../ui-kit/input/input.module';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';

@NgModule({
  declarations: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    ContractRoutingModule
  ]
})
export class ContractModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SliderCardComponent } from './slider-card/slider-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardComponent } from './card/card.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SliderCardComponent,
    CardComponent
  ],
  exports: [
    SliderCardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }

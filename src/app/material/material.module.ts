import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import  {MatBottomSheetModule,} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PromptComponent } from '../prompt/prompt.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [PromptComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatIconModule
  ],

  exports:[MatSnackBarModule,ReactiveFormsModule,MatListModule,MatBottomSheetModule,MatToolbarModule,MatIconModule]
})
export class MaterialModule { }

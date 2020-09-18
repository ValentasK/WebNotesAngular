import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NoteByIdComponent } from './note-by-id/note-by-id.component';
import { DisplayAllNotesComponent } from './display-all-notes/display-all-notes.component';
import { CreateNewNoteComponent } from './create-new-note/create-new-note.component';





@NgModule({
  declarations: [
    AppComponent,
    NoteByIdComponent,
    DisplayAllNotesComponent,
    CreateNewNoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

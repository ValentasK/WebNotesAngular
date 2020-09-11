import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Note } from "../DTOs/Note"

@Component({
  selector: 'app-display-all-notes',
  templateUrl: './display-all-notes.component.html',
  styleUrls: ['./display-all-notes.component.css']
})
export class DisplayAllNotesComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

  notes: Note[];

  displayNotes(){
    this.data.getAllNotes().subscribe(data => {
      console.log(data);
      this.notes = data;
    })
  }

}

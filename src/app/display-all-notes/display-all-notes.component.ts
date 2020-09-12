import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataService
} from "../data.service";
import {
  Note
} from "../DTOs/Note";
import {NewNote} from "../DTOs/NewNote";
import { Sorting } from "../DTOs/Sorting";

@Component({
  selector: 'app-display-all-notes',
  templateUrl: './display-all-notes.component.html',
  styleUrls: ['./display-all-notes.component.css']
})
export class DisplayAllNotesComponent implements OnInit {

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.displayNotes();
  }

  notes: Note[];
  sorting: Sorting = {
    searchString : ""
  }
  


  displayNotes() {
    this.data.getAllNotes().subscribe(data => {
      console.log(data);
      this.notes = data;


    })
  };

  newFirst() {
    this.notes.sort((a, b) => {
      return b.id - a.id;
    })
    console.log(this.notes);
  }

  oldFirst() {
    this.notes.sort((a, b) => {
      return a.id - b.id
    })
    console.log(this.notes);
  }


  Search(){
    console.log(this.sorting.searchString);

    this.data.getSortedNotes(this.sorting).subscribe(data =>{
      this.notes = data;

      console.log(this.notes);
    })
  }
  
}

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
import {
  NewNote
} from "../DTOs/NewNote";
import {
  Sorting
} from "../DTOs/Sorting";
import {
  Notes
} from "../DTOs/Notes";

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

  notes: Notes;
  sorting: Sorting = {
    searchString: "",
    searchDate: "",
    sortBy: "",
    itemsPerPage:10,
    currentPage : 1
  }

  displayNotes() {

    this.sorting.searchString = ""; // reset the values 
    this.sorting.searchDate = ""; // reset the values 
    this.sorting.sortBy = ""; // reset the values 
    this.sorting.itemsPerPage = 10; // reset the values 
    this.sorting.currentPage = 1; // reset the values 
    this.data.getAllNotes().subscribe(data => { // get notes form the service
      console.log(data);
      this.notes = data;
    })
  };


  Search() {

    //this.sorting.currentPage = 1;
    console.log(this.sorting);

    this.data.getSortedNotes(this.sorting).subscribe(data => {
      this.notes = data;
      console.log(this.notes);
    })
  }

  orderByTitle() {

    if (this.sorting.sortBy === "") {
      this.sorting.sortBy = "title_asc";
      this.Search();
    } else if (this.sorting.sortBy === "title_asc") {
      this.sorting.sortBy = "title_desc";
      this.Search();
    } else {
      this.sorting.sortBy = "title_asc";
      this.Search();
    }
  }

  orderByContent() {

    if (this.sorting.sortBy === "") {
      this.sorting.sortBy = "text_asc";
      this.Search();
    } else if (this.sorting.sortBy === "text_asc") {
      this.sorting.sortBy = "text_desc";
      this.Search();
    } else {
      this.sorting.sortBy = "text_asc";
      this.Search();
    }
  }

  orderByDate() {

    if (this.sorting.sortBy === "") {
      this.sorting.sortBy = "date_asc";
      this.Search();
    } else if (this.sorting.sortBy === "date_asc") {
      this.sorting.sortBy = "date_desc";
      this.Search();
    } else {
      this.sorting.sortBy = "date_asc";
      this.Search();
    }
  }

 /////////// pagination /////////////

 pageUp(){
   if(this.sorting.currentPage < (this.notes.totalRecords / this.sorting.itemsPerPage)){
    this.sorting.currentPage = this.sorting.currentPage + 1;
   }
   this.Search();
 }

 pageDown(){
  if(this.sorting.currentPage > 1){
    this.sorting.currentPage = this.sorting.currentPage - 1;
   }
   this.Search();
 }




}

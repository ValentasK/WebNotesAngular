import { Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import { Note} from "../DTOs/Note";
import {NewNote} from "../DTOs/NewNote";
import { Sorting} from "../DTOs/Sorting";
import {Notes} from "../DTOs/Notes";
import { UpdateNote } from "../DTOs/updateNote";

@Component({
  selector: 'app-display-all-notes',
  templateUrl: './display-all-notes.component.html',
  styleUrls: ['./display-all-notes.component.css']
})
export class DisplayAllNotesComponent implements OnInit {

  constructor(private data: DataService) {}

  displayTotal : boolean = false;

  ngOnInit(): void {
    this.displayNotes();
    this.displayTotal = true;
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
    this.currentNote = 0;
    this.updating = false;
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

 //////////////////// New Note /////////////

 createNewNoteWindow : boolean = false;
 newNote: NewNote = {
  title: "",
  text: ""
}

openForm(){
  this.createNewNoteWindow = true;
}

closeForm(){
  this.createNewNoteWindow = false;
}

createNewNote(){

  this.data.createNewNote(this.newNote).subscribe(data =>{
    console.log(data);                      // once new note is creted then request 
    this.createNewNoteWindow = false;       // is sent to display new notes
    this.clearForm();
    this.displayNotes();
  })



}

clearForm(){
  this.newNote.text = "";
  this.newNote.title = "";
}


//////////////// Update Note //////////////////

currentNote: number = 0;
updating: boolean = false;

updatedNote: UpdateNote = {
  id :0,
  title: "",
  text: "",
  created: null
}

openUpdate(note: Note){

  if(!this.updating){
    this.updating = true;
    this.currentNote = note.id;
    this.updatedNote.id = note.id;
    this.updatedNote.text = note.text;
    this.updatedNote.title = note.title;
    this.updatedNote.created = note.created;
    console.log(this.currentNote);

  }
 
}

closeUpadateNote(){
  this.currentNote = 0;
  this.updating = false;
  console.log(this.currentNote);

  this.updaNote(this.updatedNote);

  this.updatedNote.id = 0;
  this.updatedNote.text = "";
  this.updatedNote.title = "";
}

updaNote(note: UpdateNote){
  console.log("Updated note:", note);
  this.data.updateNote(note).subscribe(data =>{
    console.log(data);
    this.displayNotes();
  })
}


//////////////////// Delete Note ///////////////////

deleteNote(id: number){
  this.data.deleteNote(id).subscribe(data =>{
    console.log("Deleted:", data);
    this.displayNotes();

  })
}

}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
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
export class DisplayAllNotesComponent implements AfterViewInit , OnInit {

  constructor(private data: DataService) {}

  ngAfterViewInit(): void {

      
  }

  



  @ViewChild('textareaRef1') autoresizingRef1: ElementRef; 
  @ViewChild('textareaRef2') autoresizingRef2: ElementRef; 
  @ViewChild('textareaRef3') autoresizingRef3: ElementRef; 


  displayTotal : boolean = false;

  ngOnInit(): void {
    
    this.displayNotes();
    this.displayTotal = true;
  }

  notes: Notes = {
    totalRecords: 0,
    notes: null
  }
  

  sorting: Sorting = {
    searchString: "",
    searchDate: "",
    sortBy: "",
    itemsPerPage:10,
    currentPage : 1
  }

  displayNotes() {
    this.data.getAllNotes().subscribe(data => { // get notes form the service
      this.notes = data;
    })
  };

  resetAll(){
    this.sorting.searchString = ""; // reset the values 
    this.sorting.searchDate = ""; // reset the values 
    this.sorting.sortBy = ""; // reset the values 
    this.sorting.itemsPerPage = 10; // reset the values 
    this.sorting.currentPage = 1; // reset the values 
    this.currentNote = 0;
    this.updating = false;

    this.displayNotes();
  }


  Search() {
    this.data.getSortedNotes(this.sorting).subscribe(data => {
      this.notes = data;
    })
  }

  Search2() {
    this.data.getSortedNotes(this.sorting).subscribe(data => {
      this.notes = data;
      this.sorting.currentPage = 1; // reset the values 
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

  this.data.createNewNote(this.newNote).subscribe(data =>{      // once new note is creted then request 
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
  }
  
}

closeUpadateNote(){
  this.currentNote = 0;
  this.updating = false;
  this.updaNote(this.updatedNote);
  this.updatedNote.id = 0;
  this.updatedNote.text = "";
  this.updatedNote.title = "";
}

updaNote(note: UpdateNote){
  this.updating = false;
  this.data.updateNote(note).subscribe(data =>{
    this.Search();
  })
} 

////////////////// update text area ////////

updateTextArea1(){
  console.log("updateTextArea1()");
   this.autoresizingRef1.nativeElement.style.height = "auto";
   this.autoresizingRef1.nativeElement.style.height = `${this.autoresizingRef1.nativeElement.scrollHeight}px`;
}

updateTextArea2(){
  console.log("updateTextArea2()");
   this.autoresizingRef2.nativeElement.style.height = "auto";
   this.autoresizingRef2.nativeElement.style.height = `${this.autoresizingRef2.nativeElement.scrollHeight}px`;
}





//////////////////// Delete Note ///////////////////

deleteNote(id: number){
  this.data.deleteNote(id).subscribe(data =>{
    console.log("Deleted:", data);
    this.updating = false;
    this.Search();

  })
}


/////////////////////// Cancel Update Note ////////////////////////////

cancelUpadateNote(){
  this.currentNote = 0;
  this.updating = false;
}

}

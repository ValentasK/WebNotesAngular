import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { NewNote } from '../DTOs/NewNote';


@Component({
  selector: 'app-create-new-note',
  templateUrl: './create-new-note.component.html',
  styleUrls: ['./create-new-note.component.css']
})
export class CreateNewNoteComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

  newNote: NewNote = {
    title: "",
    text: ""
  }

  createNewNote(){

    this.data.createNewNote(this.newNote).subscribe(data =>{
      console.log(data);
    })
    console.log(this.newNote)
  }

  clearForm(){
    this.newNote.text = "";
    this.newNote.title = "";
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Note } from "./Note";
import { NewNote } from "./NewNote";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getNoteById(ID:number){
  return this.http.get<Note>(`https://localhost:44339/api/Notes/${ID}`);
}

 getAllNotes(){
  return this.http.get<Note[]>("https://localhost:44339/api/Notes");
 }

 newNote : NewNote = {
  title: "",
  text: ""
}

createNewNote(note: Note){
 
  this.newNote.title = note.title;
  this.newNote.text = note.text;

  return this.http.post<NewNote>("https://localhost:44339/api/Notes",this.newNote);
}

}

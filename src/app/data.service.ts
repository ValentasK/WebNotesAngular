import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Note } from "./DTOs/Note";
import { NewNote } from "./DTOs/NewNote";
import { from } from 'rxjs';
import { Sorting } from './DTOs/Sorting';

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

createNewNote(newNote: NewNote){
  return this.http.post<NewNote>("https://localhost:44339/api/Notes",newNote);
}



getSortedNotes(sorting: Sorting){
  return this.http.get<Note[]>(`https://localhost:44339/api/Notes?searchString=${sorting.searchString}`);
}

}

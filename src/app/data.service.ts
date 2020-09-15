import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Note } from "./DTOs/Note";
import { NewNote } from "./DTOs/NewNote";
import { from } from 'rxjs';
import { Sorting } from './DTOs/Sorting';
import { Notes } from "./DTOs/Notes"
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getNoteById(ID:number){
  return this.http.get<Note>(`https://localhost:44339/api/Notes/${ID}`);
}

 getAllNotes(){
  return this.http.get<Notes>("https://localhost:44339/api/Notes");
 }

//  newNote : NewNote = {
//   title: "",
//   text: ""
// }

createNewNote(newNote: NewNote){
  return this.http.post<NewNote>("https://localhost:44339/api/Notes",newNote);
}





getSortedNotes(sorting: Sorting){

  let url : string = `https://localhost:44339/api/Notes?searchString=${sorting.searchString}`;

  if(sorting.searchDate){
    url = url + `&searchDate=${sorting.searchDate}`;
  }
  if(sorting.sortBy){
    url = url + `&sortNotesBy=${sorting.sortBy}`;
  }
  if(sorting.itemsPerPage){
    url = url + `&itemsPerPage=${sorting.itemsPerPage}`;
  }
  if(sorting.currentPage){
    url = url + `&currentPage=${sorting.currentPage}`;
  }

  return this.http.get<Notes>(url);

  //return this.http.get<Notes>(`https://localhost:44339/api/Notes?searchString=${sorting.searchString}&searchDate=${sorting.searchDate}&sortNotesBy=${sorting.sortBy}&itemsPerPage=${sorting.itemsPerPage}&currentPage=${sorting.currentPage}`);
}

}


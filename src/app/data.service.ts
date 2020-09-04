import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Note } from "./Note";

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
}

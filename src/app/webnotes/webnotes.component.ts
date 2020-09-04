import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Note } from "../Note";

@Component({
  selector: 'app-webnotes',
  templateUrl: './webnotes.component.html',
  styleUrls: ['./webnotes.component.css']
})
export class WebnotesComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

 noteID: number = 1;
 noteFound:boolean = false;
 buttonPressed:boolean = false;

  note: Note;
  

  getNote(){
    this.data.getNoteById(this.noteID).subscribe(data => {
      console.log(data);
      this.note = data;
      this.noteFound = true;
    }, error =>{
      this.note = null;
      console.log("id not found");
      this.noteFound = false;
    });
    this.buttonPressed = true;
  }

}

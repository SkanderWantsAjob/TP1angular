import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  standalone:true,
  styleUrls: ["./autocomplete.component.css"],
  imports:[CommonModule, ReactiveFormsModule]
})
export class AutocompleteComponent {
  cvControl = new FormControl('');
  cvs: Cv[] = [];
  @Output() selectedCv = new EventEmitter<Cv>();

  constructor(private cvService: CvService) {
   
    this.cvControl.valueChanges.pipe(
      debounceTime(500),           
      distinctUntilChanged(),      
      switchMap(value => this.cvService.searchCvs(String(value)))  ).subscribe((cvs: Cv[]) => {
      this.cvs = cvs;
    }, error => {
      console.error('Error fetching CVs:', error);
    });
  }

  onSelect(cv: Cv) {
    this.selectedCv.emit(cv);  
  }
}

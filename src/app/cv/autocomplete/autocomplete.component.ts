import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  searchControl = new FormControl('');
  filteredCvs$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.cvService.searchCvs(String(query))) 
  );

  @Output() selectedCv = new EventEmitter<Cv>(); 

  constructor(private cvService: CvService) {}

  onSelect(cv: Cv): void {
    this.selectedCv.emit(cv); 
  }
}

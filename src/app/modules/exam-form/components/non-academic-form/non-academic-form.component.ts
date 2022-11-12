import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-non-academic-form',
  templateUrl: './non-academic-form.component.html',
  styleUrls: ['./non-academic-form.component.css']
})
export class NonAcademicFormComponent implements OnInit {
  nonAcademicForm: FormGroup;
  @Input() formValue;
  @Output() formValueOutput = new EventEmitter();
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.nonAcademicForm = this.fb.group({
      physicalEdu: 'A+',
      senseDev: 'A+',
      gardening: 'A+',
      handWork: 'A+',
      musicalDance: 'A+',
      creativity: 'A+',
      remark: 'Good'
    });
    console.log(this.formValue)
    this.nonAcademicForm.patchValue(this.formValue.nonAcademic);
    this.nonAcademicForm.valueChanges.subscribe(res=>{
      console.log(res);
      
        this.formValueOutput.emit({value:res,mode:this.formValue.name})
    })
  }
}

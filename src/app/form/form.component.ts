import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Suppliers } from '../form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    suppliers: Suppliers[]= [];
    formGroup : FormGroup;
    isEditing: boolean = false;

  constructor (private formService: FormService,
    private formBuilder: FormBuilder
   ){
       this.formGroup = formBuilder.group({
           id : [''],
           nome : [''],
           ativo : [],
           categoria: [''],
           contato : ['']
       });

   }

  ngOnInit(): void {
    this.loadSupplier();
  }


  loadSupplier(){
    this.formService.getSuppliers().subscribe(
      {
       next: data => this.suppliers = data,
       error:(msg) => console.log("Erro ao chamar o endpoint" + msg)
      }
    )
  }

  save(){
    if(this.isEditing){

      this.formService.update(this.formGroup.value).subscribe({

        next: () => {
          this.loadSupplier();
          this.formGroup.reset();
          this.isEditing = false;
        }
      })
    }else{
      this.formService.save(this.formGroup.value).subscribe({
        next: data => {
          this.suppliers.push(data);
          this.formGroup.reset();

        }
    }
    );
    }
  }
  remove(supplier : Suppliers): void{
      this.formService.remove(supplier).subscribe({
        next: () => this.loadSupplier()
      });

  }

  edit(supplier : Suppliers): void{
      this.formGroup.setValue(supplier);
      this.isEditing = true;
  }

}

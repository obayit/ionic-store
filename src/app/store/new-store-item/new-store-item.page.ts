import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StoreItem } from 'src/app/interfaces/store-item';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-store-item',
  templateUrl: './new-store-item.page.html',
  styleUrls: ['./new-store-item.page.scss'],
})
export class NewStoreItemPage implements OnInit {
  currentUser: User;
  item = new StoreItem();
  form = this.fb.group({
    name: ['USB Cable'],
    description: ['Charging & Data Cable'],
    additionalFeatures: ['Can also be used as a whip'],
    price: [99.99],
    currency: 'SDG',
  });
  showSpinner = false;
  response = ''
  progressBar = 0.0
  image: any;
  @ViewChild('imageInput') imageInput: ElementRef;


  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public storeService: StoreService,
    public afStorage: AngularFireStorage
    ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user[0];
    });
  }

  onSubmit(){
    this.showSpinner = true;
    let task = this.uploadFile();
    if(task){
      task.then((fileSnap)=>{
        fileSnap.ref.getDownloadURL().then((fileUrl)=>{
          this.addItem(fileUrl);
        });
      });
    }
  }
  addItem(fileUrl=''){
    this.item = {
      name: this.name,
      description: this.description,
      additionalFeatures: this.additionalFeatures,
      price: this.price,
      currency: this.currency,
      imageUrl: fileUrl,
    };
    this.storeService.addItem(this.item).then((value) => {
      this.showSpinner = false;
      this.progressBar += 0.5;
      this.response = 'Item added successfully id#' + value.id;
    }).catch((error) => {
      this.showSpinner = false;
      this.response = 'Adding item failed ' + error;
    });
  }
  fileChange(event){
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = ($innerEvent) => {
        this.image = $innerEvent.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadFile(){
    const nativeEl = this.imageInput.nativeElement;
    if(nativeEl.files && nativeEl.files[0]){
      ;
      const file = this.imageInput.nativeElement.files[0];
      const filePath = 'store-items/' + uuidv4() + file.name;
      const ref = this.afStorage.ref(filePath);
      const task = ref.put(file);
      task.percentageChanges().subscribe((value) => {
        this.progressBar = value/(2*100);
        console.log('setting progressBar to ', this.progressBar);
      })
      return task;
    }
    return false;
  }

  get name() { return this.form.get('name').value; }
  get description() { return this.form.get('description').value; }
  get additionalFeatures() { return this.form.get('additionalFeatures').value; }
  get price() { return this.form.get('price').value; }
  get currency() { return this.form.get('currency').value; }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat';
import { Subscription, combineLatest, forkJoin, from, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
 
export class FirebaseService {
 
  constructor(private firestore: AngularFirestore,private db: AngularFireDatabase, private storage: AngularFireStorage) { }
 
 
  create_NewStudent(record: unknown) {
    return this.firestore.collection('Students').add(record);
  }
  read_bookList() {
    return this.firestore.collection('books').snapshotChanges();
  }
 
  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }
  read_NoteBookItems() {
    return this.firestore.collection('NoteBookItems').snapshotChanges();
  }
  read_noteBookAccesories() {
    return this.firestore.collection('noteBookAccesories').snapshotChanges();
  }
  read_schollBags() {
    return this.firestore.collection('schollBags').snapshotChanges();
  }
  read_schollUiniforms() {
    return this.firestore.collection('schollUiniforms').snapshotChanges();
  }
  read_schollTifinBoxs() {
    return this.firestore.collection('schollTifinBoxs').snapshotChanges();
  }
  read_inventoryBookList() {
    return this.firestore.collection('inventoryBookList').snapshotChanges();
  }
  read_cartItems() {
    return this.firestore.collection('cartItems').snapshotChanges();
  }
  update_cartItems(recordID: string,record: Partial<unknown>){
    this.firestore.doc('cartItems/' + recordID).update(record);
  }
  add_cartItem(item: unknown){
    return this.firestore.collection('cartItems').add(item);
  }
  delete_cartItem(record_id: string) {
    this.firestore.doc('cartItems/' + record_id).delete();
  }
  delete_inventoryBookList(record_id: string) {
    this.firestore.doc('inventoryBookList/' + record_id).delete();
  }
  read_orderList() {
    return this.firestore.collection('orderList').snapshotChanges();
  }
  create_SchoolList(record: unknown) {
    return this.firestore.collection('my-school-list').add(record);
  }
  create_User(record: unknown) {
    return this.firestore.collection('user').add(record);
  }
  getUser(){
    return this.firestore.collection('user').snapshotChanges();
  }
  read_User(record: any) {
    let usercollection = this.firestore.collection('/user', ref => ref.where("email", "==", record));
    return usercollection.snapshotChanges();
    // this.firestore.collection("cities").where("capital", "==", true)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    //var myUserId = firebase.auth().currentUser.uid;
    // var myReviews = this.firestore.collection('user');
    // var query = myReviews.where()
    //   .where('author', '==', myUserId);
    // myReviews.get().then(function (querySnapshot) {
    //    // Do something with these reviews!
    // })
    // return this.firestore.collectionGroup("user").where("email", "==", "utsahpaikray@gmail.com");;
  }
  checkCartItem(id: any){
    let AvailableCartItem = this.firestore.collection('/cartItems', ref => ref.where("id", "==", id));
    return AvailableCartItem.snapshotChanges();
  }
  update_user(recordID: string,record: Partial<unknown>){
    this.firestore.doc('user/' + recordID).update(record);
  }
  
  read_SchoolList() {
    return this.firestore.collection('my-school-list').snapshotChanges();
  }
  updateStudent(path: string,recordID: any,record: Partial<unknown>){
   return this.firestore.doc(`${path}/${recordID}`).update(record);
  }
 
  deleteStudent(path: string,recordID: any) {
    this.firestore.doc(`${path}/${recordID}`).delete();
  }
  getAllstudent(){
    return this.firestore.collection('studentInfo').valueChanges({ idField: '$id' });
  }
  getAllStudentSession(session: string){
    return this.firestore.collection('studentInfo', ref => ref.where(session, '==', true)).valueChanges({ idField: '$id' });
  }
  getAll(path: string){
    return this.firestore.collection(path).valueChanges({ idField: '$id' });
  }
  getGallery(id: string | undefined){
    return this.firestore.collection('gallery').doc(id).valueChanges();
  }
  deleteGallery(recordID: any) {
    this.firestore.doc(`gallery/${recordID}`).delete();
  }
  saveGallery({ id,record }: { id: string, record: unknown }) {
    this.firestore.collection('gallery').doc(id).set(record);
   }
  getAllstudentFee(path: string){
    return this.firestore.collection(path).valueChanges({ idField: '$id' });
  }
  getAllFaculty(){
    return this.firestore.collection('faculty').valueChanges({ idField: '$id' });
  }
  getAllExamDetail(){
    return this.firestore.collection('exam-detail').valueChanges({ idField: '$id' });
  }
  getAllExamInfo(){
    return this.firestore.collection('examInfo').valueChanges({ idField: '$id' });
  }
  updateExamInfo(recordID: any,record: Partial<unknown>){
    this.firestore.doc(`examInfo/${recordID}`).update(record);
   }
  getAllOffering(){
    return this.firestore.collection('offering').valueChanges({ idField: '$id' });
  }
  updateOffering(recordID: any,record: Partial<unknown>){
    this.firestore.doc(`offering/${recordID}`).update(record);
   }
  
   deleteOffering(recordID: any){
  
    this.firestore.doc(`offering/${recordID}`).delete();
   }
   getAllEventTransaction(){
    return this.firestore.collection('event-transactions').valueChanges({ idField: '$id' });
  }
   updateTransactions(recordID: any,record: Partial<unknown>){
    this.firestore.doc(`event-transactions/${recordID}`).update(record);
   }
  addHoliday(){

  }
  addNewStudent(path: string,id: string | undefined,record: unknown) {
    this.firestore.collection(path).doc(id).set(record);
   }
   getNotication(){
    return this.firestore.collection('notification').valueChanges({ idField: '$id' });
   }
   getAllProducts(){
     return this.firestore.collection('store').valueChanges({ idField: '$id' });
   }
   addProduct(item: unknown){
     return this.firestore.collection('store').add(item);
   }
  updateProduct(recordID: any, record: Partial<unknown>){
     this.firestore.doc(`store/${recordID}`).update(record);
   }
  deleteProduct(recordID: any) {
    this.firestore.doc(`store/${recordID}`).delete();
  }
  pushItems(endPoint: string,item: any){
   return this.firestore.firestore.collection(endPoint).add(item);
    
  }
  getItems(endPoint: string){
   return this.firestore.collection(endPoint).valueChanges({ idField: '$id' });
    
  }
  getFileList() {
    let fileList: string[] = []; // Changed type to string[] since we'll store URLs
    const ref = this.storage.ref('');
    ref.listAll().subscribe((data) => {
      console.log(data)
      // for (let item of data.items) {
      //   let name = item.name;
      //   let newRef = this.storage.ref(name);
  
      //   newRef.getDownloadURL().subscribe((downloadURL) => {
      //     fileList.push(downloadURL); // Add the URL to the array
      //     console.log(`URL for ${name}:`, downloadURL);
      //   });
      // }
    })
    const storageRef = this.storage.ref('')
    storageRef.getDownloadURL().subscribe((url) => {
      console.log(url);
    });
  }
  getFileListup(location: string) {
    const storageRef = this.storage.ref(location);
    return storageRef.listAll().pipe(
        switchMap(result => {
            const urlObservables = result.items.map(item => from(item.getDownloadURL()));
            return combineLatest(urlObservables);
        })
    );
}
}
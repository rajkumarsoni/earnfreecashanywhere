import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FirestoreDbProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FirestoreDbProvider Provider');
  }

}

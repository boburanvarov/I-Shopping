import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {

    private messageSource = new BehaviorSubject({type: '', filter: ''});
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message: any) {
        this.messageSource.next(message);
    }

}
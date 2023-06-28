import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackbar: MatSnackBar) { }

  show(msg: string, type?: string) {
    let cssClass = 'message-info'
    if (type == 'error') {
      cssClass = 'message-error'
    }
    if (type == 'success') {
      cssClass = 'message-success'
    }
    if (type == 'info') {
      cssClass = 'message-info'
    }
    this._snackbar.open(msg, 'Fermer', {
      panelClass: cssClass
    })
  }
}

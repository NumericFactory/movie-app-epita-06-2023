import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// export enum MessageType {
//   error = 'error',
//   success = 'success',
//   info = 'info'
// }

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackbar: MatSnackBar) { }

  show(msg: string, type?: 'error' | 'success' | 'info') {
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
      panelClass: cssClass,
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}

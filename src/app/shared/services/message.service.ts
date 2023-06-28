import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackbar: MatSnackBar) { }

  show(msg: string,) {
    this._snackbar.open(msg, 'Fermer')
  }
}

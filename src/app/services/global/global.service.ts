import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public ModuleHasCreated: boolean = false; // Boleano para identificar si ya el modulo fue creado, y solo es para editar
  public CurrentCourse: number = 0; // ID actual del curso que se esta integrando el modulo
  constructor(public matSnack: MatSnackBar) { }

  OpenSnackBar(msg: string, Timer: number = 3000, ): void {
    this.matSnack.open(msg, null, {duration: Timer});
  }
}

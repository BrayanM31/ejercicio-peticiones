import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador para el rango de precio (10 a 100)
export function precioRangoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const precio = control.value;
    
    if (precio === null || precio === undefined || precio === '') {
      return null; // No validar si está vacío (lo maneja required)
    }
    
    if (precio < 10 || precio > 100) {
      return { precioFueraDeRango: { valor: precio } };
    }
    
    return null;
  };
}

// Validador para código de producto (letra seguida de números)
export function codigoProductoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const codigo = control.value;
    
    if (!codigo) {
      return null; // No validar si está vacío
    }
    
    // Patrón: una letra seguida de uno o más números
    const patron = /^[A-Za-z]\d+$/;
    
    if (!patron.test(codigo)) {
      return { codigoInvalido: true };
    }
    
    return null;
  };
}

// Validador para nombre del producto (mínimo 5 caracteres)
export function nombreMinimoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const nombre = control.value;
    
    if (!nombre) {
      return null; // Lo maneja required
    }
    
    if (nombre.trim().length < 5) {
      return { nombreCorto: true };
    }
    
    return null;
  };
}

// Validador para costo mayor a cero
export function costoValidoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const costo = control.value;
    
    if (costo === null || costo === undefined || costo === '') {
      return null; // No validar si está vacío
    }
    
    if (costo <= 0) {
      return { costoInvalido: true };
    }
    
    return null;
  };
}
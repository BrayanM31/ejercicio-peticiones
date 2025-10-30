import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Producto } from '../../models/producto.model';
import { 
  precioRangoValidator, 
  codigoProductoValidator, 
  nombreMinimoValidator,
  costoValidoValidator 
} from '../../validators/producto.validators';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productoForm!: FormGroup;
  productos: Producto[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'costo', 'precio', 'valor', 'acciones'];
  editando: boolean = false;
  indiceEdicion: number = -1;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.productoForm = this.fb.group({
      codigo: ['', [
        Validators.required,
        codigoProductoValidator()
      ]],
      nombre: ['', [
        Validators.required,
        nombreMinimoValidator()
      ]],
      costo: ['', [
        Validators.required,
        costoValidoValidator()
      ]],
      precio: ['', [
        Validators.required,
        precioRangoValidator()
      ]],
      valor: ['', [
        Validators.required,
        Validators.min(0)
      ]]
    });
  }

  // Getters para facilitar el acceso a los controles
  get codigo() { return this.productoForm.get('codigo'); }
  get nombre() { return this.productoForm.get('nombre'); }
  get costo() { return this.productoForm.get('costo'); }
  get precio() { return this.productoForm.get('precio'); }
  get valor() { return this.productoForm.get('valor'); }

  // Mensajes de error personalizados
  obtenerErrorCodigo(): string {
    if (this.codigo?.hasError('required')) {
      return 'El código es requerido';
    }
    if (this.codigo?.hasError('codigoInvalido')) {
      return 'El código debe iniciar con una letra seguida de números (Ej: A001)';
    }
    return '';
  }

  obtenerErrorNombre(): string {
    if (this.nombre?.hasError('required')) {
      return 'El nombre es requerido';
    }
    if (this.nombre?.hasError('nombreCorto')) {
      return 'El nombre del producto debe tener mínimo 5 caracteres';
    }
    return '';
  }

  obtenerErrorCosto(): string {
    if (this.costo?.hasError('required')) {
      return 'El costo es requerido';
    }
    if (this.costo?.hasError('costoInvalido')) {
      return 'Ingrese un costo válido';
    }
    return '';
  }

  obtenerErrorPrecio(): string {
    if (this.precio?.hasError('required')) {
      return 'El precio es requerido';
    }
    if (this.precio?.hasError('precioFueraDeRango')) {
      return 'El precio está fuera de rango';
    }
    return '';
  }

  obtenerErrorValor(): string {
    if (this.valor?.hasError('required')) {
      return 'El valor es requerido';
    }
    if (this.valor?.hasError('min')) {
      return 'El valor debe ser mayor o igual a cero';
    }
    return '';
  }

  // Agregar o actualizar producto
  guardarProducto(): void {
    if (this.productoForm.valid) {
      const producto: Producto = this.productoForm.value;

      if (this.editando) {
        this.productos[this.indiceEdicion] = producto;
        this.mostrarMensaje('Producto actualizado correctamente');
        this.editando = false;
        this.indiceEdicion = -1;
      } else {
        this.productos.push(producto);
        this.mostrarMensaje('Producto agregado correctamente');
      }

      this.productoForm.reset();
    } else {
      this.mostrarMensaje('Por favor, corrija los errores del formulario');
      this.productoForm.markAllAsTouched();
    }
  }

  // Editar producto
  editarProducto(producto: Producto, indice: number): void {
    this.productoForm.patchValue(producto);
    this.editando = true;
    this.indiceEdicion = indice;
    this.mostrarMensaje('Editando producto...');
  }

  // Eliminar producto
  eliminarProducto(indice: number): void {
    this.productos.splice(indice, 1);
    this.mostrarMensaje('Producto eliminado correctamente');
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.productoForm.reset();
    this.editando = false;
    this.indiceEdicion = -1;
    this.mostrarMensaje('Edición cancelada');
  }

  // Mostrar mensaje
  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
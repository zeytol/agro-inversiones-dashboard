import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CarritoService } from '../../../services/carrito.service';
import { ClienteService } from '../../../services/cliente.service';
import { InvoiceService, InvoiceRequest, InvoiceItem } from '../../../services/invoice.service';
import { ProductsService } from '../../../services/products.service';
import { PaymentMethodService } from '../../../services/payment-method.service';  // Importar el servicio


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  isLoading: boolean = true;  // Nueva propiedad para el indicador de carga
  invoiceDetails: any = {}; 
  selectedInvoiceType: string = '';   
  quantity: number = 1;
  invoiceDate: string = new Date().toISOString().split('T')[0];
  invoiceNumber: string = '';  
  selectedProduct: any = null;
  carrito: any[] = [];
  codigoProducto: string = '';
  productoEncontrado: any = null;
  productos: any[] = [];  // Agregar una propiedad para almacenar los productos


  totalGravada: number = 0;
  totalIgv: number = 0;
  totalFactura: number = 0;

  isSidebarVisible = true;
  dni: string = '';
  mostrarAgregarCliente = false;
  mostrarConfirmacionDni = false;  

  paymentMethods: any[] = []; // Lista de métodos de pago
  selectedPaymentMethod: number | null = null; // Método de pago seleccionado
  operationNumber: string = ''; // Número de operación (si aplica)

  // Nuevos campos del cliente
  name: string = '';
  typeCustomer: string = '';
  documentType: string = '';
  documentNumber: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';

  
  constructor(
    private carritoService: CarritoService,
    private clienteService: ClienteService,
    private invoiceService: InvoiceService,
    private productsService: ProductsService,
    private paymentMethodService: PaymentMethodService
  ) {}  

  ngOnInit(): void {
    this.cargarMetodosDePago();
    this.carrito = this.carritoService.getCarrito();
    this.productsService.getProductos().subscribe((productos) => {
      if (productos && productos.length > 0) {
        console.log('Productos cargados:', productos);
        this.productos = productos;
      } else {
        console.log('No se encontraron productos');
      }
      this.isLoading = false;  // Cuando los productos se cargan, desactivamos el indicador de carga
    });
  }

  onTipoComprobanteChange(tipo: string) {
    this.selectedInvoiceType = tipo;
    this.cargarNumeroFactura();
  }

  onProductSelect(product: any) {
    this.selectedProduct = product;
    this.quantity = 1;
  }

  buscarProductoPorCodigo() {
    if (this.isLoading) {
      alert('Productos están siendo cargados. Por favor, espera.');
      return;
    }

    if (!this.codigoProducto.trim()) {
      alert('Por favor ingrese un código de producto válido');
      return;
    }

    //const producto = this.productos.find(p => p.codeProduct === this.codigoProducto.trim());
    const producto = this.productos.find(p => p.codeProduct.toLowerCase() === this.codigoProducto.trim().toLowerCase());
    if (producto) {
      this.productoEncontrado = producto;
    } else {
      this.productoEncontrado = null;
      alert('Producto no encontrado');
    }
  }

  cerrarModal() {
    this.productoEncontrado = null;
    this.quantity = 1;
  }

  agregarProductoDesdeModal() {
    if (this.quantity < 1) return;
  
    // Verificar si el producto ya existe en el carrito
    const productoExistente = this.carrito.find(item => item.codeProduct === this.productoEncontrado.codeProduct);
  
    if (productoExistente) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      productoExistente.cantidad += this.quantity;
      this.carritoService.actualizarCarrito(this.carrito); // Actualizar el carrito con la nueva cantidad
    } else {
      const productoConCantidad = {
        ...this.productoEncontrado,
        cantidad: this.quantity
      };
      this.carritoService.agregarProducto(productoConCantidad);
    }
  
    this.carrito = this.carritoService.getCarrito(); // Recargar el carrito después de actualizar
    console.log('Producto agregado:', this.productoEncontrado);
    this.cerrarModal();
  }
  
  cargarMetodosDePago() {
    this.paymentMethodService.obtenerMetodosDePago().subscribe((data: any[]) => {
      this.paymentMethods = data;
    });
  }

  private cargarNumeroFactura() {
    const tipo = this.selectedInvoiceType === 'Factura' ? 'FACTURA' : 'BOLETA';
    
    this.invoiceService.obtenerNumeroFactura(tipo).subscribe({
      next: (numeroFactura) => {
        this.invoiceNumber = numeroFactura;
      },
      error: (err) => {
        console.error('Error al obtener el número de factura:', err);
        Swal.fire('Error', 'No se pudo obtener el número de factura', 'error');
      }
    });
  }

  subtotal(): number {
    return this.carritoService.calcularSubtotal();  // Muestra el Subtotal
  }
  
  igv(): number {
    return this.carritoService.calcularIGV();  // Muestra el IGV (solo para Factura)
  }

  total(): number {
    if (this.selectedInvoiceType === 'Factura') {
      return this.carritoService.calcularTotalConIGV();  // Si es Factura, incluir IGV
    } else {
      return this.carritoService.calcularTotalSinIGV();  // Si es Boleta, no incluir IGV
    }
  }

  eliminarItem(item: any): void {
    this.carrito = this.carrito.filter(p => p.name !== item.name);
    this.carritoService.setCarrito(this.carrito); // actualizamos el servicio también
  }
  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index); // elimina en localStorage
    this.carrito = this.carritoService.getCarrito();
  }


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }

  private updateChartsSize() {
  }

   

  validarCliente() {
    if (!this.documentType || !this.documentNumber || !this.name || !this.address) {
      Swal.fire('Error', 'Complete todos los campos del cliente', 'warning');
      return false;
    }
    return true;
  }

  enviarFactura() {
    if (!this.validarCliente()) return;

    // Validar stock antes de crear los items
    const productoConStockInsuficiente = this.carrito.find(item => {
      const producto = this.productos.find(p => p.codeProduct === item.codeProduct);
      return producto && item.cantidad > producto.amount;
    });

    if (productoConStockInsuficiente) {
      Swal.fire('Stock insuficiente', `El producto ${productoConStockInsuficiente.name} no tiene stock suficiente.`, 'warning');
      return;
    }

    const productos: InvoiceItem[] = this.carrito.map(item => {
      const cantidad = item.cantidad || 0;
      const valorUnitario = item.salePrice || 0;
      const subtotal = +(cantidad * valorUnitario).toFixed(2);
      const igv = +(subtotal * 0.18).toFixed(2);
      const totalItem = +(subtotal + igv).toFixed(2);

      console.log(`Producto: ${item.name}, Subtotal: ${subtotal}, IGV: ${igv}, Total: ${totalItem}`);

      return {
        unidadDeMedida: 'Unidad',
        codigo: item.codeProduct,
        descripcion: item.name,
        cantidad,
        valorUnitario,
        precioUnitario: +(valorUnitario * 1.18),
        subtotal,
        igv,
        total: totalItem
      };
    });

    console.log('Productos antes del cálculo de totales:', productos);


    const totalGravada = +productos.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
    const totalIgv = +productos.reduce((sum, item) => sum + item.igv, 0).toFixed(2);
    const totalFactura = +(totalGravada + totalIgv).toFixed(2);

    // Determinar tipo de comprobante
    const tipoDeComprobante = this.selectedInvoiceType === 'Factura' ? 1 :
    this.selectedInvoiceType === 'Boleta' ? 3 : 0;

    const serie = this.selectedInvoiceType === 'Factura' ? 'F001' : 
    this.selectedInvoiceType === 'Boleta' ? 'B001' : '';

    // Validar tipo de comprobante
    if (tipoDeComprobante === 0) {
    Swal.fire('Error', 'Seleccione un tipo de comprobante válido', 'warning');
    return;
    }

    // Verificar si los totales son válidos antes de enviar
    if (isNaN(totalGravada) || isNaN(totalIgv) || isNaN(totalFactura)) {
      console.error('Error: Totales no válidos.');
      return;  
    }

    console.log('Total Gravada:', totalGravada);
    console.log('Total IGV:', totalIgv);
    console.log('Total Factura:', totalFactura);

    const moneda: number = 1; // Cambiar a 1 o 2 según la moneda seleccionada


    if (this.selectedPaymentMethod === null) {
      Swal.fire('Error', 'Seleccione un método de pago', 'warning');
      return;
    }

    const factura: InvoiceRequest = {
      tipoDeComprobante,
      serie,   
      clienteTipoDocumento: this.documentType,
      clienteNumeroDeDocumento: this.documentNumber,
      clienteDenominacion: this.name,
      clienteDireccion: this.address,
      fechaDeEmision: new Date().toISOString().split('T')[0],
      moneda: moneda, 
      porcentajeDeIgv: 18,
      totalGravada,
      totalIgv: tipoDeComprobante === 1 ? totalIgv : 0,
      total: tipoDeComprobante === 1 ? totalFactura : totalGravada,
      items: productos.map(item => ({
        ...item,
        igv: tipoDeComprobante === 1 ? item.igv : 0,
        total: tipoDeComprobante === 1 ? item.total : item.subtotal
      })),
      paymentMethod: this.selectedPaymentMethod,  
      operationNumber: this.operationNumber // ✅ solo si agregaste esta propiedad al tipo
    };
  
    console.log('Factura a enviar:', factura);


    this.invoiceService.enviarFactura(factura).subscribe({
      next: (response) => {
        const mensaje = this.selectedInvoiceType === 'Factura'
          ? 'Factura enviada correctamente'
          : 'Boleta enviada correctamente';
  
        Swal.fire('Éxito', mensaje, 'success').then(() => {
         
          this.carrito.forEach(item => {
            const producto = this.productos.find(p => p.codeProduct === item.codeProduct);
            if (producto) {
              producto.amount -= item.cantidad;   
            }
          });
          this.limpiarCamposVenta();
          this.carritoService.limpiarCarrito();
          this.carrito = this.carritoService.getCarrito(); 
        });
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo enviar la factura/boleta', 'error');
        console.error(err);
      }
    });
  }

  private limpiarCamposVenta() {
    // Limpiar el carrito
    this.carritoService.limpiarCarrito();
    this.carrito = [];
  
    // Limpiar selección de producto
    this.codigoProducto = '';                
    this.productoEncontrado = null;
    this.quantity = 1;
    this.totalGravada = 0;
    this.totalIgv = 0;
    this.totalFactura = 0;
  
    // Limpiar los datos del cliente
    this.dni = '';
    this.name = '';
    this.typeCustomer = '';
    this.documentType = '';
    this.documentNumber = '';
    this.address = '';
    this.phone = '';
    this.email = '';

    // Limpiar datos de factura
    this.selectedInvoiceType = '';          
    this.invoiceNumber = '';
    this.invoiceDate = new Date().toISOString().split('T')[0];
    this.mostrarAgregarCliente = false;
    this.mostrarConfirmacionDni = false;
  
    Swal.fire('Venta exitosa', 'Los campos se han limpiado para una nueva venta', 'success');
  }

  cancelarVenta(): void {
    this.limpiarCamposVenta();  
    Swal.fire('Operación cancelada', 'Todos los campos han sido reiniciados.', 'info');
  }

  buscarCliente() {
    if (!this.dni || this.dni.length < 8) return;  
  
    this.clienteService.getClientePorDni(this.dni).subscribe(
      (cliente) => {
        
        this.name = cliente.name;
        this.typeCustomer = cliente.typeCustomer;
        this.documentType = cliente.documentType;
        this.documentNumber = cliente.documentNumber;
        this.address = cliente.address;
        this.phone = cliente.phone;
        this.email = cliente.email;
        this.mostrarAgregarCliente = false;
      },
      (error) => {
         
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          text: '¿Desea agregar un nuevo cliente?',
          showCancelButton: true,
          confirmButtonText: 'Sí, agregar',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.documentNumber = this.dni;
            this.resetFormExceptDNI();
            this.mostrarAgregarCliente = true;
          }
        });
      }
    );
  }

  abrirAgregarCliente() {
    this.mostrarAgregarCliente = true;
  }

  cerrarAgregarCliente() {
    this.mostrarAgregarCliente = false;
    this.resetForm();
  }

  agregarCliente() {
    if (!this.documentNumber || !this.name) {
      this.mostrarError("Todos los campos obligatorios deben completarse.");
      return;
    }

    console.log(`Cliente agregado: ${this.name}, DNI: ${this.documentNumber}`);
    this.cerrarAgregarCliente();

    Swal.fire({
      icon: 'success',
      title: 'Registro guardado',
      text: 'El cliente ha sido guardado correctamente',
      confirmButtonText: 'OK'
    }).then(() => {
      this.mostrarConfirmacionDni = true;
    });
  }

  confirmarDniCliente() {
    console.log(`DNI confirmado: ${this.documentNumber}`);
    this.mostrarConfirmacionDni = false;
  }

  cancelar() {
    this.cerrarAgregarCliente();
  }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33'
    });
  }
  

  private resetForm() {
    this.name = '';
    this.typeCustomer = '';
    this.documentType = '';
    this.documentNumber = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }

  private resetFormExceptDNI() {
    this.name = '';
    this.typeCustomer = '';
    this.documentType = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }
}

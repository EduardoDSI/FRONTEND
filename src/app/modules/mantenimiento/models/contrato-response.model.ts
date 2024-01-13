export class ContratoResponse {
    idContrato: number= 0;
    duracionContratoMes: number= 0;
    fechaContrato?: Date ;
    fechaVenContrato?: Date ;
    tipoComprobante : string ="";
    modoPago : string ="";
    montoTarifaPlana: number=0;
    montoPagado: number=0;
    estado : string ="";

}
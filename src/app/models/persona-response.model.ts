import { TipoDocumentoRequest } from "../modules/mantenimiento/models/tipo-documento-request";

export class PersonaResponse {
    idPersona: number = 0;
    nombres: string = "";
    apellidoPaterno: string = "";
    apellidoMaterno: string = "";
    fechaNacimiento: string = "";
    correoElectronico: string = "";
    numeroCelular: string = "";
    tipoPersona: string = "";
    nroIdentificacion: string = "";
    idTipoDocumento: number = 0;
    tipoDocumento: TipoDocumentoRequest = new TipoDocumentoRequest();
}
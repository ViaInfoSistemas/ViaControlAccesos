export class SocioModel {
  constructor(
    public Nombre: string,
    public Numero: number,
    public TipoIngreso: number,
    public TipoIngresoDesc: string,
    public GrupoFamiliar: number,
    public FechaNacimiento: string,
    public NumeroDocumento: number,
    public Estado: string
  ){}

}

// export interface SocioModel {
//     D_SOCIO: string;
//     N_SOCIO: number;
//     D_TIPO: string;
//     N_GRUPO_FAMI: number;
//     F_NACI: string;
//     N_DOC: number;
//     D_ESTA: string;
//   }
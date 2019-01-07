export class SocioModel {
  constructor(
    public Nombre: string,
    public Numero: number,
    public TipoIngreso: number,
    public TipoIngresoDesc: string,
    public GrupoFamiliar: number,
    public FechaNacimiento: string,
    public NumeroDocumento: number,
    public Estado: string,
    public Tarjeta: number,
    public TarjetaEstado: number,
    public ImgB64: string,
  ){}
}
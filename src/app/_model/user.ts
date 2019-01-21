export class User {
    id: number;
    username: string;
    password: string;
    recurso: string;
    recursoID: number;
    token?: string;
    tokenDateGenerationClient?: Date
    tokenDateGenerationServer?: Date
    tokenDateExpirationServer?: Date
    PuestoControlID: number;
    PuestoContro: string;
}
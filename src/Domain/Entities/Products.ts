export class Products {
  constructor(
    public readonly id: number,
    public nome: string,
    public preco: number,
    public descricao: string,
    public foto: string
  ) {}
}

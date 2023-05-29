export class ProductDto {
  constructor(
    public name: string,
    public price: number,
    public material: string,
    public fineness: number,
    public discount: number,
    public count: number,
    public category: string,
    public size?: number,
  ) {}
}

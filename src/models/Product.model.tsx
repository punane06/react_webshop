export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public imgSrc: string,
    public price: number,
    public category: string,
    public desctipyion: string,
    public isActive: boolean
  ) {}
}

class Item  {
  public id!: number;
  public name!: string;
  public description!: string;
  public base_price!: number;
  public discount!: number;
  public rating!: number;
  public quantity!: number;
  public customization!: string;
  public img_url?: string | null;
  public is_deleted!: boolean;
  public shopId!: number;
}
export { Item };

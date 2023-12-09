class Order {
  public id!: number;
  public delivery_address!: string;
  public payment_method!: string;
  public price!: number;
  public is_confirmed!: boolean;
}

export { Order };

class Shop{
  public id!: number;
  public name!: string;
  public rating!: number;
  public is_premium!: boolean;
  public is_deleted!: boolean;
  public is_approved!: boolean;
  public pfp_url?: string | null;
  public bio!: string;
  public socialMediaLink!: string;
  public phone_number!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export { Shop };

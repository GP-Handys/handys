class User  {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone_number!: number;
  public is_sys_admin!: boolean;
  public pfp_url: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export { User };

class Ticket {
  public id!: number;
  public content!: string;
  public is_resolved!: boolean;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export { Ticket };

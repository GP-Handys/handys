class PostModel {
  public id!: number;
  public title!: string;
  public content!: string;
  public img_url?: string | null;
  public votes!: number;
  public is_resolved!: boolean;
  public is_first_post!: boolean;
  public is_deleted!: boolean;
  public userId!: number;
  public parentId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export { PostModel };

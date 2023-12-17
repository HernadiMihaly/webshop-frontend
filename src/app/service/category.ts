export interface Category {
    id: number;

    name: String;

    parentId: number;

    subCategories: Category[];
}
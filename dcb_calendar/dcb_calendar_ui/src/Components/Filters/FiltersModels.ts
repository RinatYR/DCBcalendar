export interface ISubcategory {
  id: number;
  name: string;
  category: number;
}

export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubcategory[];
}

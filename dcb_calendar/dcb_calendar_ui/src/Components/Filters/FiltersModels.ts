export interface ISubcategory {
  id: number;
  name: string;
  category: number;
  color: string;
}

export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubcategory[];
}

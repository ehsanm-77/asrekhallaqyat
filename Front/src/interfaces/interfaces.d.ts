// App =>
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Inventory =>
type CategoryType = {
  categoryAt: string;
  icon: string;
  name: string;
  slugname: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

type SubCategoryType = {
  category: string;
  categoryAt: string;
  name: string;
  slugname: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

type EditedProduct = {
  brand: string;
  category: categoryType;
  description: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  slugname: string;
  subcategory: subCategoryType;
  thumbnail: string;
  _id: string;
  __v: number;
};

interface Product extends EditedProduct {
  createdAt: string;
  updatedAt: string;
  rating: {
    count: number;
    rate: number;
  };
}

interface ProductSecProps {
  product: Product;
}

// Category =>
type Category = {
  name: string;
  _id: string;
  slugname: string;
};

type CategoryData = {
  categories: Category[];
};

// SubCategory =>
type SubCategory = {
  name: string;
};

type SubCategoryData = {
  subcategories: SubCategory[];
};

// Products
type FilterSection = {
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSubcategories: React.Dispatch<React.SetStateAction<string[]>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  selectedCategories: string[];
  selectedSubcategories: string[];
};

type Products = {
  selectedCategories: string[];
  selectedSubcategories: string[];
  price: string;
};

// Admin Login
interface FormData {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
}

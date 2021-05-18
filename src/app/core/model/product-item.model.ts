import { ProductType } from 'src/app/core/model/product-type.enum';
import { ProductStatus } from 'src/app/core/model/product-status.enum';

export interface ProductItem {
  name: string;
  id: number;
  imageUrl: string;
  publishDate: number;
  status: ProductStatus;
  totalChapter: number;
  type: ProductType;
}

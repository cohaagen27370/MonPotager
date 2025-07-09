import { ProductType } from "./productType";
import { Sowing } from "./sowing";

export interface CompleteProduct {
    name: string;
    variety: string;
    image: string;
    type: ProductType;
    sowingMonths: Sowing;
    harvestMonths: Sowing;
    maturationWeekCount: number;
}
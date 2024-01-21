import { PickType } from "@nestjs/swagger";
import { Offer } from "../entities/offer.entity";
import { IsNotEmpty } from "class-validator";

export class CreateOfferDto extends PickType(Offer, [
  "amount",
  "hidden"
] as const) {
  @IsNotEmpty()
  itemId: number
}

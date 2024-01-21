import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}
  async create(userId: number, createOfferDto: CreateOfferDto) {
    await this.wishesService.updateRaised(createOfferDto.itemId, userId, createOfferDto.amount);
    return this.offersRepository.save({
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden,
      user: { id: userId },
      item: { id: createOfferDto.itemId },
    });
  }

  findAll() {
    return this.offersRepository.find({
      relations: {
        user: {
          wishlists: {
            owner: true,
            items: true
          },
          wishes: true,
          offers: true,
        },
        item: true
      }
    });
  }

  findOne(query) {
    return this.offersRepository.findOneOrFail(query);
  }
}

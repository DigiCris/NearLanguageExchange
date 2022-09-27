import { Profile, listedProfiles, Review } from './model';
import { ContractPromiseBatch, context, u128, PersistentVector } from 'near-sdk-as';


export function setProfile(profile: Profile): void 
{
    let storedProfile = listedProfiles.get(profile.id);
    if (storedProfile !== null) 
    {
        throw new Error(`a profile with ${profile.id} already exists`);
    }
    listedProfiles.set(profile.id, Profile.fromPayload(profile));
}

export function getProfile(id: string): Profile | null 
{
    return listedProfiles.get(id);
}

export function getProfiles(): Profile[] 
{
    return listedProfiles.values();
}


export function rateProfile(id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool):void
{
    let RatingProfile : Profile | null= getProfile(id);
    if (RatingProfile == null) 
    {
        throw new Error("profile not found");
    }

    RatingProfile.rating.Comments.push(comment);
    RatingProfile.rating.Rating.push(rating);
    RatingProfile.rating.Quarrel.push(quarrel);
    RatingProfile.rating.Pictures.push('None');
    RatingProfile.rating.Rater.push(context.sender);
}

export function changeRateProfile(id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool):void
{
    let RatingProfile : Profile | null= getProfile(id);
    if (RatingProfile == null) 
    {
        throw new Error("profile not found");
    }
    RatingProfile.rating.setPicture(quarrelPosition,'none');
    RatingProfile.rating.setComments(quarrelPosition,comment);
    RatingProfile.rating.setRating(quarrelPosition,rating);
    RatingProfile.rating.setQuarrel(quarrelPosition,quarrel);
}

export function defendProfile(id: string, quarrelPosition: i32, Picture: string):void
{
    let RatingProfile : Profile | null= getProfile(id);
    if (RatingProfile == null) 
    {
        throw new Error("profile not found");
    }
    RatingProfile.rating.setPicture(quarrelPosition,Picture);
}

export function viewComments(id: string) : string[]
{
    let RatingProfile : Profile | null= getProfile(id);
    let comment=RatingProfile!.rating.getComments();
    return comment;
}

export function viewPicture(id: string) : string[]
{
    let RatingProfile : Profile | null= getProfile(id);
    let pictures=RatingProfile!.rating.getPictures();
    return pictures;
}





/*
export function buyProfile(id: string):void
{

    const BuyingProfile : Profile | null= getProfile(id);
    if (BuyingProfile == null) 
    {
        throw new Error("profile not found");
    }
    const RECEIVING_ACCOUNT:string = BuyingProfile.owner!;
    const DEPOSIT: u128 = BuyingProfile.price!;
    if (DEPOSIT.toString() != context.attachedDeposit.toString()) 
    {
        throw new Error("attached deposit should equal to the profile's price");
    }

    ContractPromiseBatch.create(RECEIVING_ACCOUNT).transfer(DEPOSIT);
    BuyingProfile.incrementSoldAmount();
    listedProfiles.set(BuyingProfile.id, BuyingProfile);

}    
*/
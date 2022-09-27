import { PersistentUnorderedMap, u128, context, u256, PersistentVector} from "near-sdk-as";

@nearBindgen
export class OneReview
{
    Rating : u16;
    Quarrel : bool;
    Comments : string;
    Pictures : string;
    Rater: string;
    id: i32;
}


@nearBindgen
export class Review
{
    review : PersistentVector<OneReview>;//Review

    constructor() 
    {
        this.review = new PersistentVector<OneReview>("Rev") ;
    }

    setAllRatings(Rating : u16, Quarrel : bool, Comments : string, Pictures : string, Rater: string):void
    {
        let _review :OneReview= new OneReview;
        _review.Comments=Comments;
        _review.Pictures=Pictures;
        _review.Quarrel=Quarrel;
        _review.Rater=Rater;
        _review.Rating=Rating;
        _review.id=this.review.length;
        this.review.push(_review);
    }
    getAllRatings(quarrelPosition: i32):OneReview
    {
        return this.review[quarrelPosition];
    }

    changePicture(quarrelPosition: i32, Pictures : string):void
    {
        let _review : OneReview;
        _review= new OneReview;

        _review.Comments=this.review[quarrelPosition].Comments;
        _review.Pictures=Pictures;
        _review.Quarrel=this.review[quarrelPosition].Quarrel;
        _review.Rater=this.review[quarrelPosition].Rater;
        _review.Rating=this.review[quarrelPosition].Rating;
        _review.id=this.review[quarrelPosition].id;

        //this.review[quarrelPosition].Pictures=Pictures;
        this.review.replace(quarrelPosition,_review);
    }

    getPicture(quarrelPosition: i32): string
    {
        return this.review[quarrelPosition].Pictures;
    }
}



@nearBindgen
export class Profile 
{
    id: string;
    name: string ;
    description : string ;
    age : u16 ;
    sex : bool ;
    country : string ;
    learn : string ;
    teach : string ;
    teachTime : string ;
    meet : string ;
    utc : i8;
    totalBalance : u32 ;
    availableBalance : u32 ;
    rating : Review;
    wallet: string;

    classesCreated : u32;
    classesDone : u32;
    quarrelLost : i32;
    
    public static fromPayload(payload: Profile): Profile 
    {
        const profile = new Profile();
        profile.id = payload.id;
        profile.name = payload.name;
        profile.description = payload.description;
        profile.age = payload.age;
        profile.country = payload.country;
        profile.learn = payload.learn;
        profile.teach = payload.teach;
        profile.teachTime = payload.teachTime;
        profile.meet = payload.meet;
        profile.utc = payload.utc;
        profile.totalBalance = 0;
        profile.availableBalance = 0;
        profile.wallet = context.sender;
        profile.rating= new Review();
        profile.classesCreated = 0;
        profile.classesDone = 0;
        profile.quarrelLost = 0;
        return profile;
    }
    private incrementClassesCreated(): void 
    {
        this.classesCreated = this.classesCreated + 1;
    }
    private incrementClassesDone(): void 
    {
        this.classesDone = this.classesDone + 1;
    }
    private incrementQuarrelLost(): void 
    {
        this.quarrelLost = this.quarrelLost + 1;
    }
    private incrementTotalBalace(): void 
    {
        this.totalBalance = this.totalBalance + 100;
    }
    private incrementAvailableBalance(): void 
    {
        this.availableBalance = this.availableBalance + 100;
    }
    private decrementTotalBalace(): void 
    {
        this.totalBalance = this.totalBalance - 100;
    }
    private decrementAvailableBalance(): void 
    {
        this.availableBalance = this.availableBalance - 100;
    }
    private resetAvailableBalance(): void 
    {
        this.totalBalance = this.totalBalance - this.availableBalance;
        this.availableBalance = 0;
    }
}

export const listedProfiles = new PersistentUnorderedMap<string, Profile>("LISTED_PROFILES");

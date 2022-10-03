import { PersistentUnorderedMap, u128, context, u256, PersistentVector} from "near-sdk-as";



@nearBindgen
export class Classes
{
    Given : bool;
    Taken : bool;
    Released: bool;
    Booked: bool;
    Quarrel: bool;
    Teacher : string;
    Student : string;
    Date: string;
    id: i32;
    Language: string;
    //Language: string;

    constructor() 
    {
        this.Given=false;
        this.Taken=false;
        this.Released=false;
        this.Booked=false;
        this.Teacher="none";
        this.Student="none";
        this.Date="never";
        this.id=0;
        this.Quarrel=false;
        this.Language="none";
    }
}

@nearBindgen
export class TakenGiven
{
    taken : PersistentVector<i32>;
    given : PersistentVector<i32>;

    constructor() 
    {
        this.taken = new PersistentVector<i32>("TaId") ;
        this.given = new PersistentVector<i32>("GiId") ;
    }
    public static GivefromPayload(id: i32): TakenGiven
    {
        const takenGiven = new TakenGiven();
        takenGiven.given.push(id);
        return takenGiven;
    }
    public static TakefromPayload(id: i32): TakenGiven
    {
        const takenGiven = new TakenGiven();
        takenGiven.taken.push(id);
        return takenGiven;
    }
    getOneGiven(id:i32):i32
    {
        return this.given[id];
    }
}



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
        profile.id = context.sender;
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
    incrementTotalBalace(amount:u32): void 
    {
        this.totalBalance = this.totalBalance + amount;
    }
    incrementAvailableBalance(amount:u32): void 
    {
        this.availableBalance = this.availableBalance + amount;
    }
    decrementTotalBalace(amount:u32): void 
    {
        this.totalBalance = this.totalBalance - amount;
    }
    decrementAvailableBalance(amount:u32): void 
    {
        this.availableBalance = this.availableBalance - amount;
    }
    private resetAvailableBalance(): void 
    {
        this.totalBalance = this.totalBalance - this.availableBalance;
        this.availableBalance = 0;
    }
}

export const listedProfiles = new PersistentUnorderedMap<string, Profile>("LISTED_PROFILES");

export const listedClasses = new PersistentVector<Classes>("LISTED_CLASSES") ;
export const listedTakenGiven = new PersistentUnorderedMap<string, TakenGiven>("LISTED_TAGI");

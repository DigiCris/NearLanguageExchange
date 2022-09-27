import { PersistentUnorderedMap, u128, context, u256, PersistentVector} from "near-sdk-as";
//import { Vector } from "near-sdk-js";
//export { u256 } from "as-bignum";


@nearBindgen
export class Review
{
    Rating : PersistentVector<u16>;
    Quarrel : PersistentVector<bool>;
    Comments : PersistentVector<string>;
    Pictures : PersistentVector<string>;
    Rater: PersistentVector<string>;

    constructor() 
    {
        this.Rating = new PersistentVector<u16>("VIdr") ;
        this.Quarrel = new PersistentVector<bool>("VIdq") ;
        this.Comments = new PersistentVector<string>("VIdc") ;
        this.Pictures = new PersistentVector<string>("VIdp") ;
    }


    getRating(): u16[] 
    {
        const res: u16[] = [];
        for (let i = 0; i < this.Rating.length; i++) 
        {
            res.push(this.Rating[i]);
        }
        return res;
    }
    getQuarrel(): bool[] 
    {
        const res: bool[] = [];
        for (let i = 0; i < this.Quarrel.length; i++) 
        {
            res.push(this.Quarrel[i]);
        }
        return res;
    }
    getComments(): string[] 
    {
        const res: string[] = [];
        for (let i = 0; i < this.Comments.length; i++) 
        {
            res.push(this.Comments[i]);
        }
        return res;
    }
    getPictures(): string[] 
    {
        const res: string[] = [];
        for (let i = 0; i < this.Pictures.length; i++) 
        {
            res.push(this.Pictures[i]);
        }
        return res;
    }
    setPicture(i:i32 , url: string): void 
    {
        this.Pictures[i]=url;
    }
    setComments(i:i32 , _comment: string): void 
    {
        this.Comments[i]=_comment;
    }
    setQuarrel(i:i32 , _quarrel: bool): void 
    {
        this.Quarrel[i]=_quarrel;
    }
    setRating(i:i32 , _rating : u16): void 
    {
        this.Rating[i]=_rating;
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

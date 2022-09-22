import { PersistentUnorderedMap, u128, context, u256} from "near-sdk-as";
import { Vector } from "near-sdk-js";
//export { u256 } from "as-bignum";

@nearBindgen
export class Review
{
    Rating : Vector;
    Quarrel : Vector;
    Comments : Vector;
    Pictures : Vector;

    constructor() 
    {
      this.Rating = new Vector('VId');
      this.Quarrel = new Vector('VId');
      this.Comments = new Vector('VId');
      this.Pictures = new Vector('VId');
    }

    private addRating(value : u8) : void
    {
        this.Rating.push(value);
    }
    private addQuarrel(value : u8) : void
    {
        this.Quarrel.push(value);
    }
    private addComments(value : u8) : void
    {
        this.Comments.push(value);
    }
    private addPictures(value : u8) : void
    {
        this.Pictures.push(value);
    }

}



@nearBindgen
export class Profile 
{
    id: string;
    name: string ;
    description : string ;
    age : u8 ;
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

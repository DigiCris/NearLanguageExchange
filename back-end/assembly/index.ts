import { Profile, listedProfiles, listedClasses, listedTakenGiven, Classes, Review, OneReview, TakenGiven } from './model';
import { ContractPromiseBatch, context, u128, PersistentVector } from 'near-sdk-as';
import { i128, u128Safe } from 'as-bignum';



///////////////////////// Profile Functions /////////////////////////////////////////////////////////
export function setProfile(profile: Profile): void 
{
    let storedProfile = listedProfiles.get(context.sender);
    if (storedProfile !== null) 
    {
        throw new Error(`a profile with ${context.sender} already exists`);
    }
    listedProfiles.set(context.sender, Profile.fromPayload(profile));
}

export function getProfile(id: string): Profile | null 
{
    return listedProfiles.get(id);
}

export function getProfiles(): Profile[] 
{
    return listedProfiles.values();
}


export function rateProfile(classNumber:i32, id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool):void
{
    let flag:bool=false;
    let classRated : Classes = new Classes();
    classRated=viewClasses(classNumber);

    if( classRated.Student == context.sender )
    {
        flag=false; // if it is the student we keep it false
    }
    else
    {
        flag=true; // if it is not the student we switch it to true
    }
    if( classRated.Student == "languagedev3.cryptocris.testnet" )
    {
        flag=false; // if it was the contract itself we switch it back to false, if not it keeps being true
    }
// flag==true value would make the call to panick
    if( flag==true )
    {
        throw new Error("You have no permision to Rate this class");
    }
    if( id != classRated.Teacher )
    {//(false)
        throw new Error(`You are trying to rate a different teacher ${id} !== ${classRated.Teacher}`);
    }
    if(quarrel==false)
    {
        markClassTaken(classNumber);
    }
    else
    {// open quarrel inside the class
        let newClass: Classes=new Classes();
        newClass.Booked=listedClasses[classNumber].Booked;
        newClass.Date=listedClasses[classNumber].Date;
        newClass.Given=listedClasses[classNumber].Given;
        newClass.Student=listedClasses[classNumber].Student;
        newClass.Teacher=listedClasses[classNumber].Teacher;
        newClass.id=listedClasses[classNumber].id;
        newClass.Taken=listedClasses[classNumber].Taken;
        newClass.Released=false;
        newClass.Quarrel=quarrel;
        listedClasses.replace(classNumber,newClass);
    }

    let RatingProfile : Profile | null= getProfile(id);
    if (RatingProfile == null) 
    {
        throw new Error("profile not found");
    }
    RatingProfile.rating.setAllRatings(rating,quarrel,comment,"none",context.sender);
}

export function viewRate(id: string, quarrelPosition: i32):OneReview
{
    let RatingProfile : Profile | null= getProfile(id);
    if (RatingProfile == null) 
    {
        throw new Error("profile not found");
    }
    return RatingProfile.rating.getAllRatings(quarrelPosition);
}

export function defendProfile(id: string, quarrelPosition: i32, Picture: string):void
{
    let RatingProfile : Profile | null= getProfile(id);
    if (RatingProfile == null) 
    {
        throw new Error("profile not found");
    }
    RatingProfile.rating.changePicture(quarrelPosition,Picture);
}
////////////////////////End of profile functions //////////////////////////////////////////

////////////////////// Start of Classes functions ////////////////////////////////////
export function setClasses(Date:string): void 
{
    let index = listedClasses.length;
    let _class: Classes= new Classes();
    _class.Booked=false;
    _class.Given=false;
    _class.Released=false;    
    _class.Student="none";
    _class.Taken=false;
    _class.Quarrel=false;
    _class.Teacher=context.sender;
    _class.id=index;        
    _class.Date=Date; // only data that is usefull to send in the parameters (27_09_22_TU14)
    listedClasses.push(_class);

    let storedTakenGiven = listedTakenGiven.get(context.sender);
    if (storedTakenGiven == null) 
    {
        listedTakenGiven.set(context.sender, TakenGiven.GivefromPayload(_class.id));
    }
    else
    {
        storedTakenGiven.given.push(_class.id);
    }
}

export function viewClasses(classNumber:i32): Classes
{
    return listedClasses[classNumber];
}


export function viewClassesStartToStop(classNumberStart:i32, classNumberStop:i32): Classes[]
{
    let _classes:Classes[]=[];
    let size:i32=listedClasses.length;

    for(let i=classNumberStart ; i<classNumberStop && i<size ; i++)
    {
       // if(listedClasses[i].id !== null)
        {
            _classes.push(listedClasses[i]);
        }
    }
    return _classes;
}


export function takeClasses(id:i32):void
{// Increment total balance from the teacher, decrement total and available balance from the student

    // making sure the Student profile exists
    let buyerProfile : Profile | null= getProfile(context.sender);
    if (buyerProfile == null) 
    {
        throw new Error("you don't have a profile");
    }
    let sellerProfile : Profile | null= getProfile(listedClasses[id].Teacher);
    if (sellerProfile == null) 
    {
        throw new Error("the teacher doesn't have a profile");
    }

    let newClass: Classes=new Classes();
    newClass.Booked=true;
    newClass.Date=listedClasses[id].Date;
    newClass.Given=listedClasses[id].Given;
    newClass.Released=listedClasses[id].Released;
    newClass.Student=context.sender;
    newClass.Taken=listedClasses[id].Taken;
    newClass.Teacher=listedClasses[id].Teacher;
    newClass.id=listedClasses[id].id;
    newClass.Quarrel=listedClasses[id].Quarrel;
    listedClasses.replace(id,newClass);

    // Decrement balance of the buyer by a fixed price (100)
    buyerProfile.decrementAvailableBalance(100);
    buyerProfile.decrementTotalBalace(100);
    listedProfiles.set(context.sender,buyerProfile);

    // Increment balance of seller by a fixed price (95)... We burn the other 5. only incrementing the total so they can't use it yet
    sellerProfile.incrementTotalBalace(95);
    listedProfiles.set(listedClasses[id].Teacher,sellerProfile);
}

export function markClassTaken(id:i32):void
{ // I should release the payment

    let sellerProfile : Profile | null= getProfile(listedClasses[id].Teacher);
    if (sellerProfile == null) 
    {
        throw new Error("The teacher doesn't have a profile");
    }

    let newClass: Classes=new Classes();
    newClass.Booked=listedClasses[id].Booked;
    newClass.Date=listedClasses[id].Date;
    newClass.Given=listedClasses[id].Given;
    newClass.Student=listedClasses[id].Student;
    newClass.Teacher=listedClasses[id].Teacher;
    newClass.id=listedClasses[id].id;
    newClass.Quarrel=listedClasses[id].Quarrel;


    if (newClass.Student == context.sender) // only the student can mark the class as taken 
    { // the student mark this class as taken so the money should be released
        newClass.Taken=true;
        newClass.Released=true;
        newClass.Quarrel=false;
        listedClasses.replace(id,newClass);

        sellerProfile.incrementAvailableBalance(95);
        listedProfiles.set(listedClasses[id].Teacher,sellerProfile);
    }
    else
    {
        if ("languagedev3.cryptocris.testnet" == context.sender)
        {
            newClass.Taken=true;
            newClass.Released=true;
            newClass.Quarrel=false;
            listedClasses.replace(id,newClass);
    
            sellerProfile.incrementAvailableBalance(95);
            listedProfiles.set(listedClasses[id].Teacher,sellerProfile);
        }
        else
        {
            throw new Error(`hey, you are not the student of this class`);
        }
    }
}

export function markClassGiven(id:i32):void
{
    let newClass: Classes=new Classes();
    newClass.Booked=listedClasses[id].Booked;
    newClass.Date=listedClasses[id].Date;
    newClass.Taken=listedClasses[id].Taken;
    newClass.Released=listedClasses[id].Released;
    newClass.Student=listedClasses[id].Student;
    newClass.Teacher=listedClasses[id].Teacher;
    newClass.id=listedClasses[id].id;
    newClass.Quarrel=listedClasses[id].Quarrel;

    if (newClass.Teacher == context.sender) // only the teacher can mark the class as given 
    { // the teacher mark this class as given
        newClass.Given=true;
        listedClasses.replace(id,newClass);
    }
    else
    {
        throw new Error(`hey, you are not the teacher of this class`);
    }
}
////////////////////////End of classes functions //////////////////////////////////////////


////////////////////////Start of payment functions //////////////////////////////////////////


export function buyBalance(): void 
{ // id will be the account
    let totalBalance:u32=0;
    let availableBalance : u32 =0; //1000000000000000000000000
    let aux:string="";

    // send the money to the contract
    ContractPromiseBatch.create("languagedev3.cryptocris.testnet").transfer(context.attachedDeposit); // money to our wallet

    // calculate the value that we need to send to the buyer
    aux=context.attachedDeposit.toString().slice(0,-22);
    totalBalance=( parseInt(aux) as u32);
    availableBalance =totalBalance;

    // Increment balance of the buyer
    let buyerProfile : Profile | null= getProfile(context.sender);
    if (buyerProfile == null) 
    {
        throw new Error("profile not found");
    }
    buyerProfile.incrementAvailableBalance(availableBalance);
    buyerProfile.incrementTotalBalace(totalBalance);
    listedProfiles.set(context.sender,buyerProfile);
}

export function sellBalance(amount:u128): void 
{// id will be the account
    let totalBalance:u32=0;
    let availableBalance : u32 =0; //1000000000000000000000000
    let aux:u32=0;
    let amount_aux:u128=amount;

    // get balance of the seller
    let buyerProfile : Profile | null= getProfile(context.sender);
    if (buyerProfile == null) 
    {
        throw new Error("profile not found");
    }
    availableBalance=buyerProfile.availableBalance;
    totalBalance=buyerProfile.totalBalance;
    aux=( parseInt(amount.toString().slice(0,-22)) as u32);
    aux=aux*110/100; // they have to pay 10% more in order to get the money
    if (availableBalance < aux) 
    {
        throw new Error("You dont have enaugh balance");
    }

    // decrement balance from the seller
    buyerProfile.decrementAvailableBalance(aux);
    buyerProfile.decrementTotalBalace(aux);
    listedProfiles.set(context.sender,buyerProfile);

    // send the money to the seller
    ContractPromiseBatch.create(context.sender).transfer(amount_aux) //send linkdrop funds to claimed account

}



////////////////////////End of payment functions //////////////////////////////////////////




/*
export function viewMyClassesGiven():i32
{
    let res:i32[]=[];
    let re:i32=124;
    let storedTakenGiven=listedTakenGiven.get('buyer1.cryptocris.testnet');
    if (storedTakenGiven == null) 
    {
        throw new Error(`You don't have any classes given`);
    }
    for(let i=storedTakenGiven.given.length ; i>=0 ; i--)
    {
        res.push( storedTakenGiven.given.length ); // storedTakenGiven.getOneGiven(i)
        re=storedTakenGiven.given.length;//storedTakenGiven.getOneGiven(1);
    }
    return re;
}

*/








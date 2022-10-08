import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createProfile( name, description, age, country, learn, teach, meet) {
  const id = uuid4()
  const profile = {profile: {id: "6", name, description, age, country, learn, teach, teachTime: "", meet, utc: 0}}

  return window.contract.setProfile(profile); // set_product for the Rust contract
}

export function getProfile(id) {
  return window.contract.getProfile(id); 
}
export function getProfiles() {
  return window.contract.getProfiles(); 
}

export async function viewClassesStartToStop(classNumberStart, classNumberStop){
  return window.contract.viewClassesStartToStop({classNumberStart, classNumberStop})
}

export function setClasses(Date) {
  return window.contract.setClasses({Date}); 
}

export function takeClasses(id) {
  return window.contract.takeClasses({id})
}

export function markClassGiven(id) {
  return window.contract.markClassGiven({id})
} 

export function rateProfile(id, wallet, comment, rating) {
  return window.contract.rateProfile({classNumber:id, id: wallet, quarrelPosition: 0, comment, rating, quarrel: false})
} 

export function buyBalance(amount)
{ // amount en yokto near
  return window.contract.buyBalance({},GAS,amount);
}

export function sellBalance(amount)
{ // amount en yokto near
  return window.contract.sellBalance({"amount":amount});
}



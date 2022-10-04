import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createProfile(name, description, age, country, learn, teach, teachTime, meet, utc) {
  const id = uuid4()
  const profile = {profile: {id, name, description, age, country, learn, teach, teachTime, meet, utc}}

  const json = JSON.stringify(profile);

  console.log(json)
  console.log("asas")
  return window.contract.setProfile({"profile": {"id": 6, "name": "Profesor", "description": "Learning Swedish.", "age": 33, "country": "Argentina", "learn": "Swedish", "teach": "Spanish", "teachTime": "Sa17-Su18", "meet": "meet.google.com/rri-fdmn-imv", "utc": -3}}); // set_product for the Rust contract
}

export function getProfile(id) {
  return window.contract.getProfile(id); // get_products for the Rust contract
}


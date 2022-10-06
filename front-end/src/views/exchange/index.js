import React, { useState, useEffect } from 'react';
import Form from "../../components/form"
import { getProfile } from '../../utils/contract'
import './styles.css'
import { login, getAccountId, logout, accountBalance } from "../../utils/near";

export default function Exchange() {
  const NEAR_IMG_URL="https://s2.coinmarketcap.com/static/img/coins/200x200/6535.png";
  const TOKEN_IMG_URL="https://recursoshumanostdf.ar/download/multimedia.grande.b2e86c7b70cb9c7e.746f6b656e5f6772616e64652e706e67.png";
  const NEAR_PRICE=0.009090909;
  const TOKEN_PRICE=100;

  const [Change, setChange] = useState(false);// sets Token_to_Near=true or Near_to_Token=false
  const [nearBalance, setNearBalance] = useState(1);// Balance from the wallet
  const [tokenBalance, setTokenBalance] = useState(2);// Ballance from profile
  const [isLoged, setIsLoged] = useState(true);// true if it is logged false if it is not
  const [tokenToSpend, setTokenToSpend] = useState(0);
  const [tokenToReceive, setTokenToReceive] = useState(0);
  const [accountId, setAccountId] = useState();


  useEffect(() => {
    let spend;
    spend=tokenToSpend;
    let divider;
    divider=Change?NEAR_PRICE:TOKEN_PRICE;
    let receive;
    receive=spend/divider;
    setTokenToSpend(receive);
    setTokenToReceive(spend);
  }, [Change])

  useEffect(() => {
    let spend;
    spend=tokenToSpend;
    let divider;
    divider=Change?NEAR_PRICE:TOKEN_PRICE;
    let receive;
    receive=spend*divider;
    setTokenToReceive(receive);
  }, [tokenToSpend])

  useEffect(() => {
    //let cuenta='alumno3.cryptocris.testnet';
    //let id={'id':cuenta};
    let id={'id':accountId};

    let profile=getProfile(id);
    profile.then( (value) => {
      console.log(value.availableBalance);
      setTokenBalance(value.availableBalance);
    } );

    getAccountId().then( (value) => {
      console.log("accountId=");
      console.log(value);
      if(value=='')
      {
        setIsLoged(false);
      }
      else
      {
        setAccountId(value);
        setIsLoged(true);
      }

    accountBalance().then( (value) => {
      console.log(value);
      setNearBalance(value);
    } );

    } );

  }, [])
  

  function setValueTokenToReceive(event)
  {
    let receive=event.target.value;
    let divider;
    divider=Change?NEAR_PRICE:TOKEN_PRICE;
    let spend=receive/divider;
    console.log(spend);
    setTokenToReceive(receive);
    setTokenToSpend(spend);
  }
  function setValueTokenToSpend(event)
  {
    let spend=event.target.value;
    let divider;
    divider=Change?NEAR_PRICE:TOKEN_PRICE;
    let receive=spend*divider;
    console.log(receive);
    setTokenToSpend(spend);
    setTokenToReceive(receive);
  }



  function handleSubmit(evt) 
  {
    evt.preventDefault();
    alert("hice submit");
    if(!isLoged)
    {
      console.log("debo loguearme");
      login();
    }
    else
    {
      if(Change)
      {
        console.log("debo vender token");
      }
      else
      {
        console.log("debo comprar token");
      }
    }
  }



  return (
  <div id='swap-box'>
<button onClick={logout}>log out</button>
    <div id="swap-menu">
      <div onClick={()=>setChange(false)} className={Change?"swap-button":"swap-button swap-button-active"}>Near to Token</div>
      <div onClick={()=>setChange(true)} className={!Change?"swap-button":"swap-button swap-button-active"}>Token to Near</div>
    </div>

    <div id="swap-title-box">
		  <p id="swap-title">Swap</p>
		  <p id="swap-subtitle">Trade tokens in an instant</p>
	  </div>

    <div id="swap-form-box">
      <form onSubmit={handleSubmit}>

        <label>
          <img id="alineadoTextoImagenCentro" src={Change?TOKEN_IMG_URL :NEAR_IMG_URL} />{Change?"TOKEN" :"NEAR"} 
          <div className="swap-balance pick-balance" onClick={()=>setTokenToSpend(Change?tokenBalance:nearBalance)}>Balance: {isLoged?(Change?tokenBalance:nearBalance):"x"}</div>
        </label>

        <input onChange={setValueTokenToSpend} type="text" name="IHAVE" placeholder="0.0" value={tokenToSpend==0?"":tokenToSpend}></input>

        <label id="swap-arrow"><div className="hidden">🡣</div><div onClick={()=>setChange(!Change)} id="swap-up-down"></div></label>

        <label>
        <img id="alineadoTextoImagenCentro" src={!Change?TOKEN_IMG_URL :NEAR_IMG_URL} />{!Change?"TOKEN" :"NEAR"} 
          <div className="swap-balance">Balance: {isLoged?(!Change?tokenBalance:nearBalance):"x"}</div>
        </label>

        <input onChange={setValueTokenToReceive} type="text" name="IWANT" placeholder="0.0" value={tokenToReceive==0?"":tokenToReceive}></input>

        <div className="separador-vertical"></div>

        <label id="swap-price-word">Price 
          <div id="swap-price">
            {Change? NEAR_PRICE : TOKEN_PRICE} 
            {Change? " NEAR per TOKEN" : " TOKEN per NEAR"} 
          </div>
        </label>

        <input id="swap-submit" type="submit" name="submit" value={isLoged?"Swap":"Connect Wallet"}></input>
        
      </form>
    </div>

  </div>

  )
}

import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/contract'
import './styles.css'
import { login, getAccountId, logout, accountBalance } from "../../utils/near";
import { buyBalance, sellBalance } from '../../utils/contract';
import { useToast } from '@chakra-ui/react'

import Log from '../../components/log';


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
  const [nearToSpend, setNearToSpend] = useState(0);
  const [tokenToReceive, setTokenToReceive] = useState(0);
  const [accountId, setAccountId] = useState();
  const [actualizar, setActualizar] = useState(false);

  const toast = useToast()


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
    inicializacion();
    //alert("entro");
  }, [accountId, actualizar])
  
  async function inicializacion()
  {
    await getId();
    //await alert("estoy entrando");
    await getTokenBalance();
    //await alert("sali");
  }

  function getTokenBalance()
  {
    let id={'id':accountId};
    let profile=getProfile(id);
    profile.then( (value) => {
      console.log(value.availableBalance);
      //alert("entre");
      setTokenBalance(value.availableBalance);
    } );
  }
  function getId()
  {
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
  }

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
    // I should tell the person that we are working on it
    evt.preventDefault();
    console.log("hice submit");

    toast({
      title: 'Transaction sent',
      status: 'info',
      duration: 9000,
      isClosable: true,
    })


    if(!isLoged)
    {
      console.log("debo loguearme");
      login();
    }
    else
    {
      let mensaje;
      let descripcion;
      if(Change)
      {
        console.log("debo vender token");
        console.log( formatAmountToSend(tokenToReceive) );
        mensaje=sellBalance(formatAmountToSend(tokenToReceive));
        descripcion="Tokens sold";
      }
      else
      {
        console.log("debo comprar token");
        console.log( formatAmountToSend(tokenToSpend) );
        mensaje=buyBalance(formatAmountToSend(tokenToSpend));
        descripcion="Tokens bought";
      }
      mensaje.then( (value)=>{
        console.log("toast");
        console.log(value);
        toast({
          title: 'Transaction succeded',
          description: descripcion,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setActualizar(!actualizar);
      } ).catch(function(e) {
        console.log("toast error");
        console.log(e.kind.ExecutionError); // "oh, no!"
          toast({
            title: 'Failed.',
            description: e.kind.ExecutionError,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setActualizar(!actualizar);
      });
    }
  }


function formatAmountToSend(numero)
{  
  let parte_entera=Math.trunc(numero).toString();
  let parte_decimal= Math.trunc(( round( numero-Math.trunc(numero) ) ) *100).toString().padEnd(24,'0');
  let mandar=parte_entera+parte_decimal;
  return(mandar);
}

  function round(num) 
  {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }


  return (
  <div id='swap-box'>
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
          <div className="swap-balance pick-balance" onClick={()=>setTokenToSpend(Change?tokenBalance:(nearBalance-0.01) )}>Balance: {isLoged?(Change?tokenBalance:nearBalance):"x"}</div>
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

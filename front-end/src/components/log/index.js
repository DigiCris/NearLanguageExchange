import React, { useState, useEffect } from 'react';
import './style.css';
import { login, getAccountId, logout } from '../../utils/near';

export default function Log() {

  const [showMenu, setShowMenu]= useState(false);
  const [accountId, setAccountId] = useState();
  const [isLoged, setIsLoged] = useState();


  useEffect(() => {
    getId();
    //console.log(accountId);
  }, [accountId, isLoged])

  function getId()
  {
    getAccountId().then( (value) => {
      if(value=='')
      {
        setIsLoged(false);
      }
      else
      {
        setAccountId(value);
        setIsLoged(true);
      }
    } );
  }

  function abrirNuevoTab(url) 
  {
    // Abrir nuevo tab
    var win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }
  function cutAddress(address)
  {
    let res;
    if(address)
    {
      res= ( address.slice(0,3)+"..."+address.slice((address.length-9),address.length) );
    }
    else
    {
      res="Connect";
    }
    return res;
  }


  function desconectar()
  {
    logout();
  }
  function switchView()
  {
    setShowMenu(!showMenu);
    if(!isLoged)
    {
      login();
    }
  }
  function viewWallet()
  {
    abrirNuevoTab("https://explorer.testnet.near.org/accounts/"+accountId);
  }

  return (
  <div id={showMenu?(isLoged?"login-logout":"hidden-login-logout"):"hidden-login-logout"}>

		<div id="log-container" onClick={switchView}>
			<svg viewBox="0 0 24 24" color="primary" width="24px" xmlns="http://www.w3.org/2000/svg" id="svg-wallet-container"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z" id="svg-wallet"></path></svg>

			<span title="cryptocris.testnet" id="wallet-text">{cutAddress(accountId)}</span>

			<svg viewBox="0 0 24 24" color="text" width="24px" xmlns="http://www.w3.org/2000/svg" class="sc-8a800401-0 fGhPpn" id="wallet-arrow-down"><path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
		</div>

		<div onClick={viewWallet} className={showMenu?(isLoged?"show":"disapear"):"disapear"} >
			  Wallet
		</div>

		<div onClick={desconectar} className={showMenu?(isLoged?"show":"disapear"):"disapear"} >
			Log out
		</div>
	</div>
  );
}
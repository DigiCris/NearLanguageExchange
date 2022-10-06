import React from 'react'
import Form from "../../components/form"
import { getProfile } from '../../utils/contract'
import './styles.css'

export default function Exchange() {
  return (
  <div id='swap-box'>

    <div id="swap-menu">
      <div className="swap-button swap-button-active">Near to Token</div>
      <div className="swap-button">Token to Near</div>
    </div>

    <div id="swap-title-box">
		  <p id="swap-title">Swap</p>
		  <p id="swap-subtitle">Trade tokens in an instant</p>
	  </div>

    <div id="swap-form-box">
      <form>

        <label>
          <img id="alineadoTextoImagenCentro" src="https://s2.coinmarketcap.com/static/img/coins/200x200/6535.png" />NEAR 
          <div className="swap-balance">Balance: 0.0152783</div>
        </label>

        <input type="text" name="IHAVE" placeholder="0.0"></input>

        <label id="swap-arrow"><div className="hidden">🡣</div><div id="swap-up-down"></div></label>

        <label>
          <img id="alineadoTextoImagenCentro" src="https://s2.coinmarketcap.com/static/img/coins/200x200/6535.png" />TOKEN
          <div className="swap-balance">Balance: 0.0152783</div>
        </label>

        <input type="text" name="IWANT" placeholder="0.0"></input>

        <div className="separador-vertical"></div>

        <label id="swap-price-word">Price <div id="swap-price">0.0159715 NEAR per TOKEN</div></label>

        <input id="swap-submit" type="submit" name="submit" value="Swap"></input>
        
      </form>
    </div>

  </div>

  )
}

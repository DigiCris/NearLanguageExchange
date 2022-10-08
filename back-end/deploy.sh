
#!/bin/bash
## cada vez que cambio el CONTRACT debo cambiarlo en index.ts ya que esta hardcodeado
WASM_FILE_NAME="Language-exchange-contract.wasm"
MY_ACCOUNT="cryptocris.testnet"
CONTRACT="languagedev3"
TEACHER="profe3"
STUDENT="alumno3"


echo "0) create Accounts"
echo "1) Deploy"
echo "2) setProfiles"
echo "3) getProfile"
echo "4) rateProfile"
echo "5) viewRate"
echo "6) defendProfile"
echo "7) setClasses"
echo "8) viewClasses"
echo "10) viewClassesStartToStop"
echo "11) getProfiles (all)"
echo "12) takeClasses"
echo "13) Mark class Taken"
echo "14) Mark class given"
echo "15) buy balance"
echo "16) sell balance"

echo "17) profesor auto liberar dinero (debe fallar)"
echo "18) Admin libera dinero (debería funcionar)"

read menu

case $menu in
  0)
	near create-account $CONTRACT.$MY_ACCOUNT --masterAccount $MY_ACCOUNT --initialBalance 1
	near create-account $TEACHER.$MY_ACCOUNT --masterAccount $MY_ACCOUNT --initialBalance 1
	near create-account $STUDENT.$MY_ACCOUNT --masterAccount $MY_ACCOUNT --initialBalance 3
	echo "¡Accounts created!"
  ;;
  1)
	yarn asb
	near deploy --accountId $CONTRACT.$MY_ACCOUNT --wasmFile build/release/$WASM_FILE_NAME
	echo "¡Deployed!"
  ;;
  2)
  ## El profesor crea su perfil. para cargar otro perfil debo cambiar el $TEACHER por el que quiera cargar. id no se tiene en consideracion
	PLAYLOAD='{"profile": {"id": "6", "name": "Profesor", "description": "Learning Swedish.", "age": 33, "country": "Argentina", "learn": "Swedish", "teach": "Spanish", "teachTime": "Sa17-Su18", "meet": "meet.google.com/rri-fdmn-imv", "utc": -3}}'
	PLAYLOAD="'"$PLAYLOAD"'"
	FUNCTIONTOCALL="setProfile"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "¡Profile Teacher Set!"

## seteo el perfil del alumno. el Id no sirve para nada. poner cualquiera
	PLAYLOAD='{"profile": {"id": "6", "name": "Alumno", "description": "Learning Spanish.", "age": 33, "country": "Sweden", "learn": "Spanish", "teach": "Swedish", "teachTime": "Sa17-Su18", "meet": "meet.google.com/eji-fmdn-ivm", "utc": 2}}'
	PLAYLOAD="'"$PLAYLOAD"'"
	FUNCTIONTOCALL="setProfile"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "¡Profile Student Set!"
  ;;
  3)
  ## cualquiera puede leer el perfil del profesor. Está hardcodeado así que de cambiar perfil debo retocar acá
	FUNCTIONTOCALL="getProfile"
	PLAYLOAD='{"id": "profe2.cryptocris.testnet" }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile READ"
	;;
  4)
  ## El estudiante puede ratear el perfil del profesor. El perfil del profesor esta hardcodeado en el playload. quarrelPosition no se toma en cuenta, es cualquiera
	FUNCTIONTOCALL="rateProfile"
## (id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool)
	PLAYLOAD='{"classNumber":1, "id": "profe2.cryptocris.testnet", "quarrelPosition":0 , "comment":"Good teacher","rating":6, "quarrel": false }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile rated"

  ## reteandolo mal
	FUNCTIONTOCALL="rateProfile"
## (id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool)
	PLAYLOAD='{"classNumber":0, "id": "profe2.cryptocris.testnet", "quarrelPosition":0 , "comment":"Bad teacher","rating":0, "quarrel": true }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile rated"	
	;;
  5)
  ## Cualquiera puede ver el rate del profesor que lo hardcodee en el playload
	FUNCTIONTOCALL="viewRate"
	PLAYLOAD='{"id": "profe2.cryptocris.testnet", "quarrelPosition":1 }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile viewRate READ"
	;;
  6)
 ## El profesor puede defenderse subiendo una foto.
 ## quearrel position no es lo mismo que la clase, debe obtenerse bien desde el front
	FUNCTIONTOCALL="defendProfile"
	PLAYLOAD='{"id": "profe2.cryptocris.testnet", "quarrelPosition":1 , "Picture":"https://www.newPicture.com" }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile defended. pic added."
	;;
  7)
 ## El profesor puede setear la clase que quiera

 ##Seteo una clase
	FUNCTIONTOCALL="setClasses"
	PLAYLOAD='{"Date": "29_09_22_TH19"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Class 1 set"

 ##Seteo otra clase
	PLAYLOAD='{"Date": "30_09_22_FR19"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Class 2 set"	

 ## Seteo otra clase que nadie tomara
	PLAYLOAD='{"Date": "01_10_22_SA19"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Class 2 set"	
	;;	
  8)
 ## Cualquiera puede ver una clase especificada
	FUNCTIONTOCALL="viewClasses"
	PLAYLOAD='{"classNumber": 1}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "viewClasses"
	;;
  10)
## Poder ver las clases dando un rango para listar. (El rango es para nunca excederse de los 300TGas)
	FUNCTIONTOCALL="viewClassesStartToStop"
	PLAYLOAD='{"classNumberStart": 0, "classNumberStop":30}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "viewClasses"
	;;
  11)
## Devuelve todos los profiles creados (podría haber problema si son muchos, pero en principio andará bien)
	FUNCTIONTOCALL="getProfiles"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "viewClasses"
	;;
  12)
## El estudiante puede elegir una clase para tomar (tomo la clase 1... la segunda creada)
	FUNCTIONTOCALL="takeClasses"
	PLAYLOAD='{"id": 1}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"

## El Estudiante toma tambien la clase 0 en la cual le hará problema al profesor
	FUNCTIONTOCALL="takeClasses"
	PLAYLOAD='{"id": 0}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;

  13)
## El estudiante puede marcar la clase como ya tomada. la clase 1 la tome sin problema.
## no lo voy a hacer desde acá, sino que lo llamaré desde rateProfile que llama internamente a esta funcion
	FUNCTIONTOCALL="markClassTaken"
	PLAYLOAD='{"id": 1}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;

## La 0 no la marcará como ya tomada y en su lugar armará problema

  14)
## El Profesor puede marcar una clase como ya dada. la clase 1 la dio sin problema
	FUNCTIONTOCALL="markClassGiven"
	PLAYLOAD='{"id": 1}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"

## la clase 0 el profesor la marca sin problema pero el estudiante la peleará
	FUNCTIONTOCALL="markClassGiven"
	PLAYLOAD='{"id": 0}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;

  15)
## cualquiera con un profile puede comprar saldo para su balance.
## El estudiante comprará 200 de balance equivalente a 2 NEAR para pagar las 2 clases.
	FUNCTIONTOCALL="buyBalance"
	AMOUNT="2000000000000000000000000"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL --depositYocto=$AMOUNT --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "buyBalance"
	;;

  16)
## Cualquiera con balance debería poder vender.

## el profesor venderá 110 de su balance para recibir 1 Near
	FUNCTIONTOCALL="sellBalance"
	PLAYLOAD='{"amount":"1000000000000000000000000"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "sellBalance"
	;;	




  17)
## El Profesor intenta de marcarse como que dio la clase pero debería fallar
	FUNCTIONTOCALL="markClassTaken"
	PLAYLOAD='{"id": 0}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;

  18)
## El Admin debería poder resolver el conflicto y marcar como que la clase fue tomada
	FUNCTIONTOCALL="markClassTaken"
	PLAYLOAD='{"id": 0}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $CONTRACT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;


esac

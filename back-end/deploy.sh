
#!/bin/bash

WASM_FILE_NAME="Language-exchange-contract.wasm"
MY_ACCOUNT="cryptocris.testnet"
CONTRACT="languagedev1"
BUYER="buyer1"
TEACHER="profe1"
STUDENT="alumno1"


echo "0) create Accounts"
echo "1) Deploy"
echo "2) setProfile"
echo "3) getProfile"
echo "4) rateProfile"
echo "5) viewRate"
echo "6) defendProfile"
echo "7) setClasses"
echo "8) viewClasses"
echo "9) viewMyClassesGivenn(no)"
echo "10) viewClassesStartToStop"
echo "11) getProfiles (all)"
echo "12) takeClasses"
echo "13) Mark class Taken"
echo "14) Mark class given"
echo "15) buy balance"
echo "16) sell balance"

read menu

case $menu in
  0)
	near create-account $CONTRACT.$MY_ACCOUNT --masterAccount $MY_ACCOUNT --initialBalance 5
	near create-account $TEACHER.$MY_ACCOUNT --masterAccount $MY_ACCOUNT --initialBalance 5
	near create-account $STUDENT.$MY_ACCOUNT --masterAccount $MY_ACCOUNT --initialBalance 5
	echo "¡Accounts created!"
  ;;
  1)
	yarn asb
	near deploy --accountId $CONTRACT.$MY_ACCOUNT --wasmFile build/release/$WASM_FILE_NAME
	echo "¡Deployed!"
  ;;
  2)
  ## El profesor crea su perfil. para cargar otro perfil debo cambiar el $TEACHER por el que quiera cargar. id no se tiene en consideracion
	PLAYLOAD='{"profile": {"id": "6", "name": "Cris6", "description": "Learning Swedish.", "age": 33, "country": "Argentina", "learn": "Swedish", "teach": "Spanish", "teachTime": "Sa17-Su18", "meet": "meet.google.com/rri-fdmn-imv", "utc": -3}}'
	PLAYLOAD="'"$PLAYLOAD"'"
	FUNCTIONTOCALL="setProfile"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "¡Profile Set!"
  ;;
  3)
  ## cualquiera puede leer el perfil del profesor. Está hardcodeado así que de cambiar perfil debo retocar acá
	FUNCTIONTOCALL="getProfile"
	PLAYLOAD='{"id": "profe1.cryptocris.testnet" }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile READ"
	;;
  4)
  ## El estudiante puede ratear el perfil del profesor. El perfil del profesor esta hardcodeado en el playload
	FUNCTIONTOCALL="rateProfile"
## (id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool)
	PLAYLOAD='{"id": "profe1.cryptocris.testnet", "quarrelPosition":0 , "comment":"Good teacher","rating":6, "quarrel": false }'
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
	PLAYLOAD='{"id": "profe1.cryptocris.testnet", "quarrelPosition":0 }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile viewRate READ"
	;;
  6)
 ## El profesor puede defenderse subiendo una foto
	FUNCTIONTOCALL="defendProfile"
	PLAYLOAD='{"id": "profe1.cryptocris.testnet", "quarrelPosition":0 , "Picture":"https://www.newPicture.com" }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile defended. pic added."
	;;
  7)
 ## El profesor puede setear la clase que quiera
	FUNCTIONTOCALL="setClasses"
	PLAYLOAD='{"Date": "29_09_22_TH19"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;
  8)
 ## Cualquiera puede ver una clase especificada
	FUNCTIONTOCALL="viewClasses"
	PLAYLOAD='{"classNumber": 3}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "viewClasses"
	;;
  9)
## Poder ver las clases que tenga especificadas que daré
	FUNCTIONTOCALL="viewMyClassesGiven"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL"
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
## El estudiante puede elegir una clase para tomar
	FUNCTIONTOCALL="takeClasses"
	PLAYLOAD='{"id": 2}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;
  13)
## El estudiante puede marcar la clase como ya tomada
	FUNCTIONTOCALL="markClassTaken"
	PLAYLOAD='{"id": 2}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $STUDENT.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;
  14)
## El Profesor puede marcar una clase como ya dada
	FUNCTIONTOCALL="markClassGiven"
	PLAYLOAD='{"id": 2}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;

  15)
## cualquiera con un profile puede comprar saldo para su balance. id no debería ponerse, sino que tomarlo a quien lo manda
	FUNCTIONTOCALL="buyBalance"
## (id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool)
	AMOUNT="1000000000000000000000000"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL --depositYocto=$AMOUNT --accountId $STUDENT.$MY_ACCOUNT"
##	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "buyBalance"
	;;
  16)
## Cualquiera con balance debería poder vender. el id no nebería ponerse sino tomar a quien lo manda.
	FUNCTIONTOCALL="sellBalance"
## (amount:u128, id:string)
	PLAYLOAD='{"amount":"500000000000000000000000"}'
	PLAYLOAD="'"$PLAYLOAD"'"
##	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --depositYocto=$AMOUNT --accountId $BUYER.$MY_ACCOUNT"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $TEACHER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "sellBalance"
	;;	
esac

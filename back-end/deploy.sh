
#!/bin/bash

WASM_FILE_NAME="Language-exchange-contract.wasm"
MY_ACCOUNT="cryptocris.testnet"
CONTRACT="languagedev"
BUYER="buyer1"



echo "1) Deploy"
echo "2) setProfile"
echo "3) getProfile"
echo "4) rateProfile"
echo "5) viewComments"
echo "6) viewPictures"
echo "7) defendProfile"
echo "8) changeRate"
echo "9) viewAll"
read menu

case $menu in
  1)
	yarn asb
	near deploy --accountId $CONTRACT.$MY_ACCOUNT --wasmFile build/release/$WASM_FILE_NAME
	echo "¡Deployed!"
  ;;
  2)
	PLAYLOAD='{"profile": {"id": "1", "name": "Cris1", "description": "Learning Swedish.", "age": 33, "country": "Argentina", "learn": "Swedish", "teach": "Spanish", "teachTime": "Sa17-Su18", "meet": "meet.google.com/rri-fdmn-imv", "utc": -3}}'
	PLAYLOAD="'"$PLAYLOAD"'"
	FUNCTIONTOCALL="setProfile"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "¡Profile Set!"
  ;;
  3)
	FUNCTIONTOCALL="getProfile"
	PLAYLOAD='{"id": "1"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile READ"
	;;
  4)
	FUNCTIONTOCALL="rateProfile"
## (id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool)
	PLAYLOAD='{"id": "1", "quarrelPosition":0 , "comment":"Good teacher","rating":5, "quarrel": false }'
	PLAYLOAD="'"$PLAYLOAD"'"
##	AMOUNT="1000000000000000000000000"
##	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --depositYocto=$AMOUNT --accountId $BUYER.$MY_ACCOUNT"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile rated"
	;;
  5)
	FUNCTIONTOCALL="viewComments"
	PLAYLOAD='{"id": "1"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile viewComments READ"
	;;
  6)
	FUNCTIONTOCALL="viewPicture"
	PLAYLOAD='{"id": "1"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile viewpicture READ"
	;;
  7)
	FUNCTIONTOCALL="defendProfile"
## id: string, quarrelPosition: number, Picture: string)
	PLAYLOAD='{"id": "1",  "quarrelPosition": 0 , "Picture":"https://picture00.com" }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile defended"
	;;
  8)
	FUNCTIONTOCALL="changeRateProfile"
	PLAYLOAD='{"id": "1", "quarrelPosition":0 , "comment":"Bad teacher","rating":1, "quarrel": false }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile rating changed"
	;;

esac

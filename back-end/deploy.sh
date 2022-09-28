
#!/bin/bash

WASM_FILE_NAME="Language-exchange-contract.wasm"
MY_ACCOUNT="cryptocris.testnet"
CONTRACT="languagedev"
BUYER="buyer1"



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

read menu

case $menu in
  1)
	yarn asb
	near deploy --accountId $CONTRACT.$MY_ACCOUNT --wasmFile build/release/$WASM_FILE_NAME
	echo "¡Deployed!"
  ;;
  2)
	PLAYLOAD='{"profile": {"id": "6", "name": "Cris6", "description": "Learning Swedish.", "age": 33, "country": "Argentina", "learn": "Swedish", "teach": "Spanish", "teachTime": "Sa17-Su18", "meet": "meet.google.com/rri-fdmn-imv", "utc": -3}}'
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
	PLAYLOAD='{"id": "6"}'
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
	PLAYLOAD='{"id": "6", "quarrelPosition":0 , "comment":"Good teacher","rating":6, "quarrel": false }'
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
	FUNCTIONTOCALL="viewRate"
	PLAYLOAD='{"id": "6", "quarrelPosition":0 }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile viewRate READ"
	;;
  6)
	FUNCTIONTOCALL="defendProfile"
	PLAYLOAD='{"id": "6", "quarrelPosition":0 , "Picture":"https://www.newPicture.com" }'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PROfile defended. pic added."
	;;
  7)
	FUNCTIONTOCALL="setClasses"
	PLAYLOAD='{"Date": "28_09_22_WE14"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;
  8)
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
	FUNCTIONTOCALL="viewMyClassesGiven"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "viewClasses"
	;;
  10)
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
	FUNCTIONTOCALL="getProfiles"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "viewClasses"
	;;
  12)
	FUNCTIONTOCALL="takeClasses"
	PLAYLOAD='{"id": 5}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;
  13)
	FUNCTIONTOCALL="markClassTaken"
	PLAYLOAD='{"id": 5}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;
  14)
	FUNCTIONTOCALL="markClassGiven"
	PLAYLOAD='{"id": 5}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "Classes set"
	;;

  15)
	FUNCTIONTOCALL="buyBalance"
## (id: string, quarrelPosition: i32, comment: string, rating: u16, quarrel: bool)
	PLAYLOAD='{"id": "5"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	AMOUNT="1000000000000000000000000"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --depositYocto=$AMOUNT --accountId $BUYER.$MY_ACCOUNT"
##	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "buyBalance"
	;;	
esac

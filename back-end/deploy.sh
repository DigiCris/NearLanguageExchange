
#!/bin/bash

WASM_FILE_NAME="Language-exchange-contract.wasm"
MY_ACCOUNT="cryptocris.testnet"
CONTRACT="languagedev"
BUYER="buyer1"



echo "1) Deploy"
echo "2) setProduct"
echo "3) getProduct"
echo "4) buyProduct"
read menu

case $menu in
  1)
	yarn asb
	near deploy --accountId $CONTRACT.$MY_ACCOUNT --wasmFile build/release/$WASM_FILE_NAME
	echo "¡Deployed!"
  ;;
  2)
	PLAYLOAD='{"product": {"id": "1", "name": "BBQ2", "description": "Grilled chicken and beef served with vegetables and chips.", "location": "Berlin, Germany", "price": "1000000000000000000000000", "image": "https://i.imgur.com/yPreV19.png"}}'
	PLAYLOAD="'"$PLAYLOAD"'"
	FUNCTIONTOCALL="setProduct"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --accountId $MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "¡Product Set!"
  ;;
  3)
	FUNCTIONTOCALL="getProduct"
	PLAYLOAD='{"id": "0"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	COMAND="near view $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PRODUCT READ"
	;;
  4)

	FUNCTIONTOCALL="buyProduct"
	PLAYLOAD='{"id": "0"}'
	PLAYLOAD="'"$PLAYLOAD"'"
	AMOUNT="1000000000000000000000000"
	COMAND="near call $CONTRACT.$MY_ACCOUNT $FUNCTIONTOCALL $PLAYLOAD --depositYocto=$AMOUNT --accountId $BUYER.$MY_ACCOUNT"
	echo $COMAND > run.sh
	chmod 777 run.sh
	./run.sh
	echo "PRODUCT bought"

	;;
esac

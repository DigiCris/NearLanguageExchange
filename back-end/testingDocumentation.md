En deploy.sh está el uso de las funciones y como las utilicé para llevar a cabo estos testeos que especifico más abajo

1) Alguien se crea un perfil para dar clases (Funcionando)
	setProfile

2) Como usuario maestro quiero ver las clases que he creado (Funcionando)
	viewClassesStartToStop => filtrar por Teacher

3) Como usuario Maestro quiero crear todas las clases que quiera (Funcionando)
	setClasses => (Todas clases de 1hs... el formato es el siguiente 27_09_22_TU14)

3) Como usuario alumno quiero ver las clases que hay disponibles (funcionando)
(// no need
	getProfiles => se puede filtrar perfiles por el campo teach (usando el learn del alumno)
			(También podemos tomar el campo teachTime que servirá para el ofrecimiento de clases)
)
	getProfile => Con este puedo obtener el campo learn del alumno

	viewClassesStartToStop => filtrar cual no está booked
	
	Si el usuario aprieta en un peril podríamos mostrarle la reputacion utilizando:
	viewRate => el id debería ser el del profesor, el quarrelPosition un valor a recorrer.

4) Como usuario alumno quiero ver las clases que he tomado/tomaré (funcionando)
	viewClassesStartToStop => filtrar por Student

5) Como usuario quiero poder comprar saldo (funcionando)
	 buyBalance

6) Como usuario alumno quiero poder tomar la clase. (funcionando)
	takeClasses => con esto ya me marca que la tomaré y transfiere el saldo pero no lo deja usar

7) Como usuario maestro quiero poder marcar una clase como dada (Funcionando)
	markClassGiven => con esto puedo marcar que ya dí la clase

8) Como usuario alumno quiero poder marcar una clase como recibida/ abrir reclamo (funcionando)

	recibida => markClassTaken / rateProfile (rateProfile es más completa, incluye a la otra)
	abrir reclamo => rateProfile

9) Como usuario alumno quiero poder ver los reclamos que abrí (funcionando)
	Nota= Podría hacerlo en viewClassesStartToStop (usando otro campo para filtrar)

10) como usuario maestro quiero poder ver los reclamos que me han abierto (funcionando)
	Nota= Podría hacerlo en viewClassesStartToStop (usando otro campo para filtrar)

11) Como usuario maestro quiero poder responder al reclamo (funcionando)
	defendProfile => Nota= falta arreglarlo en funcion de lo que implemente arriba

12) Como administradores queremos poder resolver el reclamo (Funcionando)
Nota=> falta implementar

13) Como usuario quiero poder vender saldo. (Funcionando)
	sellBalance

14) No quiero que el profesor pueda liberarse el saldo solo cuando esta en un quarrel (Funcionando)

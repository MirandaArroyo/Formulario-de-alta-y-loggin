# FORMULARIO Y VALIDACIONES:

En primer lugar creamos el formulario con los datos solicitados en HTML, los campos obligatiorios los creamos con “required” dentro de la etiqueta input.
A continuación creamos un archivo js que contenga las validaciones del codigo y creamos una función que contenga un array con todos los paises, lo recorremos y hacemos que en el formulario aparezca un option con todos los paises

La opción para introducir la tarjeta de crédito solo aparecerá si se han introducido datos de país y dirección, para que esto ocurra en el formulario, creamos un div con <b>style=”display:none”</b> y dentro el label y el input.  En el archivo js, creamos la función muestraCampo()  que compruebe que la dirección no esta vacia, en el caso de no estarlo cambiaremos el <b>display:none;</b> por <b>display:block.</b>

```
<div id="tarjeta" style="display:none;">
    <label for="tarjeta" >Numero de tarjeta de credito:  </label>
<input type="text" id="tarjeta"/></div>

```
```
function muestraCampo(){
    var direccion= document.getElementById("direccion").value;
    
    if(direccion!=""){
        document.getElementById("tarjeta").style.display='block';
    }else{
        document.getElementById("tarjeta").style.display='none';
}
```

### VALIDACIONES:
guardamos en variables los datos introducidos por el usuario y a continuación creamos la variable “todo correcto” que devolverá true si todas las validaciones son correctas, en caso de serlo llamará a una función que creara una cookie con los datos del nombre y de la contraseña, también crearemos una cookie de sesión “logueado”  para que el usuario pueda iniciar sesión.

* **Validación de nombre:** 
Hacemos un Split (separamos por espacios)  del nombre que nos ha pasado para que nos cree un array con una posición que almacene los datos para comprobar que no ha introducido mas de dos palabras, de ser asi pondremos la variable “todoCorrecto” a false y guardaremos en la variable “mensaje” el error: "El nombre no puede contener mas de dos palabras”

```
var arrayNombre= nombre.split(" ");
if(arrayNombre.length>2){
   todoCorrecto= false; 
   mensaje+="El nombre no puede contener mas de dos palabras <br>";
 }
```

* **Validacion de Apellidos:** 
Para la validación de los apellidos seguimos el mismo procedimiento que en la validación del nombre.
Validacion de correo electrónico: creamos una expresión regular con los requisitos del correo electrónico y la guardamos en una variable, después con  .test(correo)  comprobamos que coincide con lo que nos ha introducido el usuario. Si no coincide guardamos en la variable mensaje el error correspondiente. 

```
var arrayApellidos= apellidos.split(" ");
     if(arrayApellidos.length>2){
       todoCorrecto= false; 
        mensaje+="los apellidos no pueden contener mas de dos palabras<br>";
    }
```

* **Validacion de correo electronico:** creamos una expresión regular con los requisitos del correo electrónico y la guardamos en una variable, después con  .test(correo)  comprobamos que coincide con lo que nos ha introducido el usuario. Si no coincide guardamos en la variable mensaje el error correspondiente. 
```
var valido = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
if (!valido.test(correo)){
    todoCorrecto= false;
    mensaje+="El correo electronico no coincide<br>";
}
```

* **Validación de contraseñas:**  Creamos una expresión regular con los requisitos de las contraseñas y primero con .test(contraseña) comprobamos que la contraseña introducida por el usuario coincide con la expresión regular, después comprobamos que la segunda contraseña introducida coincide con la primera, en caso de que alguna de estas validaciones no sea correcta ponemos “todoCorrecto” a false y guardamos en la variable “mensaje” el mensaje de error.

```
var passValida=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
if(!passValida.test(contrasenia1) || contrasenia1!==contrasenia2){
   todoCorrecto= false;
   mensaje+="las contraseñas deben coincidir <br>";
}
```

* **Validación de tarjeta de credito:**  Creamos dos variables, una con una expresión regular que valide la tarjeta visa y otra con la expresión regular que nos valide la mastercard, si la tarjeta introducida no coincide con ninguna de las dos expresiones reguares ponemos “ todoCorrecto” a false e incluimos en la variable “mensaje” el mensaje de error.

```
var visa=/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/g;
var mastercard=/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/g;
tarjeta=parseInt(tarjeta);
    if(tarjeta && !visa.test(tarjeta) && !mastercard.test(tarjeta)){     
            todoCorrecto=false;
            mensaje+="El numero de tarjeta no es correcto";
    }
```

* **Por ultimo** añadimos una comprobación para saber si “todoCorrecto” esta a true o a false, en caso de ser true llamaremos a la función “guardarCookie” que nos creará una cookie para el nombre de usuario y contraseña, también mostraremos un mensaje al usuario para indicar que los datos del registro son correctos.
En el caso de que “todoCorrecto” sea false, mostraremos un mensaje con los errores que se han producido en el formulario.

```
if(todoCorrecto){
        alert("se han registrado los datos correctamente");
        guardarCookie("name", nombre, 2);
        guardarCookie("password", contrasenia1, 2);
}else{
    alert(mensaje);
}
```


# COOKIES:

* **Cookie de creación:** Creamos una función a la que pasamos por parámetros el nombre de la cookie, su valor y el tiempo de expiración. 

```
function guardarCookie(nombreCookie, valorCookie, diasExpirar) {
	var fecha = new Date();
	fecha.setTime(fecha.getTime() + (diasExpirar *24*60*60*1000));
	var expira = "expira="+ fecha.toUTCString();
	document.cookie = nombreCookie + "=" + valorCookie + ";" + expira + ";path=/";
}
```

* **Obtención de cookie:** Creamos una función que nos compruebe si la cookie existe, para ello pasamos a la función como parámetro el nombre de una cookie. 
Mediante un Split separaremos los datos de la cookie y recorreremos el array en busca del dato de la cookie que queremos encontrar con indexOf, si encuentra la cookie nos devolverá un substring con la información que queremos y sino nos devolverá una cadena vacia.

```
function obtenerCookie(nombreCookie) {
	var nombre = nombreCookie + "=";
	var cookieDescodificada = decodeURIComponent(document.cookie);
	var arrayCookie = cookieDescodificada.split(';');
	for(var i = 0; i < arrayCookie.length; i++) {
    	var cookie = arrayCookie [i];
    	while (cookie.charAt(0) == ' ') {
        	cookie = cookie.substring(1);
    	}
    	if (cookie.indexOf(nombre) == 0) {
        	return cookie.substring(nombre.length, cookie.length);
    	}
	}
	return "";
}
```

* **Comprobar si la cookie existe para el inicio de sesión:**  Creamos la función “confirmaCookie” para comprobar si el usuario esta registrado o no en nuestra, para ello llamamos a la función “obtenerCookie” y pasaremos como parámetro el nombre y la contraseña. Si los datos que ha introducido el usuario coinciden con los datos de la cookie creamos una cookie de sesión “logueado” y la pondremos a true y mostraremos un mensaje de bienvenida, si no coinciden mostraremos un mensaje para hacer saber al usuario que los datos no son correctos o no esta registrado en la pagina.

```
function confirmaCookie(){
    var user=document.getElementById("nombre2").value;
    var passw=document.getElementById("pass").value;
    var nombreUsuario=obtenerCookie("name");
    var contrasenia=obtenerCookie("password")
    if (user == nombreUsuario && passw==contrasenia) {
        guardarCookie("logueado", true, 2);
        alert("Welcome again " + user); 
        return true;
        
    } else {
        alert("No estas registrado en esta pagina");
    }
}
```
* **Destruccion de cookie:**  Creamos la función cerrarSesion() para destruir la cookie de sesión, esto hara que el usuario pueda desconectarse de la pagina, para ello, comprobamos si logueado es true, de ser asi mediante la función guardarCookie cambiamos su valor a false e introducimos que la fecha de expiración sea un dia pasado. 

```
function cerrarSesion(){
    if(obtenerCookie('logueado')=='true'){
        guardarCookie('logueado', 'false',-1);
        location.reload();
    }else{
        location.href = '#';
    }
}
```
# PRUEBAS DE VALIDACION CON SELENIUM:

Realizamos 10 pruebas de validación:
1.	Todo correcto (sin introducir tarjeta)
2.	Nombre mal
3.	Apellido mal
4.	Correo electrónico mal
5.	Contraseñas no coinciden la una con la otra
6.	Contraseñas no tienen el formato adecuado(números y letras)
7.	Tarjeta de crédito sin el formato adecuado
8.	Tarjeta de crédito visa con el formato adecuado
9.	Tarjeta de crédito mastercard con el formato adecuado
10.	Contraseñas no tienen el formato adecuado(números)


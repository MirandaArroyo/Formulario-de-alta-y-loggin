
function validaformulario(){
    var todoCorrecto=true;
    var nombre= document.getElementById("nombre").value;
    var apellidos= document.getElementById("apellidos").value;
    var correo= document.getElementById("correo").value;
    var contrasenia1= document.getElementById("contrasenia").value;
    var contrasenia2= document.getElementById("confirmacion").value;
    var haseada = sha256(contrasenia1);
    var pais= document.getElementById("pais").value;
    var tarjeta=   document.getElementById("tarjeta").value;
    var mensaje="";
    var passValida=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    var valido = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    var visa=/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/g;
    var mastercard=/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/g;
    
    //validaciones de nombre
    var arrayNombre= nombre.split(" ");
    if(arrayNombre.length>2){
       todoCorrecto= false; 
       mensaje+="El nombre no puede contener mas de dos palabras <br>";
    }
    //validacion apellidos
    var arrayApellidos= apellidos.split(" ");
     if(arrayApellidos.length>2){
       todoCorrecto= false; 
        mensaje+="los apellidos no pueden contener mas de dos palabras<br>";
    }
    //validacion de correo electronico
    
     if (!valido.test(correo)){
        todoCorrecto= false;
        mensaje+="El correo electronico no coincide<br>";
    }
    //validacion de contraseña
     
    if(!passValida.test(contrasenia1) || contrasenia1!==contrasenia2){
           todoCorrecto= false;
            mensaje+="las contraseñas deben coincidir <br>";
    }
    //validar tarjeta
    tarjeta=parseInt(tarjeta);
    if(tarjeta && !visa.test(tarjeta) && !mastercard.test(tarjeta)){     
            todoCorrecto=false;
            mensaje+="El numero de tarjeta no es correcto";
    }
    
    if(todoCorrecto){
        alert("se han registrado los datos correctamente");
        //document.cookie = name=nombre;
        //document.cookie = password=contrasenia1;
        guardarCookie("name", nombre, 2);
        guardarCookie("password", haseada, 2);
    }else{
        alert(mensaje);
    }
    
}
//con esta funcion mostraremos el campo de la tarjeta de credito si el usuario ha introdicido direccion
function muestraCampo(){
    var direccion= document.getElementById("direccion").value;
    
    if(direccion!=""){
        document.getElementById("Campotarjeta").style.display='block';
    }else{
        document.getElementById("Campotarjeta").style.display='none';
    }
}

function campoPaises(){
    var state = new Array("Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic",
    "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome",
    "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe");
    var paises= document.getElementById("pais"),option;
    
    for(var hi=0; hi<state.length; hi++){
         option= document.createElement("option");
        option.setAttribute("value", state[hi]);
        option.innerHTML=state[hi];
        paises.appendChild(option);
    }
}

function guardarCookie(nombreCookie, valorCookie, diasExpirar) {
	var fecha = new Date();
	fecha.setTime(fecha.getTime() + (diasExpirar *24*60*60*1000));
	var expira = "expira="+ fecha.toUTCString();
	document.cookie = nombreCookie + "=" + valorCookie + ";" + expira + ";path=/";
}
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
function confirmaCookie(){
    var user=document.getElementById("nombre2").value;
    var passw=document.getElementById("pass").value;
    var passHaseada=sha256(passw);
    var nombreUsuario=obtenerCookie("name");
    var contrasenia=obtenerCookie("password");
    if (user == nombreUsuario && passHaseada==contrasenia) {
        guardarCookie("logueado", true, 2);
        alert("Bienvenido/a " + user); 
        return true;
        
    } else {
        alert("Los datos no son correctos");
    }
}

function cerrarSesion(){
    if(obtenerCookie('logueado')=='true'){
        guardarCookie('logueado', 'false',-1);
        location.reload();
    }else{
        location.href = '#';
    }
}


if(obtenerCookie("logueado")=="true"){
     document.getElementById('inicioSesion').innerHTML="Cerrar sesion";
}
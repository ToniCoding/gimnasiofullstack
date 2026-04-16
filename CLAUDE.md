# Contexto del proyecto
Se requiere crear el backend y frontend de una aplicación web para gimnasio. Esta aplicación deberá tener la funcionalidad necesaria
para poder registrar usuarios, sesiones de gimnasio con diferentes tipos de ejercicios.

## Tecnologías
- Java 25.
- MySQL. La base de datos se llamará "gymfullstack".
- Spring y sus frameworks como SpringBoot, Spring Security.
- Hibernate para crear y manejar las tablas de la BD.
- React para manejar todo el frontend.
- Tailwind CSS para estilos generales.
- La biblioteca Material UI.
- Componentes distintos de la biblioteca como button, input, card, dialog.

# Funcionalidad crítica
La siguiente funcionalidad es de vital importancia que funcione correctamente y no se añada más que lo que se pide en este documento indicativo:
- (Cualquier usuario) Registro e inicio de sesión para usuarios: Los usuarios nuevos deben ser capaces de acceder a una página con un formulario de inicio de sesión para poder iniciar sesión o bien poder registrarse en otro formulario, accesible desde el mismo formulario de inicio de sesión.
- (Con usuario logueado) El usuario podrá registrar sus sesiones de ejercicios. Estas sesiones contienen una LISTA de ejercicios y estos ejercicios contienen otra LISTA con tantos elementos como repeticiones se hayan creado. Más adelante, se detalla información más específica respecto a esto.
- (Cualquier usuario) Cualquier usuario que no haya iniciado sesión, deberá ser redirigido al formulario de login.
- (Con usuario logueado) Los usuarios que hayan iniciado sesión y accedan a una página no existente, serán redirigidos a una página especial para un error 404.
- (Con usuario logueado) Los usuarios pueden ver un historial de entrenamientos y acceder individualmente a cada uno de ellos para ver los ejercicios que hicieron, fecha y duración de la sesión.

# Estructura del proyecto
De la raíz, cuelgan los directorios "backend" y "frontend", cada uno de ellos tiene dentro su respectivo "src" donde se encuentra la lógica de cada campo.

## Backend
En backend hay una plantilla con directorios utiles y que se requiere seguir al pie de la letra:

/config - Para configuraciones que afecten a la forma de trabajar de Spring, aquí tendrás que poner lógica de configuración para el JWT y para que este sea pedido para autorizar y reconocer al usuario en CADA request que se reciba a excepción del login y registro.

/controller - Todos los controladores del backend deben ir aquí.

/dto - Para almacenar DTOs o records, según corresponda.

/exception - Todas las excepciones personalizadas del software junto al manejador global de excepciones.

/model - Todos las entidades necesarias.

/repository - Todos los repositorios de las tablas junto con los métodos adicionales que se puedan poner y que sean útiles pero no vengan incluidos en el CRUD que proviene de JpaRepository.

/service - Todas las clases que interactúan como capa entre el frontend y repository. Aquí es donde debe ir TODA la lógica de negocio.

### Instrucciones para backend
- Desacopla la lógica de negocio, lógica general y repositorios, no mezclar lógica para seguir el patrón SOLID.
- En los controladores no debe ir NADA de lógica, eso recae sobre el servicio y repositorios.
- Sigue conveniciones para API REST, ya que esto va a ser una API rest para el gimnasio.
- Haz uso de los roles y más funcionalidad de Spring Security aparte de JWT para añadir más robustez al backend.
- El JWT viene siempre en los headers de las request así se necesita extraer de ahí.

## Frontend
En frontend no hay nada creado, crea toda la estructura que consideres adicionalmente al App.tsx para React.

### Instrucciones para frontend
- Necesitamos un frontend simple, limpio y que focalice en lo importante como las cards.
- Usa tailwind CSS para los estilos más generales.
- Usa Material UI para los estilos concretos y para diseñar el frontend más específico.
- React debe formar los payloads que luego enviará a los respectivos endpoints del backend junto con el JWT.
- El JWT debe ser almacenado en el cliente y enviado como header en cada request para usuarios autenticados que se envíe.

# Endpoints de la aplicación web
/register -> Endpoint de frontend donde se mostrará el formulario de registro para los usuarios.
/login -> Endpoint principal donde se mostrará el formulario de inicio de sesión. Se redirige aquí siempre que los usuarios intentan acceder a un endpoint que necesita autenticación y no se tiene.
/home -> Endpoint de frontend por defecto para usuarios logueados. Es donde se muestran los datos de las últimas sesiones en cards con la información principal como duración, cantidad de ejercicios realizados y repeticiones.
/exercise -> Endpoint para registrar una sesión de ejercicios.
/profile -> Endpoint donde el usuario puede ver sus datos como correo electrónico, nombre, apellidos, fecha de nacimiento, número de entrenamientos registrados.

## Métodos HTTP para cada endpoint
### Register
GET -> Muestra el formulario de registro. Manejado por React.
POST -> Envía el JSON (formado por React) con los datos del usuario a registrar.

### Login
GET -> Muestra el formulario de inicio de sesión. Manejado por React.
POST -> Envía el usuario y contraseña del usuario. Devuelve 200 con un JWT en caso correcto y un 401 si no es correcto.

### Home
GET -> Muestra la página principal con las especificaciones previas.

### Exercise
GET -> Muestra el formulario donde el usuario puede dar a un botón "+" para agregar ejercicios. Estos ejercicios tendrán otro botón "+" para agregar series. Cada serie debe contener KG y REP para que el usuario ponga los kilogramos levantados y repeticiones.
POST -> Envía el JSON con todos los datos del entrenamiento. Duración, fecha del entrenamiento y un array con los ejercicios individuales realizados.

### Profile
GET -> Muestra los datos mencionados del usuario.
PATCH -> Envía un JSON con los campos a modificar del usuario. Puede que no se envíen todos porque el usuario solo quiera cambiar uno o dos datos.

# Instrucciones finales
- Recuerda que los entrenamientos deben estar ligados a un usuario.
- Los usuarios deben estar identificados a través de su JWT.
- El JWT será preciso en todos los endpoints privados.
- Para cualquier cosa que sea relacionada con tiempo, usa timestamp para más precisión.
- Mantén una estructura limpia y respetuosa con el clean architecture.
- Sigue las convenciones de codificación como principios SOLID.
- Usa Link o NavLink, no uses nunca el <a href>, esta terminantemente prohibido.
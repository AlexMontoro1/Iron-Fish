# Iron-Fish
## [Go check our project](https://iron-fish.adaptable.app/)

## Descripción
Proyecto de una catalogo web de peces donde puedes interactuar con ellos, crear tu propia pecera, editarla, eliminarla y añadirle peces. El usuario tiene distintas funcionalidades que deberás descubrir.

## User Stories

**NOTE -**  Lista de todas las funcionalidades del usuario:

- **homepage** - En la pagina principal el usuario es capaz de buscar una clase de pez, los peces por tipo de agua o por nivel de agresividad.
- **sign up** - En este enlace puedes crearte una cuenta de usuario para obtener mas funcionalidades.
- **login** - En login puedes acceder a tu perfil de usuario y se te habilitaran todas las funcionalidades de usuario.
- **logout** - Puedes cerrar la sesión y de esta forma evitar que alguien utilice tus datos.
- **catalog** - Ver el catalogo completo de peces y a su vez ver los detalles de cada pez.
- **bowl** - Cada usuario puede tener diferentes peceras y añadirle los peces que sean de su gusto o también simular su pecera real en su perfil.
- **admin create** - Si el usuario es un administrador, puede crear un pez, eliminar pez y editar un pez.

## Backlog Functionalities

**NOTE -** Lista de funcionalidades para añadir en el futuro:
- ** friends ** - Lista de amigos entre usuarios.

## Technologies used

**NOTE -** Tecnologías usadas: List here all technologies used in the project like HTML, CSS, Javascript, Node, Express, Handlebars, Sessions & Cookies, etc.
- HTML
- Javascript
- Node
- Express
- Handlebars
- Sessions
- Cookies
- MongoDb
- CSS 
- Bootstrap


## Models

**NOTE -** List here all the models & Schemas of your Database Structure. Example: 

User model
 
```
username: String     
email: String      
password: String
image: String 
favFish: ObjectId<Fish>
wantedFish ObjectId<Fish>
role: String
```

Fish model

```
name: String,
description: String,
type: String,
lifeExp: String,
aggr: Number,
url: String
``` 

MyFish model

```
name: String
owner: ObjectId<User>
age: String
fish: ObjectId<Fish>
bowl: ObjectId<Bowl>
``` 

Comment model

```
content: String
fish: ObjectId<Fish>
author: ObjectId<User>
``` 

Bowl model

```
name: String
capacity: Number
water: String
isClosed: String
owner: ObjectId<User>
``` 

## Links

## Collaborators

[Alejandro Montoro](https://github.com/AlexMontoro1/)

[Carlos Ponce](https://github.com/kakoff17)

### Project

[Repository Link](https://github.com/AlexMontoro1/Iron-Fish)

[Deploy Link](https://iron-fish.adaptable.app/search)

### Slides

[Slides Link](www.your-slides-url-here.com)

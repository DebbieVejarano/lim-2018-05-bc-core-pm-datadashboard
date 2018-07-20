# Data Dashboard
_Proyecto diseñado y elaborado por Debbie Miñano y Jhoselin Mancilla para el  bootcamp de Laboratoria 2018._

## Índice

* **User experience design:** En esta sección presentamos los pasos que recorrimos para  entregar un prototipo pensado en la experiencia de usuario.

* **Implementación de la interfaz de usuario:** Aquí explicamos como llegamos, de manera lógica, a resolver este reto.

* **Flujo de trabajo** Revisa esta información para conocer como acceder y sacarle el máximo provecho a nuestro proyecto.

***
Prueba nuestro demo aquí: https://debbievejarano.github.io/lim-2018-05-bc-core-pm-datadashboard/src/

## User experience design

Antes de empezar a diseñar nuestro proyecto decidimos replantearnos cuatro valores de trabajo para obtener mejores resultados y el aprovechar el uso de la plataforma de trello.

![](https://fotos.subefotos.com/e346256a8614733b66a66d58759b5018o.jpg)

![](https://fotos.subefotos.com/48960344735d76929e9256d2f1827664o.png)

Ahora que llegamos a un acuerdo, iniciamos el desarrollo:

#### **Definición del producto**

Primero debimos descubrir e investigar a nuestros usuarios. Esto nos permitió plantear la forma de resolver sus necesidades. Para la investigación, aplicamos entrevistas en profundidad a usuarios y expertos. Y cuando obtuvimos esa información, creamos un user persona para que los represente.

- **Principales usuarios de producto:** Training Managers (TMs) de Laboratoria.

- **Objetivos de los usuarios en relación al producto:** Conocer el progreso de las estuadiantes para tomar desiciones estratégicas que mejoren su rendimiento.  

- **Datos más relevantes que quieren ver en la interfaz:** Lo más importante para nuestros usuarios es poder acceder a la información de progreso de las estudiantes por cohort y de manera individual. Lo descubrimos mediante entrevistas en profundidad.

- **Cuándo revisan estos datos los usuarios:** Lo revisan durante sus horas de trabajo; sin embargo, porque la interfaz actual no es tan amigable lo suelen visitar solo cuando las alumnas finalizan un proyecto.

- **Cómo nuestro producto resuelve sus problemas:** Nuestro interfaz permite ver el progreso de las alumnas mediante gráficos y sin necesidad de reenviarte a un excel.

- **Cómo fue tu proceso de diseño:** Primero, tratamos de entender que nos estaba pidiendo realizar laboratoria. Con esa idea decidimmos elaborar un sketch. Sin embargo, necesitábamos conocer a nuestras usuarias. Páctamos una entrevista y aprovechamos para que nos brinden una oinión de nuestro diseño. Con ese feedback, pasamos elaborar un prototipo en baja fidelidad y luego en alta. Siempre aprovechando unos minutos para probar nuestros prototipos con las usuarias.


##### *Guía de entrevista en profundidad:*
![](https://fotos.subefotos.com/5f24f9222e513f2414e442b7b04ea5f5o.jpg)


##### *User persona:*
![](https://fotos.subefotos.com/e2dfdaf8e9850d4ac6c94d9d43472545o.jpg)


##### *Sketch:*
![](https://fotos.subefotos.com/18627f3a20293e5c5586327118217c5fo.jpg)


##### *Diseño de la Interfaz de Usuario (prototipo de alta fidelidad):*

https://www.figma.com/proto/GZJD2lJKA6xPodjwtljlot/Figma-Keyboard-Shortcuts?node-id=203%3A0&scaling=min-zoom

![](https://fotos.subefotos.com/43411813ddcb863545e831e9ec35f0e7o.jpg)

![](https://fotos.subefotos.com/7761ba8d9b96bd4ebd4c2420701e0f4ao.jpg)

![](https://fotos.subefotos.com/f43dda22d3b765d29d4ddc1d32a90e6ao.jpg)

![](https://fotos.subefotos.com/3a23f626c557d37b473b93e5ffe7e60co.jpg)


## Implementación de la interfaz de usuario
Si bien existen muchas librerías y frameworks disponibles, este proyecto ha sido realizado usando vanilla javascript. Guiadas del tiempo disponible y las expectativas de nuestras entrevistadas, presentamos una interfaz sencilla que puede ser anexada a un login y otras opciones. ¡Anímate a hacerle cambios a este proyecto!

## Flujo de trabajo

#### Ejecutar la aplicación localmente
Necesitas instalar:
* Git Bash
Luego, debes *clonar* este repositorio en tu equipo
```bash
git clone https://github.com/Jhozhelin/lim-2018-05-bc-core-pm-datadashboard.git
```

#### Instala dependencias
Necesitas instalar
* Node.js®

Luego, ejecuta el comando npm install
```
npm install
```

Finalmente, este proyecto esta provisto de tests que puedes ejecutar con el siguiente comando
```
npm test
```
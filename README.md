# CRM IAESTE

CRM para que el equipo de empresas de un comité de IAESTE reparta, contacte y haga seguimiento de empresas, con historial de actividad y ranking de puntos.

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL + Auth + Row Level Security)
- **Hosting:** Vercel

Cada comité monta **su propia copia**: su propio Supabase y su propio despliegue en Vercel. Ningún comité ve los datos de otro, y este repositorio no contiene datos de nadie.

---

## Antes de empezar: qué tiene que poner tu comité

Este repositorio trae el código y las instrucciones. Lo demás lo aporta cada comité:

| Qué | Para qué |
|---|---|
| **Cuentas de GitHub, Supabase y Vercel** (las tres gratis) | Guardar tu copia del código, la base de datos y la web |
| **Un email compartido del comité** | Crear esas tres cuentas con él (ver consejo abajo) |
| **Una persona que siga esta guía** | No hace falta saber programar, pero sí moverse por paneles web sin perderse. Calcula 20–30 minutos |
| **Vuestro Excel de empresas** | Cargarlo en el paso 7 |
| **Vuestros logos** | Sustituir los de IAESTE Madrid que trae la plantilla (paso 6) |
| **Vuestras reglas de puntos** | Configurarlas en el paso 6 |

> **Consejo:** crea las tres cuentas con un **email compartido del comité** (no el personal de nadie) y con **email + contraseña**, nunca con "Continuar con GitHub". Guarda las contraseñas en un sitio que herede la siguiente junta. Si las cuentas son personales, el CRM se queda huérfano cuando esa persona se va.

---

## Instalación

### 1. Copia el código

Inicia sesión en GitHub y, en la página de este repositorio, pulsa **Use this template → Create a new repository**. Créalo en la cuenta de tu comité (puede ser privado).

### 2. Crea la base de datos

1. En Supabase, crea un proyecto nuevo (región: *West EU*).
2. Ve a **SQL Editor → New query**, pega el contenido entero de `supabase/schema.sql` y pulsa **Run**.
3. **Desactiva la confirmación por email:** **Authentication → Sign In / Providers → Email** → desactiva *Confirm email*.
   El servidor de correo que Supabase trae por defecto solo envía **unos pocos emails por hora**. Si lo dejas activado y se registra medio equipo a la vez, muchos no recibirán el correo de confirmación y no podrán entrar.
   *(Si más adelante configuráis vuestro propio servidor de correo en Authentication → Emails → SMTP, podéis volver a activarlo.)*
4. *(Recomendado)* **Authentication → Hooks → Before User Created** → elige la función `hook_antes_de_crear_usuario` y actívalo. Bloquea registros con emails temporales.

### 3. Copia las claves de Supabase

En **Project Settings → API** copia:

- **Project URL**
- **anon public key**

⚠️ Nunca uses ni compartas la `service_role` key. Esa da acceso total a la base de datos.

### 4. Despliega en Vercel

1. En Vercel, **Add New → Project** e importa tu repositorio.
2. En **Environment Variables** añade:

   | Nombre | Valor |
   |---|---|
   | `VITE_SUPABASE_URL` | la Project URL del paso 3 |
   | `VITE_SUPABASE_ANON_KEY` | la anon public key del paso 3 |

3. Pulsa **Deploy**. Te dará una dirección tipo `tu-comite-crm.vercel.app`.
4. En Supabase, **Authentication → URL Configuration**, pon esa dirección en *Site URL* (para que funcionen los enlaces de recuperar contraseña).

### 5. Hazte admin

Entra en `https://tu-comite-crm.vercel.app/?registro` y regístrate. **La primera cuenta que se registra es admin automáticamente**; todas las siguientes entran como miembro y puedes ascenderlas desde la pestaña *Equipo*.

### 6. Personaliza tu comité — ¡no te lo saltes!

La plantilla viene configurada **para IAESTE Madrid**. Si no cambias esto, los emails que vuestros miembros manden a empresas irán firmados como *"IAESTE Telecomunicación Madrid"* y con el email de ofertas de Madrid.

Edita **`src/config.js`** (en GitHub: abre el archivo → icono del lápiz → *Commit changes*):

| Qué | Dónde en `config.js` |
|---|---|
| **Nombre, email de ofertas, dirección y web** del comité (firma de los emails a empresas) | `COMITE` |
| Estados por los que pasa una empresa | `ESTADOS` |
| Apartados de la lista (disponibles, seguimiento, cerradas…) | `GRUPOS` |
| Cuántas empresas se reparten/quitan de golpe | `LOTE` |
| **Puntos por estado** | `PUNTOS_ESTADO` |
| Bonus de seguimiento quincenal (pon `0` para quitarlo) | `PUNTOS.quincena` y `QUINCENA` |
| Días sin movimiento para avisar | `SIN_MOVER` |

Sustituye también los logos en `public/` (mismo nombre de archivo):
- `logo-iaeste.png`: logo blanco de la cabecera
- `logo-iaeste-madrid.png`: logo de la firma del email. Cambia también `COMITE.logoEmail` para que apunte a **tu** dirección (`https://tu-comite-crm.vercel.app/logo-iaeste-madrid.png`)

Cada cambio que guardes en GitHub se publica solo en Vercel en un minuto.

#### Sobre el sistema de puntos

`config.js` permite decidir **cuántos puntos vale cada estado** de una empresa (contactada, cerrada, beca…), si hay **bonus por seguimiento quincenal** y cuánto vale. Cada empresa puntúa según su estado actual, para quien la tiene asignada.

Si vuestro sistema es **distinto en su forma** (puntos por reuniones, por llamadas, por actividades que no son empresas, que se acumulen en vez de sustituirse…) no basta con `config.js`: habría que modificar el código. Contacta con IAESTE Madrid antes de empezar.

### 7. Carga tus empresas

Guarda tu Excel como **CSV** y en Supabase ve a **Table Editor → empresas → Insert → Import data from CSV**. Columnas que entiende:

`nombre` (obligatoria), `cif`, `sector`, `contacto`, `email`, `telefono`, `direccion`

No incluyas `responsable` ni `estado`: entran sin asignar y como *Sin contactar*, y luego las repartes desde la pestaña *Equipo* con el botón **+5**.

⚠️ Nunca subas el Excel ni el CSV a GitHub: tienen datos de contacto de empresas.

---

## Uso diario

- **Nuevos miembros:** que se registren en `tu-comite-crm.vercel.app/?registro`.
- **Repartir empresas:** pestaña *Equipo* → **+5** junto a cada persona. **−5** le quita 5 de las que aún tiene sin contactar y las devuelve al bote.
- **Contraseña olvidada:** pestaña *Equipo* → icono de la llave → contraseña temporal.
- **Borrar una cuenta:** Supabase → Authentication → Users.

---

## Problemas frecuentes

| Problema | Solución |
|---|---|
| Alguien se registra pero dice que no le llega el email | Desactiva *Confirm email* (paso 2.3). Para quien ya se registró: Supabase → Authentication → Users → su usuario → *Confirm email* |
| La pantalla sale en blanco | Revisa en Vercel que las dos variables del paso 4 están bien escritas y vuelve a desplegar (*Deployments → Redeploy*) |
| Nadie es admin | Supabase → SQL Editor: `update profiles set rol = 'admin' where nombre = 'TU NOMBRE';` |
| Los emails a empresas salen con datos de Madrid | Te has saltado el paso 6 |
| No se ve el logo en la firma del email | `COMITE.logoEmail` sigue apuntando a la web de Madrid, o el archivo no está en `public/` |

---

## Cambios en la base de datos

Si cambias la estructura (nuevas columnas, políticas…), ejecuta el SQL en el SQL Editor **y** actualiza `supabase/schema.sql` en tu repositorio para que, si algún día tenéis que reinstalar, salga igual.

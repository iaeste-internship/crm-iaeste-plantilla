# CRM IAESTE

CRM para que el equipo de empresas de un comité de IAESTE reparta, contacte y haga seguimiento de empresas, con historial de actividad y ranking de puntos.

- **Frontend:** React + Vite + Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL + Auth + Row Level Security)
- **Hosting:** Vercel

Cada comité monta **su propia copia**: su propio Supabase y su propio despliegue en Vercel. Ningún comité ve los datos de otro.

---

## Qué necesitas

- Una cuenta de **GitHub**
- Una cuenta de **Supabase** (el plan gratuito sirve)
- Una cuenta de **Vercel** (el plan gratuito sirve)

Consejo: crea las tres con un **email compartido del comité** (no el personal de nadie) y con email + contraseña, no con "Continuar con GitHub". Así, cuando cambie la junta, el acceso no se pierde.

---

## Instalación (unos 20 minutos)

### 1. Copia el código

En la página de este repositorio pulsa **Use this template → Create a new repository** y créalo en la cuenta de tu comité.

### 2. Crea la base de datos

1. En Supabase, crea un proyecto nuevo (región: *West EU*).
2. Ve a **SQL Editor → New query**, pega el contenido entero de `supabase/schema.sql` y pulsa **Run**.
3. (Recomendado) Ve a **Authentication → Hooks → Before User Created**, elige la función `hook_antes_de_crear_usuario` y actívalo. Bloquea registros con emails temporales.
4. En **Authentication → Sign In / Providers → Email**, desactiva *Confirm email* si no quieres que los miembros tengan que confirmar el correo para entrar.

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

### 6. Personaliza tu comité

Edita **`src/config.js`**. Ahí está todo lo adaptable, sin tocar el resto del código:

| Qué | Dónde en `config.js` |
|---|---|
| Nombre, email, dirección y web del comité (firma de los emails a empresas) | `COMITE` |
| Estados por los que pasa una empresa | `ESTADOS` |
| Apartados de la lista (disponibles, seguimiento, cerradas…) | `GRUPOS` |
| Cuántas empresas se reparten/quitan de golpe | `LOTE` |
| Puntos por estado | `PUNTOS_ESTADO` |
| Bonus de seguimiento quincenal | `PUNTOS.quincena` y `QUINCENA` |
| Días sin movimiento para avisar | `SIN_MOVER` |

Sustituye también los logos en `public/`:
- `logo-iaeste.png`: logo blanco de la cabecera
- `logo-iaeste-madrid.png`: logo de la firma del email (o cambia `COMITE.logoEmail`)

Guarda, haz commit y push a GitHub: Vercel vuelve a desplegar solo en un minuto.

### 7. Carga tus empresas

En Supabase, **Table Editor → empresas → Insert → Import data from CSV**. Columnas que entiende:

`nombre` (obligatoria), `cif`, `sector`, `contacto`, `email`, `telefono`, `direccion`

Deja `responsable` vacío y `estado` como `sin_contactar`: luego las repartes desde la pestaña *Equipo* con el botón **+5**.

---

## Uso diario

- **Nuevos miembros:** que se registren en `tu-comite-crm.vercel.app/?registro`.
- **Repartir empresas:** pestaña *Equipo* → **+5** junto a cada persona. **−5** le quita 5 de las que aún tiene sin contactar y las devuelve al bote.
- **Contraseña olvidada:** pestaña *Equipo* → icono de la llave → contraseña temporal.
- **Borrar una cuenta:** Supabase → Authentication → Users.

---

## Cambios en la base de datos

Si cambias la estructura (nuevas columnas, políticas…), ejecuta el SQL en el SQL Editor **y** actualiza `supabase/schema.sql` en el repositorio para que la siguiente instalación salga igual.

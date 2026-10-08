// =====================================================================
//  CONFIGURACIÓN DEL COMITÉ
//  Todo lo que cada comité puede querer adaptar está en este archivo.
//  No hace falta tocar App.jsx para cambiar puntos, estados o datos de contacto.
// =====================================================================

// ---------- Datos del comité ----------
// Se usan en la cabecera, en la plantilla de email a empresas y en la firma.
export const COMITE = {
  nombre: 'IAESTE Telecomunicación Madrid',          // nombre completo (firma del email)
  nombreCorto: 'IAESTE Madrid',                       // asunto de los emails a empresas
  equipo: 'Equipo de Empresas IAESTE TLMA',           // línea bajo el nombre en la firma
  emailOfertas: 'iaestetlmd@gmail.com',               // adonde envían las empresas los formularios
  direccion: [                                        // líneas de dirección de la firma
    'E.T.S.I. Telecomunicación Madrid - Local 206 - L',
    'Avenida Complutense, 30, 28040, Madrid',
  ],
  web: 'https://www.iaeste.es',
  // Logo de la firma del email: URL pública (p. ej. tu-crm.vercel.app/logo.png, subido a /public)
  logoEmail: 'https://crm-iaeste.vercel.app/logo-iaeste-madrid.png',
  tituloApp: 'CRM IAESTE',                            // pantalla de login y exportaciones
}

// ---------- Estados de una empresa ----------
// id: no lo cambies una vez haya empresas usándolo (está guardado en la base de datos).
// label: texto que se ve. color/dot: clases de Tailwind.
// oculto: true → ya no se puede elegir, pero se sigue mostrando si alguna empresa está en él.
export const ESTADOS = [
  { id: 'sin_contactar', label: 'Sin contactar', color: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
  { id: 'no_contesta', label: 'No lo cogen', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', dot: 'bg-cyan-500' },
  { id: 'mail_enviado', label: 'Mail enviado', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', dot: 'bg-yellow-400' },
  { id: 'mas_adelante', label: 'Para más adelante', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', dot: 'bg-fuchsia-500' },
  { id: 'segundo_plazo', oculto: true, label: 'Segundo plazo', color: 'bg-amber-100 text-amber-900 border-amber-300', dot: 'bg-amber-700' },
  { id: 'otra_provincia', label: 'Otra comunidad', color: 'bg-neutral-100 text-neutral-600 border-neutral-300', dot: 'bg-neutral-400' },
  { id: 'interesados', label: 'Muy interesados', color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  { id: 'beca', label: 'Beca conseguida', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  { id: 'no_existe', label: 'Ya no existe', color: 'bg-stone-100 text-stone-500 border-stone-300 line-through', dot: 'bg-stone-400' },
  { id: 'rechazada', label: 'No quieren', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
]

// ---------- Apartados de la lista de empresas ----------
// Cada estado debería estar en uno de los tres primeros.
export const GRUPOS = [
  { id: 'disponibles', label: 'Empresas disponibles', estados: ['sin_contactar'] },
  { id: 'activo', label: 'Seguimiento activo', estados: ['no_contesta', 'mail_enviado', 'mas_adelante', 'segundo_plazo', 'interesados'] },
  { id: 'cerradas', label: 'Cerradas', estados: ['beca', 'rechazada', 'no_existe', 'otra_provincia'] },
  { id: 'historicas', label: 'Históricas', estados: null, historicas: true, soloAdmin: true },
  { id: 'todas', label: 'Todas', estados: null },
]

// ---------- Reparto de empresas ----------
export const LOTE = 5          // cuántas se asignan / quitan de golpe con los botones +5 / −5
export const AVISO_POCAS = 2   // a partir de cuántas sin contactar se avisa de pedir otro lote

// ---------- Puntos ----------
// Cada empresa vale según su estado ACTUAL (no se acumula al cambiar de estado).
// Los puntos son para quien tiene asignada la empresa. Las notas y las altas no puntúan.
export const PUNTOS_ESTADO = {
  sin_contactar: 0,
  no_contesta: 1, mail_enviado: 1, interesados: 1, segundo_plazo: 1,       // ya contactada
  mas_adelante: 3, otra_provincia: 3, no_existe: 3, rechazada: 3, beca: 3, // cerrada
}

export const PUNTOS = {
  quincena: 10,   // bonus por cumplir el seguimiento quincenal (0 para desactivarlo)
}

// ---------- Seguimiento quincenal ----------
// Cada `dias` días desde `inicio`, quien haya vuelto a tocar todas las empresas que tenía en
// seguimiento (estados de `activos`) se lleva PUNTOS.quincena.
export const QUINCENA = {
  inicio: '2026-09-28',   // un lunes: arranque de la primera quincena
  dias: 14,
  activos: ['no_contesta', 'mail_enviado', 'interesados'],
  cuentan: ['nota', 'estado'],
}

// ---------- Aviso «Realizar seguimiento» ----------
// Empresas en estos estados que llevan `dias` sin nota ni cambio de estado se marcan con un aviso.
export const SIN_MOVER = {
  dias: 7,
  estados: ['no_contesta', 'mail_enviado', 'interesados', 'segundo_plazo'],
}

# Panel de administración de PANAQA

En **https://panaqa.net/admin** se pueden editar, sin tocar código:

| Sección del panel | Qué cambia en la web | Archivo |
|---|---|---|
| **Fechas** | Sección *Fechas* (CH 05) y la cinta roja de la portada | `data/fechas.json` |
| **Teletienda** | Catálogo de *Merch* y la Teletienda de la portada (productos destacados) | `data/merch.json` |
| **Ajustes** | Número de WhatsApp y si se ocultan las fechas pasadas | `data/ajustes.json` |

Cada vez que se pulsa **Publicar**, el panel guarda el cambio en GitHub (rama `main`) y Netlify actualiza panaqa.net en 1–2 minutos.

---

## Activación (una sola vez)

> Requiere ser dueño o administrador del repositorio `akafilo/panaqa` en GitHub y del sitio en Netlify.

### 1. Crear la app de acceso en GitHub
1. Entrar a GitHub → foto de perfil → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Completar:
   - **Application name:** `PANAQA Admin`
   - **Homepage URL:** `https://panaqa.net`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. **Register application**. Copiar el **Client ID** y pulsar **Generate a new client secret** para copiar el **Client secret**.

### 2. Conectar esa app en Netlify
1. Entrar a Netlify → el sitio de panaqa.net → **Site configuration** → **Access & security** → **OAuth**.
2. En **Authentication providers** → **Install provider** → **GitHub**.
3. Pegar el **Client ID** y el **Client secret** → **Install**.

### 3. Dar acceso a quien vaya a editar
Cada persona necesita una cuenta de GitHub con permiso de escritura en el repositorio:
GitHub → repositorio `akafilo/panaqa` → **Settings** → **Collaborators** → **Add people**.

### 4. Entrar
Abrir **https://panaqa.net/admin** → **Iniciar sesión con GitHub**.

---

## Cómo se usa

**Fechas**
- **Fecha:** el día del show. Si todavía no hay día, déjala vacía y marca *Fecha por confirmar* (se muestra “??.?? POR ANUNCIAR”).
- **Invitados** se muestra como “w/ …”. **Nota** es texto libre para cuando no hay invitados.
- **Botón:** *ENTRADAS* (rojo) o *CONSULTAR*. Lleva a WhatsApp con el mensaje que escribas, o a un **enlace de venta** si lo pones.
- Las fechas que ya pasaron se ocultan solas (se puede desactivar en *Ajustes*). Si no queda ninguna, la web muestra “PRONTO NUEVAS FECHAS”.
- Las dos próximas fechas aparecen solas en la cinta roja de la portada.

**Teletienda**
- **Precio** en soles; la web lo muestra como “S/ 40.00”.
- **Fotos:** la primera es la principal. Las nuevas se suben a `assets/merch/`.
- **Opción a elegir:** *Talla* (escribe los valores: `S, M, L, XL`) o *Diseño* (`1, 2`, con una foto por diseño en el mismo orden).
- **Mensaje de WhatsApp:** la web le agrega sola la talla o el diseño elegido.
- **Destacado:** aparece en la Teletienda de la portada.
- **Agotado:** se ve tachado, con sello AGOTADO y sin botón de pedido.
- **Traducciones (opcional):** nombre y descripción en inglés y chino; si se dejan vacías, se usa el texto en español.

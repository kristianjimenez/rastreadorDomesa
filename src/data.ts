export type Shipment = {
  code: string;
  from: string;
  to: string;
  step: 0 | 1 | 2;
  kg: string;
  service: string;
  times: [string, string, string];
  eta: string;
};

export const SHIPMENTS: Shipment[] = [
  { code: "12345", from: "Caracas", to: "Maracaibo", step: 1, kg: "4,5 kg", service: "Express", times: ["07 Oct · 4:30 PM", "08 Oct · 10:00 AM", ""], eta: "09 Oct" },
  { code: "123456", from: "Valencia", to: "Caracas", step: 2, kg: "1,2 kg", service: "Estándar", times: ["29 Sep · 9:10 AM", "30 Sep · 1:45 PM", "02 Oct · 11:20 AM"], eta: "Entregado" },
  { code: "1234567", from: "Barquisimeto", to: "Puerto Ordaz", step: 2, kg: "9 kg", service: "Carga", times: ["14 Sep · 3:00 PM", "15 Sep · 8:00 AM", "18 Sep · 5:15 PM"], eta: "Entregado" },
];

// Coordenadas aproximadas (lat, lon) de las ciudades donde DOMESA tiene oficinas o agentes.
// Se usan para estimar la distancia por carretera en Tarifas. Para agregar una ciudad,
// añade una línea aquí: aparecerá automáticamente en Tarifas y en los formularios.
export const CITY_COORDS: Record<string, [number, number]> = {
  "Acarigua": [9.5597, -69.2056],
  "Anaco": [9.4333, -64.4667],
  "Barinas": [8.6226, -70.2075],
  "Barquisimeto": [10.0678, -69.3467],
  "Cabimas": [10.3997, -71.4562],
  "Cagua": [10.1864, -67.4603],
  "Calabozo": [8.9242, -67.4294],
  "Caracas": [10.4806, -66.9036],
  "Carrizal": [10.36, -66.99],
  "Chichiriviche": [10.9333, -68.2667],
  "Chivacoa": [10.1625, -68.8993],
  "Ciudad Bolívar": [8.1292, -63.5497],
  "Cumaná": [10.4569, -64.1675],
  "El Tigre": [8.8885, -64.2411],
  "El Vigía": [8.619, -71.6504],
  "Guacara": [10.2256, -67.8772],
  "Higuerote": [10.4833, -66.098],
  "Los Teques": [10.3447, -67.0433],
  "Maiquetía": [10.5967, -66.98],
  "Maracaibo": [10.6544, -71.6406],
  "Maracay": [10.2469, -67.5958],
  "Mene Grande": [9.82, -70.93],
  "Mérida": [8.5897, -71.1561],
  "Maturín": [9.75, -63.1833],
  "Naguanagua": [10.249, -68.015],
  "Porlamar": [10.9577, -63.8697],
  "Puerto Cabello": [10.4731, -68.0125],
  "Puerto La Cruz": [10.2136, -64.6325],
  "Puerto Ordaz": [8.2965, -62.7236],
  "Punto Fijo": [11.691, -70.199],
  "Quíbor": [9.9275, -69.6228],
  "Sabana de Mendoza": [9.38, -70.73],
  "San Antonio de los Altos": [10.3833, -66.9667],
  "San Antonio del Táchira": [7.8146, -72.443],
  "San Cristóbal": [7.7669, -72.225],
  "San Félix": [8.3667, -62.65],
  "Santa Rita": [10.533, -71.513],
  "Santa Teresa del Tuy": [10.2333, -66.6667],
  "Tucacas": [10.7928, -68.3178],
  "Valencia": [10.162, -68.0077],
  "Valera": [9.3178, -70.6036],
  "Valle De La Pascua": [9.2153, -66.0103],
  "Villa De Cura": [10.0378, -67.4894],
};

// Ciudades ordenadas alfabéticamente (para listas desplegables).
export const TARIFF_CITIES = Object.keys(CITY_COORDS).sort((a, b) => a.localeCompare(b, "es"));
export const CITIES = [...TARIFF_CITIES, "Otra ciudad"];

// Distancias por carretera conocidas (km). Tienen prioridad sobre el cálculo automático.
export const KM: Record<string, number> = {
  "Caracas-Valencia": 160, "Caracas-Barquisimeto": 340, "Caracas-Maracaibo": 700, "Caracas-Puerto Ordaz": 640,
  "Valencia-Barquisimeto": 180, "Valencia-Maracaibo": 540, "Valencia-Puerto Ordaz": 780,
  "Barquisimeto-Maracaibo": 360, "Barquisimeto-Puerto Ordaz": 960, "Maracaibo-Puerto Ordaz": 1300,
};

/**
 * Distancia aproximada por carretera entre dos ciudades.
 * Usa la tabla KM si existe el par; si no, distancia en línea recta × 1,3 (factor típico de carretera).
 */
export function distanceKm(a: string, b: string): number | null {
  const known = KM[`${a}-${b}`] ?? KM[`${b}-${a}`];
  if (known) return known;
  const ca = CITY_COORDS[a];
  const cb = CITY_COORDS[b];
  if (!ca || !cb) return null;
  const rad = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(rad(cb[0] - ca[0]) / 2) ** 2 + Math.cos(rad(ca[0])) * Math.cos(rad(cb[0])) * Math.sin(rad(cb[1] - ca[1]) / 2) ** 2;
  const straight = 2 * 6371 * Math.asin(Math.sqrt(h));
  return Math.max(5, Math.round((straight * 1.3) / 5) * 5);
}

// Escaneo de código QR para ver el servicio (en desarrollo: dejar en false hasta que esté listo).
export const ENABLE_QR_SCAN = false;

// Mostrar la sección "Nuestros aliados" en el Menú (pendiente de confirmación de DOMESA).
export const SHOW_ALIADOS = true;

export const OFFICES = [
  // Anzoátegui (3)
  { code: "AAT 1223", state: "Anzoátegui", city: "Anaco", name: "PACK SERVICES PLUS C.A.", addr: "CALLE EL CLUB SECTOR LAS PARCELAS ADYACENCIAS AL MERCADO MUNICIPAL", hours: "Lun a Vie · 08:00–16:00", tel: "0424-8371107", popular: false, enviosInternacionales: false },
  { code: "AAT 1259", state: "Anzoátegui", city: "El Tigre", name: "SERVICIOS Y TRANSPORTE DEREK, C.A.", addr: "Av. Francisco de Miranda con calle 22 sur Edificio Tauro", hours: "Lun a Vie · 08:00–17:00 / Sáb 9:00–13:00", tel: "0414-7851505", popular: false, enviosInternacionales: false },
  { code: "OC 455", state: "Anzoátegui", city: "Puerto La Cruz", name: "OFICINA COMERCIAL PUERTO LA CRUZ", addr: "Avenida Alberto Ravell Con Calle Guamache Res. CACHAMAY", hours: "Lun a Vie · 08:00–17:00", tel: "0424-2191440", popular: true, enviosInternacionales: true },

  // Aragua (4)
  { code: "AA 0720", state: "Aragua", city: "Maracay", name: "INVERSIONES ROALGI, C.A.", addr: "Av. Bolívar, Barrio Independencia. Local N°101, PB.", hours: "Lun a Vie · 08:30–16:30", tel: "0412-7553816", popular: false, enviosInternacionales: false },
  { code: "AA 0860", state: "Aragua", city: "Villa De Cura", name: "SOLUCIONES MDM, C.A.", addr: "Conjunto Residencial La Villa. Local n°06, Edificios La Romana.", hours: "Lun a Vie · 09:00–18:00 (corrido)", tel: "0244-3880904", popular: false, enviosInternacionales: false },
  { code: "AAC 0251", state: "Aragua", city: "Cagua", name: "INVERSIONES FJA EXPRESS, C.A.", addr: "SECTOR LAS VEGAS, C.C. ESTACIÓN DE SERVICIO LAS VEGAS", hours: "Lun a Vie · 08:30–12:30 / 14:30–16:30", tel: "0244-3966106", popular: false, enviosInternacionales: false },
  { code: "AAC 0373", state: "Aragua", city: "Maracay", name: "INVERSIONES DRAGONFLY 2017, C.A.", addr: "Girardot. José Casanova Godoy. Barrio Lourdes. Local N° 32-A", hours: "Lun a Vie · 09:00–17:00", tel: "0243-2471106", popular: true, enviosInternacionales: true },

  // Barinas (1)
  { code: "AAC 1029", state: "Barinas", city: "Barinas", name: "SERVIEXPRESS SPEED, C.A.", addr: "AVENIDA 23 DE ENERO CON AVENIDA GUACAIPURO, C.C. FORUM", hours: "Lun a Vie · 08:00–17:00", tel: "0273-5523533", popular: true, enviosInternacionales: true },

  // Bolívar (3)
  { code: "AAC 0732", state: "Bolívar", city: "Ciudad Bolívar", name: "UNIENVIOS, C.A.", addr: "Negro Primero, Avenida Siegart C/C Avenida Republica", hours: "Lun a Vie · 08:00–17:00", tel: "0424-9717376", popular: false, enviosInternacionales: false },
  { code: "AAC 1281", state: "Bolívar", city: "San Félix", name: "CONEXIÓN LOGÍSTICA EXPRESS, C.A", addr: "Urb. Manoa, Av. Gumilla, Edif. La Trinidad, PB-01", hours: "Lun a Vie · 8:00–16:00 / Sáb: 8:00–12:00", tel: "0426-5904848", popular: false, enviosInternacionales: false },
  { code: "OC 450", state: "Bolívar", city: "Puerto Ordaz", name: "OFICINA COMERCIAL PUERTO ORDAZ", addr: "CALLE CAICARA, MANZANA N° 10, LOCAL N° 1, SECTOR CASTILLITO", hours: "Lun a Vie · 08:00–17:00", tel: "0286-9222778", popular: true, enviosInternacionales: true },

  // Carabobo (9)
  { code: "AA 1262", state: "Carabobo", city: "Guacara", name: "COPYNET ENVÍOS, C.A", addr: "C.C Multiplaza La Floresta, P.A. Local 27, Sector el Toco.", hours: "Lun a Vie · 08:30–12:00 / 13:00–17:00", tel: "0412-8563802", popular: false, enviosInternacionales: false },
  { code: "AA 1265", state: "Carabobo", city: "Valencia", name: "ENVÍOS VALENCIA C.A", addr: "Urb. La Isabelica, Calle Principal, Bloque 52, Apto 002 PB.", hours: "Lun a Vie · 7:30–18:00 / Sáb 8:00–15:00", tel: "0412-4307488", popular: false, enviosInternacionales: false },
  { code: "AA 1274", state: "Carabobo", city: "Valencia", name: "GRAPHICTODO RAJ, C.A.", addr: "Urb. Terraza Los Nisperos, Av. Cuatricentenario, C.C Los Nisperos", hours: "Lun a Vie · 08:00–17:00", tel: "0412-2274912", popular: false, enviosInternacionales: false },
  { code: "AAC 1011", state: "Carabobo", city: "Puerto Cabello", name: "ASTUALIADO, C.A.", addr: "C.C. PROFESIONAL PLAZA, PLANTA NIVEL GALERIA PLAZA, NIVEL PB", hours: "Lun a Vie · 08:00–17:00", tel: "0424-4026508", popular: false, enviosInternacionales: false },
  { code: "AAC 1097", state: "Carabobo", city: "Valencia", name: "EYLEEN EXPRESS, C.A.", addr: "TERMINAL VIEJO VALENCIA, AV. 92 CON CALLE 68, C.C. GOAJIROS CENTER", hours: "Lun a Vie · 08:00–17:00", tel: "0414-4706937", popular: false, enviosInternacionales: false },
  { code: "AAP 0089", state: "Carabobo", city: "Naguanagua", name: "MR EXPRESS, C.A.", addr: "AV. UNIVERSIDAD, SECTOR LA GRANJA, C.C. FREE MARKET", hours: "Lun a Vie · 09:00–18:00 / Sáb 09:00–17:00", tel: "0424-4479994", popular: false, enviosInternacionales: false },
  { code: "AAP 1198", state: "Carabobo", city: "Valencia", name: "INVERSIONES ALEXANDER 2023, C.A.", addr: "AVENIDA BOLIVAR NORTE CC TORRE VALENCIA LOCAL 24 A", hours: "Lun a Sáb · 07:30–18:30", tel: "0414-4113363", popular: false, enviosInternacionales: false },
  { code: "AAT 0940", state: "Carabobo", city: "Puerto Cabello", name: "INVERSIONES RG & GJ, C.A.", addr: "C.C. Cumboto. Oficina 103, Piso 1, Juan José Flores.", hours: "Lun a Vie · 08:00–17:00", tel: "0242-3640777", popular: false, enviosInternacionales: false },
  { code: "OC 492", state: "Carabobo", city: "Valencia", name: "OFICINA COMERCIAL VALENCIA", addr: "AV. 68, ENTRE CALLES 102 Y 103, PARQUE INDUSTRIAL CASTILLITO", hours: "Lun a Vie · 08:00–17:00", tel: "0241-8714611", popular: true, enviosInternacionales: true },

  // Distrito Capital (15)
  { code: "AAC 0412", state: "Distrito Capital", city: "Altamira", name: "INVERSIONES MB-33, C.A.", addr: "AV. DEL AVILA, EDIF. RESIDENCIAS BELMONT, LOCAL 01, URB. ALTAMIRA SUR", hours: "Lun a Vie · 08:00–17:00", tel: "0212-2656834", popular: false, enviosInternacionales: false },
  { code: "AAC 0650", state: "Distrito Capital", city: "Sabana Grande", name: "INVERSIONES MICRO SANIL, C.A.", addr: "CALLE VILLAFLOR Y LA AV CASANOVA, C.C SABANA GRANDE", hours: "Lun a Vie · 08:00–17:00", tel: "0424-2606813", popular: true, enviosInternacionales: true },
  { code: "AAC 0767", state: "Distrito Capital", city: "Avenida Baralt", name: "COMPUORDEN, C.A.", addr: "AV. BARALT, ENTRE LA ESQUINA DEL CARMEN A BUCARE, C.C DORAL BARALT", hours: "Lun a Vie · 08:00–16:30", tel: "0412-6265964", popular: false, enviosInternacionales: false },
  { code: "AAC 0798", state: "Distrito Capital", city: "San Agustín", name: "COMPUORDEN, C.A.", addr: "AVENIDA LECUNA, PARQUE CENTRAL EDIFICIO EL TEJAR", hours: "Lun a Vie · 08:00–16:30", tel: "0212-5742902", popular: false, enviosInternacionales: false },
  { code: "AAC 0884", state: "Distrito Capital", city: "Chacao", name: "SERVICIOS INTEGRALES EBISU, C.A.", addr: "CALLE LA JOYA, EDIFICIO GUAICA, LOCAL B, NIVEL PB.", hours: "Lun a Vie · 08:00–17:00", tel: "0424-2522117", popular: true, enviosInternacionales: true },
  { code: "AAC 1204", state: "Distrito Capital", city: "Los Molinos", name: "TERMINAL PRIVADO CENTRO ORIENTE SUR (COS), C.A.", addr: "URB. LOS MOLINOS, CALLE CALLEJON ANAUCO", hours: "Lun a Vie · 09:00–18:00", tel: "0424-8891494", popular: false, enviosInternacionales: false },
  { code: "AAC 1243", state: "Distrito Capital", city: "El Valle", name: "INNOVAPAP 2025 C.A", addr: "C.C El Valle, local 29. Avenida intercomunal, nivel Plaza", hours: "Lun a Vie · 08:00–17:00", tel: "0424-2439837", popular: false, enviosInternacionales: false },
  { code: "AAC 1255", state: "Distrito Capital", city: "San José", name: "SHIPMENT SERVICES C.A.", addr: "Av. Este 7, Esperanza A Crucecita, Edif. Miga, Pb, Local 2", hours: "Lun a Vie · 08:00–17:00", tel: "0212-5614742", popular: false, enviosInternacionales: false },
  { code: "AAL 0104", state: "Distrito Capital", city: "La California", name: "INVERSIONES PDCG, C.A.", addr: "CALIFORNIA NORTE, AV. FRANCISCO DE MIRANDA, EDIF. SARA", hours: "Lun a Vie · 08:00–16:30", tel: "0212-2380951", popular: true, enviosInternacionales: true },
  { code: "AAP 0987", state: "Distrito Capital", city: "El Silencio", name: "INVERSIONES TEKSHORET C.A", addr: "Urb El Silencio, Av Oeste 6 Edificio, Bloque 3 PB", hours: "Lun a Vie · 08:00–17:00", tel: "0212-4810128", popular: false, enviosInternacionales: false },
  { code: "AAP 1225", state: "Distrito Capital", city: "El Silencio", name: "FOTO RELAMPAGO C.A.", addr: "AV BARALT CON CALLE SUR DEL TEATRO MUNICIPAL EDIFICIO PLAZA MIRANDA", hours: "Lun a Vie · 08:00–17:00", tel: "0212-4846170", popular: false, enviosInternacionales: false },
  { code: "AAP 1229", state: "Distrito Capital", city: "El Recreo", name: "KUNGA CARGO, C.A.", addr: "Av. Francisco Solano Torre Banvenez PB local 10", hours: "Lun a Vie · 09:00–17:00", tel: "0212-7626587", popular: false, enviosInternacionales: false },
  { code: "AAP 1244", state: "Distrito Capital", city: "Parque Carabobo", name: "INVERSIONES BRISAR", addr: "Avenida principal La Candelaria, Edificio Grancko, P.B", hours: "Lun a Vie · 08:00–17:00", tel: "0414-9193443", popular: false, enviosInternacionales: false },
  { code: "AAP 1261", state: "Distrito Capital", city: "Chacao", name: "K&J GROUP, C.A.", addr: "Av. Guaicaipuro, Edif. Centro Metropolitano, Pb Local", hours: "Lun a Vie · 09:00–17:00 / Sáb 09:00–13:00", tel: "0212-2631292", popular: false, enviosInternacionales: false },
  { code: "OC 469", state: "Distrito Capital", city: "Quinta Crespo", name: "OFICINA COMERCIAL CARACAS", addr: "AV. SUR 4 CON CALLE 100, ESQ. PUENTE SOUBLETTE, EDIF. DOMESA", hours: "Lun a Vie · 08:00–17:00", tel: "0212-4014747", popular: true, enviosInternacionales: true },

  // Falcón (3)
  { code: "AA 1287", state: "Falcón", city: "Tucacas", name: "ESPACIO POST TUCACAS", addr: "Sector Tucacas, Av. Libertador, C.C. Las Palmas, Nro. 10", hours: "Lun a Vie · 8:30–12:00 y 14:00–17:00", tel: "0259-8125080", popular: false, enviosInternacionales: false },
  { code: "AA 1278", state: "Falcón", city: "Chichiriviche", name: "INVERSIONES LISHA 2025, C.A.", addr: "Avenida Zamora, Edificio los Fois, Sector Rómulo Gallegos", hours: "Lun a Sáb · 9:00–13:00 y 16:00–20:00", tel: "0414-0412559", popular: false, enviosInternacionales: false },
  { code: "AAT 0757", state: "Falcón", city: "Punto Fijo", name: "IL POSTE, C.A.", addr: "Santa Irene, Av. Prolongación, C.C. Ciudad del Viento, Nivel P.B", hours: "Lun a Vie · 09:00–16:00 (corrido)", tel: "0412-7804854", popular: false, enviosInternacionales: false },

  // Guárico (2)
  { code: "AAC 0162", state: "Guárico", city: "Valle De La Pascua", name: "JYM MULTISERVICIOS, C.A.", addr: "Calle Guasco entre Calles Deleite y Camaleones, Sector Centro", hours: "Lun a Vie · 09:00–12:30 / 14:30–17:30", tel: "0235-3421947", popular: false, enviosInternacionales: false },
  { code: "OC 481", state: "Guárico", city: "Calabozo", name: "OFICINA COMERCIAL CALABOZO", addr: "CARRERA 15 CON CALLE 02, CALABOZO", hours: "Lun a Vie · 08:00–17:00", tel: "0246-8716540", popular: false, enviosInternacionales: false },

  // Lara (4)
  { code: "AAC 0818", state: "Lara", city: "Quíbor", name: "INVERSIONES MI FUTURO 2015 CJMP, C.A.", addr: "Sector Centro de Quíbor, Calle 9 Con Avenida 4 Y 5, Local Pb", hours: "Lun a Vie · 08:30–16:00", tel: "0426-5530056", popular: false, enviosInternacionales: false },
  { code: "AAC 1136", state: "Lara", city: "Barquisimeto", name: "PACK & BOX, S.A.", addr: "Calle 15 entre Av. 20 y Carrera 21. Edificio Pina, Oficina 2", hours: "Lun a Vie · 08:00–17:00", tel: "0251-2521854", popular: false, enviosInternacionales: false },
  { code: "AAP 1248", state: "Lara", city: "Barquisimeto", name: "2LS LOGISTICS, C.A.", addr: "AV. LAS INDUSTRIAS, EDIF. SEDE CÁMARA DE INDUSTRIALES, P.B.", hours: "Lun a Vie · 08:00–17:00", tel: "0412-2394665", popular: false, enviosInternacionales: false },
  { code: "OC 468", state: "Lara", city: "Barquisimeto", name: "OFICINA COMERCIAL BARQUISIMETO", addr: "CALLE 29 ENTRE CARRERA 14 Y 15, CIUDAD INDUSTRIAL", hours: "Lun a Vie · 08:00–17:00", tel: "0261-8171160", popular: true, enviosInternacionales: true },

  // Mérida (4)
  { code: "AA 1289", state: "Mérida", city: "Mérida", name: "ET CONNECT, C.A.", addr: "Las Tapias, Av. Andrés Bello, C.C. Las Tapias, P.B.", hours: "Lun a Vie · 08:00–17:00 (corrido)", tel: "0422-3747629", popular: false, enviosInternacionales: false },
  { code: "AAC 0126", state: "Mérida", city: "Mérida", name: "CORPORACION LOS DUQUES 888, C.A.", addr: "Av. Las Américas, C.C Murachi, III Etapa, Oficina N°5 P.B", hours: "Lun a Vie · 08:00–12:00 / 14:00–17:00", tel: "0424-7826624", popular: false, enviosInternacionales: false },
  { code: "AAC 0613", state: "Mérida", city: "El Vigía", name: "AUDIOS SONIDO DISCOIN, C.A.", addr: "Sector El Tamarindo, Avenida 15 Con Calle 4 Edif Mantilla", hours: "Lun a Vie · 9:00–12:30 / 14:00–17:30 / Sáb 9:00–15:00", tel: "0414-7566445", popular: false, enviosInternacionales: true },
  { code: "OC 426", state: "Mérida", city: "Mérida", name: "OFICINA COMERCIAL MERIDA", addr: "Av. Los Proceres, Zona Empresarial la Nonna local 3B", hours: "Lun a Vie · 08:00–17:00", tel: "0274-2631028", popular: true, enviosInternacionales: true },

  // Miranda (9)
  { code: "AA 1263", state: "Miranda", city: "San Antonio de los Altos", name: "TRANSPORTE JJM EXPRESS 2025, C.A.", addr: "Carretera panamericana Km 16 C.C Club de Campo local 5 PB", hours: "Lun a Vie · 08:30–17:30", tel: "0424-1370697", popular: false, enviosInternacionales: false },
  { code: "AA 1282", state: "Miranda", city: "Santa Teresa del Tuy", name: "100% EXPRESS, C.A.", addr: "Calle principal, C.C Las Flores, Nivel 1, Local M7", hours: "Lun a Vie · 08:00–17:00", tel: "0239-5154426", popular: false, enviosInternacionales: false },
  { code: "AA 1268", state: "Miranda", city: "San Antonio de los Altos", name: "D.R LOGISTICS C.A", addr: "Sector Rosalito, Av. perimetral, C.C San Antonio Plaza", hours: "Lun a Vie · 9:00–17:00", tel: "0414-2709650", popular: false, enviosInternacionales: false },
  { code: "AAC 0071", state: "Miranda", city: "Los Teques", name: "COMUNICACIONES DEL PASEO MIRANDINO, C.A.", addr: "AV. LA HOYADA, C.C. PASEO MIRANDINO, LOCAL N°34", hours: "Lun a Vie · 08:30–16:30", tel: "0412-3632532", popular: false, enviosInternacionales: false },
  { code: "AAC 0124", state: "Miranda", city: "Los Teques", name: "INVERSIONES LING THAI, C.A.", addr: "CARRETERA PANAMERICANA KM 25, C.C. LA REDOMA, NIVEL 2", hours: "Lun a Vie · 08:00–17:00", tel: "0426-6117298", popular: false, enviosInternacionales: false },
  { code: "AAC 0657", state: "Miranda", city: "Los Teques", name: "COMUNICACIONES DE LA LUZ, C.A.", addr: "Calle Miquilen, Esquina Calle Carabobo, C.C. La Luz Eléctrica", hours: "Lun a Vie · 08:30–16:30", tel: "0412-3632532", popular: true, enviosInternacionales: true },
  { code: "AAC 1016", state: "Miranda", city: "San Antonio de los Altos", name: "MUNDOFERTA, C.A.", addr: "Sector Don Blas. Av. Perimetral, C.C. Los Altos. Nivel Pb", hours: "Lun a Sáb · 09:00–18:30 / Dom 09:30–16:00", tel: "0422-3168911", popular: false, enviosInternacionales: false },
  { code: "AAC 1238", state: "Miranda", city: "Carrizal", name: "INVERSIONES GPAC 2023, C.A.", addr: "Centro Médico Docente Los Altos, P.B local L23, Colinas de Carrizal", hours: "Lun a Vie · 08:00–12:00 / 13:30–17:00", tel: "0414-2721662", popular: false, enviosInternacionales: false },
  { code: "AAT 1239", state: "Miranda", city: "Higuerote", name: "ENLACES EXPRESS C.A.", addr: "Av. Andres Eloy Blanco con 4TA Trasversal Sector las peñitas", hours: "Lun a Vie · 08:00–17:00", tel: "0424-2587046", popular: false, enviosInternacionales: false },

  // Monagas (1)
  { code: "OC 446", state: "Monagas", city: "Maturín", name: "OFICINA COMERCIAL MATURÍN", addr: "av. luis del valle garcia numero 67 anexo centro clínico la pirámide", hours: "Lun a Vie · 08:00–17:00", tel: "0291-6422535", popular: true, enviosInternacionales: true },

  // Nueva Esparta (2)
  { code: "AAC 1252", state: "Nueva Esparta", city: "Porlamar", name: "KUNGA CARGO, C.A", addr: "Av. Llano Adentro, C.C. Mercado La Isla, Local 224", hours: "Lun a Vie · 09:00–16:00 / Sáb. 10:00–14:00", tel: "0416-5774156", popular: false, enviosInternacionales: false },
  { code: "AAT 1207", state: "Nueva Esparta", city: "Porlamar", name: "ENVIEXPRESS MGTA, C.A.", addr: "Sector Genovés, Av. 4 De Mayo, Local Pb.", hours: "Lun a Vie · 08:00–17:00", tel: "0412-3434845", popular: true, enviosInternacionales: true },

  // Portuguesa (1)
  { code: "AA 1285", state: "Portuguesa", city: "Acarigua", name: "LOGISTICS LGDD, C.A.", addr: "Sector Centro, Av. 26 Entre Calles 30 Y 31, Local Doña Diana", hours: "Lun a Vie · 8:00–12:30 y 13:30–17:00", tel: "0422-0232307", popular: false, enviosInternacionales: false },

  // Sucre (1)
  { code: "OC 444", state: "Sucre", city: "Cumaná", name: "OFICINA COMERCIAL CUMANÁ", addr: "CALLE ARISMENDI CON AV. TOLEDO, FRENTE AL ELEVADO", hours: "Lun a Vie · 08:00–17:00", tel: "0293-4322410", popular: true, enviosInternacionales: true },

  // Táchira (3)
  { code: "AAC 1046", state: "Táchira", city: "San Antonio del Táchira", name: "INVERCAMEN, C.A.", addr: "BARRIO OCUMARE, CALLE 6, ESQ. CON CARRERA 3, EDIF. EDIELEAL", hours: "Lun a Vie · 08:00–17:00", tel: "0412-6547051", popular: false, enviosInternacionales: false },
  { code: "AAC 1256", state: "Táchira", city: "San Cristóbal", name: "INVERSIONES GREKAYUTH, C.A.", addr: "Calle 4, local N° 10-29 sector la Concordia, Esquina de Pintuandes", hours: "Lun a Vie · 08:00–16:30", tel: "0412-8917758", popular: false, enviosInternacionales: false },
  { code: "OC 495", state: "Táchira", city: "San Cristóbal", name: "OFICINA COMERCIAL SAN CRISTÓBAL", addr: "CALLE NAVAY CON AV. TORBES, ZONA INDUSTRIAL LAS LOMAS", hours: "Lun a Vie · 08:00–17:00", tel: "0414-1012547", popular: true, enviosInternacionales: true },

  // Trujillo (3)
  { code: "AAC 0694", state: "Trujillo", city: "Valera", name: "PUERTA PUERTAXPRESS, C.A.", addr: "Valera, Av. 06 Entre Calles 04 Y 05 Edificio Continental Valera", hours: "Lun a Vie · 08:00–12:00 / 13:00–17:00", tel: "0416-6629909", popular: false, enviosInternacionales: false },
  { code: "AAC 0914", state: "Trujillo", city: "Valera", name: "DATE EXPRESO, C.A.", addr: "Los Limoncitos Las Acacias, Avenida 6, Concordia Local N°4 P.B", hours: "Lun a Vie · 08:00–16:00", tel: "0416-6711302", popular: false, enviosInternacionales: false },
  { code: "AAC 1219", state: "Trujillo", city: "Sabana de Mendoza", name: "SERVI EXPRESS E INVERSIONES EBEN EZER, C.A.", addr: "Sabana de Mendoza. Valmore Rodríguez. Carretera Panamericana", hours: "Lun a Vie · 08:00–17:00 (corrido)", tel: "0414-9797734", popular: false, enviosInternacionales: false },

  // Vargas (1)
  { code: "AAC 0768", state: "Vargas", city: "Maiquetía", name: "INVERSIONES KING SERVICES, C.A.", addr: "AVENIDA SOUBLETTE, C.C LITORAL, LOCAL N°3, NIVEL PB.", hours: "Lun a Vie · 08:00–17:00", tel: "0212-3313643", popular: false, enviosInternacionales: false },

  // Yaracuy (1)
  { code: "AA 1272", state: "Yaracuy", city: "Chivacoa", name: "GLOBAL CENTER SERVICE EXPRESS, C.A", addr: "Calle 10, entre 9 y 10. Sector Centro. PB", hours: "Lun a Vie · 8:00–17:30 / Sáb 8:00–14:30", tel: "0424-5493423", popular: false, enviosInternacionales: false },

  // Zulia (8)
  { code: "AA 1266", state: "Zulia", city: "Maracaibo", name: "Multiservicios AA 205, C.A.", addr: "Sector Tierra Negra, Edificio Belén, Local PB-04, Av. 13-A", hours: "Lun a Vie · 08:00–17:00", tel: "0422-7724242", popular: false, enviosInternacionales: false },
  { code: "AA 1276", state: "Zulia", city: "Santa Rita", name: "RAPID SEND SANTA RITA, C.A.", addr: "Av. pedro Lucas Urribarri Diagonal a la empresa pralca", hours: "Lun a Vie · 8:00–12:00 y 14:00–18:00", tel: "0424-6631703", popular: false, enviosInternacionales: false },
  { code: "AA 1284", state: "Zulia", city: "Maracaibo", name: "ENVIOS XIUMI, C.A.", addr: "Sector Los Olivos, Av. La Limpia, C.C Los Olivos Plaza", hours: "Lun a Sáb · 9:00–18:00 (corrido)", tel: "0412-7515167", popular: false, enviosInternacionales: false },
  { code: "AAC 0960", state: "Zulia", city: "Maracaibo", name: "SERVICIOS Y SUMINISTROS DIGITALES, C.A.", addr: "AVENIDA 4, BELLA VISTA ENTRE CALLES 86 A Y 87, LOCAL N°6", hours: "Lun a Vie · 08:00–17:00", tel: "0424-6454286", popular: false, enviosInternacionales: false },
  { code: "AAC 1025", state: "Zulia", city: "Maracaibo", name: "BOX MAIL INTERNACIONAL, C.A.", addr: "URB. EL PRADO, AV. 70 B LOCAL 79-57, PARROQUIA RAUL LEONI", hours: "Lun a Vie · 08:00–17:00", tel: "0414-5670981", popular: false, enviosInternacionales: false },
  { code: "AAC 1240", state: "Zulia", city: "Mene Grande", name: "IGLOBAL VENEX C.A.", addr: "Avenida Independencia, Urb. La Golfo, Al lado del Banco Mercantil", hours: "Lun a Vie · 8:00–12:00 / 13:00–17:00 / Sáb 9:00–12:30", tel: "0422-8014690", popular: false, enviosInternacionales: false },
  { code: "AAT 0645", state: "Zulia", city: "Cabimas", name: "SERVICIOS INTEGRALES Y TELECOMUNICACIONES, C.A.", addr: "Las Cabillas, Av. Principal Las Cabillas, Edificio Barroco", hours: "Lun a Vie · 07:30–16:00 (corrido)", tel: "0424-6667020", popular: false, enviosInternacionales: false },
  { code: "OC 430", state: "Zulia", city: "Maracaibo", name: "OFICINA COMERCIAL MARACAIBO", addr: "Av. 4 bella vista con calle 59, al lado de Blindados del Zulia", hours: "Lun a Vie · 08:00–17:00", tel: "0261-8171150", popular: true, enviosInternacionales: true },
];

export const STATE_OFFICE_COUNTS = [
  ["Amazonas", 0],
  ["Anzoátegui", 3],
  ["Apure", 0],
  ["Aragua", 4],
  ["Barinas", 1],
  ["Bolívar", 3],
  ["Carabobo", 9],
  ["Cojedes", 0],
  ["Delta Amacuro", 0],
  ["Dependencias Federales", 0],
  ["Distrito Capital", 15],
  ["Falcón", 3],
  ["Guárico", 2],
  ["Lara", 4],
  ["Mérida", 4],
  ["Miranda", 9],
  ["Monagas", 1],
  ["Nueva Esparta", 2],
  ["Portuguesa", 1],
  ["Sucre", 1],
  ["Táchira", 3],
  ["Trujillo", 3],
  ["Vargas", 1],
  ["Yaracuy", 1],
  ["Zulia", 8],
] as const;

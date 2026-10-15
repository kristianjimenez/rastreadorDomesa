// Contenido de texto tomado del portal público de DOMESA.
// Mantener aquí los textos facilita actualizarlos (o reemplazarlos por un CMS / API más adelante).

export type Step = { title: string; text?: string; list?: string[] };

/* ───────────── Servicios ───────────── */

export const NACIONALES = {
  hero: { title: "Envío de correspondencia y paquetes a nivel nacional", sub: "Cobertura en todo el territorio venezolano." },
  steps: [
    { title: "Embala correctamente", text: "Embala tu documento o paquete. Para paquetes, usa cajas resistentes, ciérralas con cinta de embalar y asegura que tenga un peso inferior a 50 kg." },
    { title: "Visita un Punto Comercial", text: "Ubica y visita el Punto Comercial cercano a tu ubicación o más conveniente para ti." },
    { title: "Completa la información", text: "Completa la información que solicita el personal de mostrador. Tus datos y los de la persona que recibe la encomienda son fundamentales para ofrecerles un buen servicio." },
    { title: "Notifica al destinatario", text: "Notifica a la persona que recibe tu encomienda cuál es el Punto Comercial donde podrá retirarla." },
    { title: "Acuerda el pago", text: "Evita sorpresas: es mejor acordar con el destinatario si el servicio es a cobrado o con cobro a destino." },
    { title: "Retiro en destino", text: "Cuando el destinatario es notificado de que la encomienda llegó, debe dirigirse al Punto Comercial para retirarla. Si no la retira en 5 días hábiles, será devuelta al origen." },
  ] satisfies Step[],
  why: [
    { title: "Extensa flota de vehículos a nivel nacional", text: "Recorremos todas las rutas y caminos de Venezuela con nuestros camiones, camionetas y unidades identificadas adecuadamente para llegar a ti." },
    { title: "Personal comprometido y capacitado", text: "Nuestro equipo de trabajo es el pilar fundamental de la empresa. Estamos para brindarte un servicio rápido, seguro y confiable." },
    { title: "Amplia red de Oficinas y Agentes Autorizados", text: "Contamos con oficinas en las principales ciudades de Venezuela y en los lugares más apartados del país." },
  ],
};

export const INTERNACIONALES = {
  hero: { title: "Llegamos a más de 200 países", sub: "en colaboración con DHL" },
  // Si DOMESA tiene un enlace oficial para calcular tarifas internacionales, colócalo aquí.
  tariffUrl: "",
  steps: [
    { title: "Busca una oficina", text: "Dirígete a nuestros Puntos Comerciales que pueden hacer envíos internacionales para que hagas tu envío a más de 200 países." },
    { title: "Calcula las tarifas", text: "Calcula las tarifas de tus encomiendas internacionales antes de enviar." },
    {
      title: "Requisitos para enviar",
      text: "Ahorra tiempo teniendo a la mano la siguiente información:",
      list: ["Nombre y apellido del remitente y del destinatario", "Número de teléfono del remitente y del destinatario", "Cédula del remitente y del destinatario", "Código postal de la ciudad destino"],
    },
  ] satisfies Step[],
};

export const CORPORATIVO = {
  hero: { title: "Servicios Corporativos", sub: "A través de nuestra plataforma, conecta tus oficinas y/o sucursales." },
  items: [
    { key: "ligero", title: "Servicio Contratado Ligero", text: ["Servicio de recolecta y entrega de sobres hasta 2 kg de un origen nacional a un destino nacional."] },
    { key: "normal", title: "Servicio Contratado Normal", text: ["Servicio de recolecta y entrega de sobres o paquetes hasta 5 kg de un origen nacional a un destino nacional."] },
    {
      key: "proveeduria",
      title: "Servicio de Proveeduría",
      text: [
        "Servicio de recolecta y traslado de volúmenes de paquetes y/o cajas de un origen a un destino determinado nacional.",
        "Dirigido a clientes que requieren transportar gran cantidad de envases, desde pocos orígenes a pocos destinos, con pesos mayores a 5 kg por envase.",
      ],
    },
    {
      key: "masiva",
      title: "Distribución Masiva",
      text: [
        "Servicio de recolecta y entrega de documentos que requieren devolución de acuse de recibido.",
        "Es usado para distribución de tarjetas de crédito y/o débito y documentos legales.",
      ],
    },
    { key: "resulta", title: "Servicio a Resulta", text: ["Servicio de entrega de sobres o paquetes hasta 5 kg. Recolecta en la oficina o localidad del cliente a nivel nacional y con un destino establecido."] },
  ],
};

export const COMERCIO = {
  hero: { title: "Tus ventas online necesitan de un aliado experto", sub: "Logística para tiendas en línea: recolección, entrega y cobro." },
  benefits: [
    { key: "guia", text: "Prepara la guía para el envío desde tu oficina." },
    { key: "pago", text: "Conveniencia en el pago de tu envío: cobro en destino y contado (opcional)." },
    { key: "recolecta", text: "Recolecta diaria en tu oficina o almacén." },
    { key: "atencion", text: "Atención personalizada de nuestros ejecutivos." },
  ],
  steps: [
    { title: "El cliente realiza la compra" },
    { title: "El aliado en comercio electrónico arma el pedido" },
    { title: "Domesa realiza la recolecta" },
    { title: "Entrega en Punto Comercial de destino" },
    { title: "El destinatario es notificado" },
    { title: "El cliente cancela y recibe su pedido" },
  ] satisfies Step[],
};

/* ───────────── Agentes autorizados ───────────── */

const EQUIPOS = "Mínimo 2 equipos (laptop o PC), impresora, sistema de cámaras de seguridad, línea telefónica, internet y balanza";
const EQUIPOS_VEHICULO = "Mínimo 2 equipos (laptop o PC), impresora, sistema de cámaras de seguridad, línea telefónica, internet, balanza y vehículo para transporte";
const SENALIZACION = "Tener una señalización en un lugar visible de la entrada del local";
const MOBILIARIO = "Poseer mobiliario estándar de Domesa";

export const AGENTES = {
  hero: { title: "Sé parte de nuestra red de Agentes Autorizados", sub: "Conecta tu negocio con la red de envíos de DOMESA." },
  tipos: [
    {
      key: "comercial",
      title: "Agente Autorizado Comercial",
      text: "Pequeña o mediana empresa con representación de firma jurídica, capacidad financiera adecuada, referencias comerciales y personales que lo avalen como potencial vendedor de la marca, dispuesto a vincularse de forma exclusiva al modelo de negocios de Domesa.",
      reqs: ["Tener un área mínima de 20 m²", "Ubicación: 1,2 km (radial) de otro Agente", `Equipos requeridos: ${EQUIPOS}`, SENALIZACION, MOBILIARIO],
    },
    {
      key: "territorial",
      title: "Agente Autorizado Territorial",
      text: "Pequeña o mediana empresa con vehículo propio a quien se le asigna un territorio exclusivo para recepción, envío, transporte y distribución de encomiendas y desarrollo de la zona asignada, brindando apoyo a Agentes Autorizados y Clientes Corporativos de su zona.",
      reqs: ["Tener un área mínima de 20 m² + espacio de clasificación y despacho", "Estar ubicado en áreas identificadas por Domesa", `Equipos requeridos: ${EQUIPOS_VEHICULO}`, SENALIZACION, MOBILIARIO],
    },
    {
      key: "logistico",
      title: "Agente Autorizado Logístico",
      text: "Pequeña o mediana empresa con capacidad financiera, referencias comerciales, personales y vehículo propio que lo avalen como potencial vendedor de la marca, dispuesto a vincularse de forma exclusiva a nuestro modelo de negocios, además de realizar el traslado de la paquetería (ventas y entregas) desde su sede a una oficina operativa Domesa y viceversa.",
      reqs: ["Tener un área mínima de 20 m²", "Ubicación: mayor a 200 km lineales del nodo más cercano", `Equipos requeridos: ${EQUIPOS_VEHICULO}`, SENALIZACION, MOBILIARIO],
    },
    {
      key: "punto",
      title: "Punto Domesa",
      text: "Dirigido a comercios con actividades conexas al servicio de encomiendas, que deseen incrementar sus ingresos con esta opción adicional, atendiendo ambos negocios en el mismo local.",
      reqs: ["Tener un área mínima de 2×2 metros", "Estar ubicado en áreas identificadas por Domesa", `Equipos requeridos: ${EQUIPOS}`, SENALIZACION, "Poseer un escritorio o mostrador"],
    },
  ],
  steps: [
    { title: "Verifica los requisitos", text: "El primer paso es verificar si cumples con los requisitos solicitados para ser un Agente Autorizado o tener un Punto Domesa." },
    {
      title: "Envía tus datos de contacto",
      text: "Si cumples con los requisitos, envía los datos de contacto al correo ciac.domesa@domesa.com.ve:",
      list: ["Nombre y apellido", "Número de cédula", "Número de teléfono", "Correo electrónico", "Zona donde se ubica", "Razón social"],
    },
    { title: "Completa la ficha técnica", text: "Completa la ficha técnica para validar tu factibilidad. Pide una cita para conocer las características que debe tener tu negocio para ser Agente Autorizado o tener un Punto Domesa." },
  ] satisfies Step[],
};

/* ───────────── Condiciones de nuestros servicios ───────────── */

export const PROHIBIDOS: { icon: string; text: string }[] = [
  { icon: "planta", text: "Plantas colorantes." },
  { icon: "drogas", text: "Alucinógenos, anfetaminas, cocaínas, estupefacientes, psicotrópicos, morfina, veneno, medicamentos, material médico quirúrgico y equipos médicos." },
  { icon: "animales", text: "Animales vivos o muertos." },
  { icon: "armas", text: "Armas de fuego, municiones, explosivos, cartuchos, fuegos artificiales, pólvora y fósforos." },
  { icon: "vidrio", text: "Artículos de vidrio, porcelanos, cerámico y acrílicos." },
  { icon: "dinero", text: "Dinero metálico, billetes, tickets de alimentación, cheques endosables, tarjetas de crédito, metales y/o piedras preciosas, joyas y similares." },
  { icon: "limpieza", text: "Líquidos para limpieza." },
  { icon: "inflamables", text: "Materiales explosivos: gasolina, gasoil, kerosene, insecticida y demás sustancias inflamables." },
  { icon: "quimicos", text: "Reactivos químicos y biológicos, gases, sustancias corrosivas y/o materiales radioactivos." },
];

export const RESPONSABILIDADES = {
  intro: "La empresa también desea que conozcas las responsabilidades que asumimos con tu envío y en ese sentido qué es procedente y qué no, por lo que se declara que:",
  items: [
    "DOMESA es responsable únicamente por el traslado de envíos y no del contenido de los mismos, tomando en cuenta que estos han sido preparados y embalados por EL CLIENTE.",
    "Recibiremos los reclamos o solicitudes del cliente que se realicen dentro de los treinta (30) días continuos siguientes a la consignación o a la no entrega del envío, y del destinatario dentro de las veinticuatro (24) horas siguientes de haber recibido su envío.",
    "DOMESA resguardará los envíos no retirados por un período de treinta (30) días continuos siguientes a su recepción. Transcurrido ese tiempo, realizará cargos adicionales por almacenamiento hasta por un período de tres (03) meses antes de proceder a su desincorporación.",
    "Los reclamos y solicitudes que sean realizados por el cliente sobre la prestación del servicio se recibirán a través de nuestros contactos de atención al cliente: Call Center 0501-DOMESA-0 (0501-3663720) o WhatsApp +58 (424) 1726121.",
    "Cualquier reclamo sobre el envío que haya sido recibido y firmado conforme en la guía de porte se considera no procedente.",
    "Atención Servicio Contratado: si el cliente omitiera la declaración del peso del envío, la compañía asumirá que el peso es menor o igual a los cincuenta (50) kilogramos, entendiendo que el cliente deberá responder por el pago del franqueo postal obligatorio a ese peso.",
  ],
};

/* ───────────── Términos y condiciones de uso ───────────── */

export const TERMINOS = {
  intro: ["Bienvenidos a la página web.", "Siéntase libre de navegar, disfrutar y aprender."],
  sections: [
    {
      title: "Propiedad Intelectual",
      paragraphs: [
        "Los derechos originales de autor sobre el diseño de esta página han sido cedidos a Documentos Mercantiles, C.A. “DOMESA”. El usuario de este sitio de Internet debe presumir, y así lo acepta, que todas y cada una de las secciones, nombres, textos, frases, figuras, fotos, videos y otros medios audiovisuales están protegidos por derechos de autor, a menos que se establezca lo contrario en estos mismos avisos o en la propia página web.",
        "Por tanto, queda prohibida la reproducción total o parcial de su contenido, así como su traducción, inclusión, transmisión, almacenamiento o acceso a través de medios analógicos, digitales o de cualquier otro sistema o tecnología creada, sin autorización previa y escrita dada por DOMESA.",
        "DOMESA se reserva el derecho a intentar las acciones legales que considere convenientes para hacer valer sus derechos tanto en Venezuela como en el extranjero.",
        "Si el usuario considera que su trabajo ha sido copiado ilegalmente o que sus derechos han sido violados de alguna manera, deberá comunicarse con el administrador de esta página, quien gustosamente aceptará y procesará su reclamo. DOMESA se reserva el derecho de proteger electrónicamente los derechos de autor contenidos en esta página, sin que el usuario pueda reclamar en forma alguna por tal protección.",
      ],
    },
    {
      title: "Propiedad Industrial",
      paragraphs: [
        "Este sitio web en su totalidad, su diseño y todos los contenidos los dispone DOMESA de conformidad con las leyes aplicables de la República Bolivariana de Venezuela, y con las Condiciones Generales de Uso y Términos Legales contenidos en esta página web.",
        "Las marcas comerciales, lemas, logotipos y demás signos distintivos que aparecen en esta página web pertenecen a DOMESA y los mismos han sido debidamente registrados ante autoridad competente, quedando prohibido su uso no autorizado por parte de terceros usuarios.",
        "El uso de cualquier marca comercial o contenido similar de este sitio web por parte de terceros, bien para simple referencia o afiliación directa o indirecta, debe ser previamente autorizado por escrito, y firmado por personal autorizado de DOMESA a tal efecto.",
      ],
    },
    {
      title: "De los Servicios y Responsabilidades de Uso",
      paragraphs: [
        "DOMESA podrá poner a disposición del usuario mecanismos y facilidades, ubicados en distintas secciones de su página web. Estas herramientas, así como la información y el contenido, deben considerarse siempre como referencial y no vinculante. Si el usuario desea información exacta y oficial de los servicios o productos, deberá comunicarse directamente con DOMESA. Según lo antes expresado, DOMESA no se hace responsable frente al usuario del uso que pueda darle a la información así obtenida o de cualesquiera acciones que pudiese adoptar como consecuencia de la interpretación personal de dicha información.",
        "DOMESA podrá requerir del usuario datos necesarios para el acceso a determinados contenidos o servicios dentro de las actividades propias de DOMESA, ya sea aquellas que actualmente permite la página web o, en el caso de implementarse la venta o administración de los servicios contratados a través de esta página web, adoptará las medidas de seguridad que sean necesarias a fin de salvaguardar la integridad de la información enviada por los usuarios, todo de conformidad con las leyes que le son aplicables y de acuerdo a lo establecido en la Ley para la Defensa de las Personas en el Acceso a los Bienes y Servicios.",
        "En este sentido, DOMESA se compromete a honrar y no exceder los requisitos legales de privacidad de la información que se aplica en el país.",
        "Las garantías suministradas por DOMESA para los servicios se encuentran especificadas en esta página web, siempre que le sea solicitado, o en los contratos que tiene suscritos con sus clientes/usuarios.",
      ],
    },
    {
      title: "Delitos Informáticos y Limitaciones Generales",
      paragraphs: [
        "DOMESA no se hace responsable por cualquier daño causado en equipos electrónicos de los usuarios por haber usado los programas de computación disponibles. El usuario de esta página, al ingresar, acepta que los descarga a su propio riesgo, debiendo adoptar las medidas o chequeos suficientes para garantizar la exactitud de la información descargada de esta página. DOMESA ha hecho sus mejores esfuerzos técnicos para evitar cualquier tipo de incompatibilidad con los equipos electrónicos que recomienda utilizar para descargar dichos programas.",
        "Debido a que en la actualidad los medios técnicos no permiten garantizar la absoluta falta de injerencia de la acción de terceras personas en el sitio web, DOMESA de ninguna manera asegura la exactitud y/o veracidad de todo o parte de la información contenida en su página, ni su actualización, ni que dicha información haya sido alterada o modificada en todo o en parte luego de haber sido publicada en la página, ni cualquier otro aspecto o característica de lo publicado en el sitio o en los enlaces, respectivamente, no siendo responsable DOMESA por los errores u omisiones que puedan encontrarse en su página web.",
        "DOMESA no controla ni garantiza la ausencia de virus ni de otros elementos en los contenidos que puedan producir alteraciones en su sistema informático (software y hardware) o en los documentos electrónicos y ficheros almacenados en su sistema informático.",
        "En consecuencia con lo anterior, DOMESA no será responsable de los daños ocasionados en el software o en los sistemas o equipos informáticos de los usuarios al acceder a esta página web, u otros sitios web a los que se haya accedido mediante enlaces o hiperenlaces de esta página.",
        "En caso de que el usuario infecte o envíe electrónicamente algún tipo de virus o cualquier otro programa informático que altere el funcionamiento de este sitio web, incurrirá en responsabilidad civil y, en consecuencia, deberá responder patrimonialmente por las pérdidas monetarias ocasionadas.",
        "El usuario es responsable de adoptar las medidas y chequeos suficientes para garantizar la exactitud de la información descargada de esta página.",
      ],
    },
    {
      title: "Daños y Perjuicios Materiales y Morales",
      paragraphs: [
        "DOMESA no será responsable por cualquier daño y perjuicio directo, indirecto, incidental, punitivo por el uso inconstitucional o ilegal de este sitio web. Pero podrá responsabilizar y reclamar a los usuarios que, haciendo un mal uso de esta página web, causaren daños o perjuicios a terceras personas o deterioren o puedan deteriorar tanto los contenidos como el buen funcionamiento de este sitio web.",
      ],
    },
    {
      title: "Ley Aplicable",
      paragraphs: [
        "Las condiciones de uso y políticas de esta página web se regirán e interpretarán en todas sus partes por las Leyes de la República Bolivariana de Venezuela.",
        "Para cualquier controversia que pudiera derivarse de este sitio web, el usuario se somete a la jurisdicción y competencia exclusiva de los Tribunales de la República Bolivariana de Venezuela.",
        "Mediante la visita o el uso de este sitio, usted confirma estar de acuerdo con estos términos y condiciones. Si usted no está de acuerdo con estos términos y condiciones, por favor no utilice ni visite este sitio.",
        "DOMESA se reserva el derecho, a su discreción, de cambiar, modificar, añadir o remover porciones de estos términos y condiciones en cualquier momento.",
      ],
    },
    {
      title: "Domicilio",
      paragraphs: [
        "Para todos los efectos legales derivados del uso de esta página web, se elige como domicilio a la ciudad de Caracas, Venezuela, a la jurisdicción de cuyos tribunales declaran las partes someterse.",
      ],
    },
  ],
};

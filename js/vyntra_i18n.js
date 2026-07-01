(() => {
  const STORAGE_KEY = 'vyntra-language';
  const DEFAULT_LANGUAGE = 'es';
  const LANGUAGES = {
    es: { flag: 'ES', label: 'Español', html: 'es' },
    pt: { flag: 'BR', label: 'Português', html: 'pt-BR' },
    en: { flag: 'US', label: 'English', html: 'en' }
  };

  const COPY = {
    pt: {
      'VYNTRA — Silent Power': 'VYNTRA — Poder Silencioso',
      'Ropa — VYNTRA': 'Roupas — VYNTRA',
      'Accesorios — VYNTRA': 'Acessórios — VYNTRA',
      'Kits — VYNTRA': 'Kits — VYNTRA',
      'Temporada — VYNTRA': 'Temporada — VYNTRA',
      'Contacto — VYNTRA': 'Contato — VYNTRA',
      'Ingresar - VYNTRA': 'Entrar - VYNTRA',
      'Registro - VYNTRA': 'Cadastro - VYNTRA',
      'Mis pedidos - VYNTRA': 'Meus pedidos - VYNTRA',
      'Pedido - VYNTRA': 'Pedido - VYNTRA',
      'Idioma': 'Idioma',
      'Inicio VYNTRA': 'Início VYNTRA',
      'Abrir menú': 'Abrir menu',
      'Abrir menu': 'Abrir menu',
      'Consultar por WhatsApp': 'Consultar pelo WhatsApp',
      'Ropa': 'Roupas',
      'Accesorios': 'Acessórios',
      'Kits': 'Kits',
      'Temporada': 'Temporada',
      'Contacto': 'Contato',
      'Galeria': 'Galeria',
      'Ingresar': 'Entrar',
      'Registro': 'Cadastro',
      'Salir': 'Sair',
      'Cuenta': 'Conta',
      'Mis pedidos': 'Meus pedidos',
      'Carrito': 'Carrinho',
      'Ambiente': 'Ambiente',
      'Pago seguro': 'Pagamento seguro',
      'Revisa tu seleccion, completa tus datos y finaliza el pedido con pago seguro.': 'Preencha seus dados e pague com Stripe. Depois você poderá acompanhar o status do pedido pelo site.',
      'Tu carrito esta vacio.': 'Seu carrinho está vazio.',
      'Total': 'Total',
      'Nombre': 'Nome',
      'WhatsApp': 'WhatsApp',
      'Email': 'Email',
      'Mensaje': 'Mensagem',
      'Tu nombre': 'Seu nome',
      'Talle, color, ciudad o aclaración del pedido': 'Tamanho, cor, cidade ou observação do pedido',
      'Pagar': 'Pagar',
      'Cerrar carrito': 'Fechar carrinho',
      'Cerrar detalle': 'Fechar detalhe',
      'Agregar al carrito': 'Adicionar ao carrinho',
      'Agregar': 'Adicionar',
      'Agregar kit': 'Adicionar kit',
      'Quick View': 'Ver rápido',
      'Detalle de producto': 'Detalhe do produto',
      'Color': 'Cor',
      'Talle': 'Tamanho',
      'Quitar': 'Remover',
      'Producto VYNTRA': 'Produto VYNTRA',
      'Pieza seleccionada de la colección VYNTRA.': 'Peça selecionada da coleção VYNTRA.',
      'Agregá al menos un producto antes de enviar el pedido.': 'Adicione pelo menos um produto antes de enviar o pedido.',
      'Completá nombre, WhatsApp y email para enviar el pedido.': 'Preencha nome, WhatsApp e email para enviar o pedido.',
      'Preparando pago seguro...': 'Preparando pagamento seguro...',
      'No se pudo iniciar el pago.': 'Não foi possível iniciar o pagamento.',
      'No se pudo iniciar el pago. Revisá la configuración de Stripe.': 'Não foi possível iniciar o pagamento. Revise a configuração do Stripe.',
      'Drop Otoño — Invierno 2025': 'Drop Outono — Inverno 2025',
      'Silent Power': 'Poder Silencioso',
      'Not For Everyone': 'Não é para todos',
      'Prendas de edición limitada con estética limpia, presencia fuerte y detalles hechos para sentirse propios.': 'Peças de edição limitada com estética limpa, presença forte e detalhes feitos para parecerem seus.',
      'Explorar colección': 'Explorar coleção',
      'Ver Galeria': 'Ver Galeria',
      'Destacado': 'Destaque',
      'Logo VYNTRA en el pecho. Tela premium, corte exclusivo. Edición limitada.': 'Logo VYNTRA no peito. Tecido premium, corte exclusivo. Edição limitada.',
      'La pieza central de la temporada. Estampado tonal sobre azul índigo. Signature en el dorso.': 'A peça central da temporada. Estampa tonal sobre azul índigo. Signature nas costas.',
      'Firma Vyntra estampada al frente. Corte oversized, tono gris pizarra.': 'Assinatura Vyntra estampada na frente. Corte oversized, tom cinza ardósia.',
      'Diseños activos': 'Designs ativos',
      'Nichos disponibles': 'Nichos disponíveis',
      'Personalizado': 'Personalizado',
      '01 — Sobre la marca': '01 — Sobre a marca',
      'Diseño con intención, producción limitada.': 'Design com intenção, produção limitada.',
      'VYNTRA nace para quienes buscan prendas limpias, fuertes y reconocibles sin caer en exceso visual. Cada drop se trabaja en series cortas, con gráfica precisa, siluetas amplias y detalles que sostienen identidad.': 'A VYNTRA nasce para quem busca peças limpas, fortes e reconhecíveis sem excesso visual. Cada drop é feito em séries curtas, com gráfica precisa, silhuetas amplas e detalhes que sustentam identidade.',
      'Series cortas': 'Séries curtas',
      'Fit oversized': 'Modelagem oversized',
      'Detalles signature': 'Detalhes signature',
      '02 — Galeria': '02 — Galeria',
      'Pieza Destacada — Otoño 2025': 'Peça em destaque — Outono 2025',
      'Diseñado para quienes no se conforman. Estampado tonal sobre azul índigo con firma exclusiva en el dorso. Producción limitada a 50 unidades por temporada.': 'Criada para quem não se conforma. Estampa tonal sobre azul índigo com assinatura exclusiva nas costas. Produção limitada a 50 unidades por temporada.',
      'Índigo': 'Índigo',
      'Blanco': 'Branco',
      'Gris': 'Cinza',
      'Negro': 'Preto',
      '04 — Proceso': '04 — Processo',
      'Cómo se construye': 'Como se constrói',
      'cada drop': 'cada drop',
      'Concepto': 'Conceito',
      'Definimos una dirección visual clara: tono, gráfica, fit y el tipo de presencia que debe tener la pieza.': 'Definimos uma direção visual clara: tom, gráfica, modelagem e o tipo de presença que a peça deve ter.',
      'Selección': 'Seleção',
      'Elegimos textiles, colores y accesorios que funcionen entre sí antes de liberar la cápsula.': 'Escolhemos tecidos, cores e acessórios que funcionam entre si antes de liberar a cápsula.',
      'Producción': 'Produção',
      'Trabajamos series limitadas para cuidar terminación, disponibilidad y sensación de exclusividad.': 'Trabalhamos séries limitadas para cuidar do acabamento, da disponibilidade e da sensação de exclusividade.',
      'Entrega': 'Entrega',
      'Cada pedido sale revisado, empaquetado y listo para mantener la experiencia VYNTRA hasta el final.': 'Cada pedido sai revisado, embalado e pronto para manter a experiência VYNTRA até o final.',
      '03 — Extras de Temporada': '03 — Extras de Temporada',
      'de Temporada': 'de Temporada',
      'Colecciones curadas con ropa y accesorios seleccionados. Pensados para regalar o para vivir el estilo completo cada temporada.': 'Coleções curadas com roupas e acessórios selecionados. Pensadas para presentear ou viver o estilo completo a cada temporada.',
      'Verano 2025': 'Verão 2025',
      'Otoño 2025': 'Outono 2025',
      'Invierno 2025': 'Inverno 2025',
      'Edición Especial': 'Edição Especial',
      'Camisa Oversized Blanca + Llavero + Perfume Solar': 'Camisa Oversized Branca + Chaveiro + Perfume Solar',
      'Camisa Not Your Average + Cadena + Dije Vyntra': 'Camisa Not Your Average + Corrente + Pingente Vyntra',
      'Camisa Signature Grey + Cadena + Perfume Intenso': 'Camisa Signature Grey + Corrente + Perfume Intenso',
      '5 piezas — Caja exclusiva · Envío prioritario': '5 peças — Caixa exclusiva · Envio prioritário',
      '05 — Envíos': '05 — Envios',
      'Despacho cuidado': 'Envio cuidadoso',
      'Preparamos cada pedido con revisión previa y empaque protegido. Los kits incluyen caja rígida y prioridad de preparación.': 'Preparamos cada pedido com revisão prévia e embalagem protegida. Os kits incluem caixa rígida e prioridade de preparação.',
      '06 — Cambios': '06 — Trocas',
      'Proceso simple': 'Processo simples',
      'Los cambios se gestionan dentro de los 10 días posteriores a la recepción, con la prenda sin uso y en su empaque original.': 'As trocas são feitas em até 10 dias após o recebimento, com a peça sem uso e na embalagem original.',
      '07 — Personalización': '07 — Personalização',
      'Pedido a medida': 'Pedido sob medida',
      'Podemos orientar talles, armar kits y adaptar combinaciones según el estilo que quieras construir.': 'Podemos orientar tamanhos, montar kits e adaptar combinações conforme o estilo que você quer construir.',
      '08 — Contacto': '08 — Contato',
      'Armemos tu próximo drop.': 'Vamos montar seu próximo drop.',
      'Consultas de stock, talles, envíos o pedidos personalizados. Te orientamos antes de cerrar la compra.': 'Consultas de estoque, tamanhos, envios ou pedidos personalizados. Orientamos você antes de fechar a compra.',
      'Enviar consulta': 'Enviar consulta',
      'Prendas y accesorios de autor para construir identidad con intención.': 'Roupas e acessórios autorais para construir identidade com intenção.',
      'Marca': 'Marca',
      'Proceso': 'Processo',
      'Envíos': 'Envios',
      'Tienda': 'Loja',
      '© 2025 VYNTRA — Todos los derechos reservados': '© 2025 VYNTRA — Todos os direitos reservados',
      '© 2025 VYNTRA - Todos los derechos reservados': '© 2025 VYNTRA - Todos os direitos reservados',
      'Colección activa': 'Coleção ativa',
      'Ropa VYNTRA': 'Roupas VYNTRA',
      'Remeras oversized, piezas signature y drops limitados con una estética limpia, directa y pensada para uso diario.': 'Camisetas oversized, peças signature e drops limitados com estética limpa, direta e pensada para o uso diário.',
      'Prendas disponibles': 'Peças disponíveis',
      'Filtrar prendas': 'Filtrar roupas',
      'Todo': 'Tudo',
      'Oversized': 'Oversized',
      'Signature': 'Signature',
      'Limitado': 'Limitado',
      'Fit oversized, color índigo y frase frontal tonal.': 'Modelagem oversized, cor índigo e frase frontal tonal.',
      'Logo VYNTRA al frente, caída amplia y tacto premium.': 'Logo VYNTRA na frente, caimento amplo e toque premium.',
      'Firma frontal en tono pizarra con corte de hombro bajo.': 'Assinatura frontal em tom ardósia com ombro caído.',
      'Gráfica dorsal, frente limpio y presencia minimalista.': 'Gráfica nas costas, frente limpa e presença minimalista.',
      'Firma grande en espalda, edición limitada de temporada.': 'Assinatura grande nas costas, edição limitada da temporada.',
      'Hoodie negro con detalles dorados y etiqueta inferior.': 'Hoodie preto com detalhes dourados e etiqueta inferior.',
      'Detalles de identidad': 'Detalhes de identidade',
      'Piezas chicas con presencia grande: cadenas, dijes, perfumes y objetos de temporada para cerrar el outfit.': 'Peças pequenas com grande presença: correntes, pingentes, perfumes e objetos de temporada para finalizar o look.',
      'Complementos': 'Complementos',
      'Accesorios seleccionados': 'Acessórios selecionados',
      'Filtrar accesorios': 'Filtrar acessórios',
      'Metal': 'Metal',
      'Aroma': 'Aroma',
      'Objeto': 'Objeto',
      'Dije dorado con emblema Pegasus, pensado para cadenas finas o kits signature.': 'Pingente dourado com emblema Pegasus, pensado para correntes finas ou kits signature.',
      'Pieza metálica negra con borde dorado y acabado premium para uso diario.': 'Peça metálica preta com borda dourada e acabamento premium para uso diário.',
      'Notas cálidas, limpias y ambaradas para acompañar looks claros o de día.': 'Notas quentes, limpas e ambaradas para acompanhar looks claros ou de dia.',
      'Aroma nocturno con salida especiada, fondo amaderado y carácter más profundo.': 'Aroma noturno com saída especiada, fundo amadeirado e caráter mais profundo.',
      'Cadena minimalista en tono oscuro con cierre dorado, ideal para usar sola o con dije.': 'Corrente minimalista em tom escuro com fecho dourado, ideal para usar sozinha ou com pingente.',
      'Bolso negro estructurado con emblema dorado, costuras reforzadas y presencia sobria.': 'Bolsa preta estruturada com emblema dourado, costuras reforçadas e presença sóbria.',
      'Curados de temporada': 'Curadoria da temporada',
      'Combos cerrados para vestir, regalar o iniciar una colección con piezas que ya funcionan juntas.': 'Combos fechados para vestir, presentear ou iniciar uma coleção com peças que já funcionam juntas.',
      'Más pedido': 'Mais pedido',
      'Incluye remera Not Your Average, cadena Silent, dije Pegasus y packaging rígido de temporada.': 'Inclui camiseta Not Your Average, corrente Silent, pingente Pegasus e embalagem rígida da temporada.',
      'Camisa blanca, llavero signature y perfume Solar.': 'Camisa branca, chaveiro signature e perfume Solar.',
      'Remera gris, cadena y perfume Intenso.': 'Camiseta cinza, corrente e perfume Intenso.',
      'Hoodie negro, dije dorado, tote y caja premium.': 'Hoodie preto, pingente dourado, tote e caixa premium.',
      'Otoño — Invierno 2025': 'Outono — Inverno 2025',
      'Una cápsula de prendas limpias, tonos profundos y detalles de firma para quienes prefieren presencia sin exceso.': 'Uma cápsula de peças limpas, tons profundos e detalhes de assinatura para quem prefere presença sem excesso.',
      'Not for everyone': 'Não é para todos',
      'La temporada trabaja sobre tres ideas: silueta amplia, contraste contenido y gráfica precisa. Cada pieza está pensada para combinar con accesorios mínimos y sostener una identidad clara sin depender de tendencia.': 'A temporada trabalha três ideias: silhueta ampla, contraste contido e gráfica precisa. Cada peça foi pensada para combinar com acessórios mínimos e sustentar uma identidade clara sem depender de tendência.',
      'La cápsula': 'A cápsula',
      'en uso': 'em uso',
      'Indigo': 'Índigo',
      'Tono central del drop, trabajado en piezas oversized y firma dorsal.': 'Tom central do drop, trabalhado em peças oversized e assinatura nas costas.',
      'Base limpia para outfits de contraste con accesorios dorados.': 'Base limpa para looks de contraste com acessórios dourados.',
      'Grey': 'Cinza',
      'Versión pizarra para uso diario, sobria y fácil de combinar.': 'Versão ardósia para uso diário, sóbria e fácil de combinar.',
      'Atención personalizada': 'Atendimento personalizado',
      'Consultas de talle, pedidos personalizados, envíos y cambios. Te respondemos con la misma intención con la que hacemos cada drop.': 'Consultas de tamanho, pedidos personalizados, envios e trocas. Respondemos com a mesma intenção com que fazemos cada drop.',
      'Sobre VYNTRA': 'Sobre a VYNTRA',
      'Identidad antes que tendencia': 'Identidade antes da tendência',
      'VYNTRA trabaja prendas y accesorios de autor en series cortas, con foco en siluetas limpias, detalles de firma y drops que no se repiten de forma masiva.': 'A VYNTRA trabalha roupas e acessórios autorais em séries curtas, com foco em silhuetas limpas, detalhes de assinatura e drops que não se repetem em massa.',
      'Despachos de lunes a viernes. Los kits salen con packaging reforzado y prioridad de preparación.': 'Envios de segunda a sexta. Os kits saem com embalagem reforçada e prioridade de preparação.',
      'Cambios y devoluciones': 'Trocas e devoluções',
      'Para compras personalizadas, talles o disponibilidad, escribinos y te orientamos antes de cerrar el pedido.': 'Para compras personalizadas, tamanhos ou disponibilidade, escreva para nós e orientamos você antes de fechar o pedido.',
      'Consulta': 'Consulta',
      'Pedido personalizado': 'Pedido personalizado',
      'Talles': 'Tamanhos',
      'Cambios': 'Trocas',
      'Contanos qué necesitás': 'Conte o que você precisa',
      'Acceso VYNTRA': 'Acesso VYNTRA',
      'Ingresá a tu cuenta': 'Entre na sua conta',
      'Usá tu cuenta para identificar pedidos, guardar datos de contacto y preparar el sitio para próximas funciones conectadas a la base de datos.': 'Use sua conta para identificar pedidos, salvar dados de contato e preparar o site para próximas funções conectadas ao banco de dados.',
      'Login': 'Login',
      'Bienvenido de nuevo': 'Bem-vindo de volta',
      'Contraseña': 'Senha',
      'Tu contraseña': 'Sua senha',
      '¿Todavía no tenés cuenta?': 'Ainda não tem conta?',
      'Crear cuenta': 'Criar conta',
      'Registro VYNTRA': 'Cadastro VYNTRA',
      'Creá tu cuenta': 'Crie sua conta',
      'El registro deja preparada la base para que el sitio pueda asociar pedidos, datos de contacto y futuras compras a cada usuario.': 'O cadastro prepara a base para que o site possa associar pedidos, dados de contato e futuras compras a cada usuário.',
      'Nueva cuenta': 'Nova conta',
      'Datos de acceso': 'Dados de acesso',
      'Mínimo 8 caracteres': 'Mínimo de 8 caracteres',
      'Confirmar contraseña': 'Confirmar senha',
      'Repetí la contraseña': 'Repita a senha',
      '¿Ya tenés cuenta?': 'Já tem conta?',
      'Consulta el pago y el avance de cada compra.': 'Consulte o pagamento e o andamento de cada compra.',
      'Todavia no tenes pedidos guardados.': 'Você ainda não tem pedidos salvos.',
      'Todavía no tenés pedidos guardados.': 'Você ainda não tem pedidos salvos.',
      'Pedido': 'Pedido',
      'Pago': 'Pagamento',
      'Estado': 'Status',
      'Fecha': 'Data',
      'No encontramos ese pedido': 'Não encontramos esse pedido',
      'Si acabas de pagar, espera unos segundos y actualiza. La confirmacion del pago puede tardar un momento.': 'Se acabou de pagar, aguarde alguns segundos e atualize. O Stripe pode demorar um momento para confirmar o pagamento.',
      'Seguimiento del pedido': 'Acompanhamento do pedido',
      'Pago:': 'Pagamento:',
      '· Total:': '· Total:',
      'Tu pago todavia esta pendiente. Si ya pagaste, la confirmacion puede demorar unos segundos.': 'Seu pagamento ainda está pendente. Se você já pagou, a confirmação pode demorar alguns segundos.',
      'Productos': 'Produtos',
      'Producto': 'Produto',
      'Variante': 'Variação',
      'Cantidad': 'Quantidade',
      'Subtotal': 'Subtotal',
      'Dashboard': 'Dashboard',
      'Carga masiva': 'Carga em massa',
      'Compras': 'Compras',
      'Personas': 'Pessoas',
      'Ver sitio': 'Ver site',
      'Panel administrador': 'Painel administrativo'
    },
    en: {
      'VYNTRA — Silent Power': 'VYNTRA — Silent Power',
      'Ropa — VYNTRA': 'Clothing — VYNTRA',
      'Accesorios — VYNTRA': 'Accessories — VYNTRA',
      'Kits — VYNTRA': 'Kits — VYNTRA',
      'Temporada — VYNTRA': 'Season — VYNTRA',
      'Contacto — VYNTRA': 'Contact — VYNTRA',
      'Ingresar - VYNTRA': 'Sign In - VYNTRA',
      'Registro - VYNTRA': 'Register - VYNTRA',
      'Mis pedidos - VYNTRA': 'My Orders - VYNTRA',
      'Pedido - VYNTRA': 'Order - VYNTRA',
      'Idioma': 'Language',
      'Inicio VYNTRA': 'VYNTRA Home',
      'Abrir menú': 'Open menu',
      'Abrir menu': 'Open menu',
      'Consultar por WhatsApp': 'Ask on WhatsApp',
      'Ropa': 'Clothing',
      'Accesorios': 'Accessories',
      'Kits': 'Kits',
      'Temporada': 'Season',
      'Contacto': 'Contact',
      'Galeria': 'Galeria',
      'Ingresar': 'Sign in',
      'Registro': 'Register',
      'Salir': 'Sign out',
      'Cuenta': 'Account',
      'Mis pedidos': 'My orders',
      'Carrito': 'Cart',
      'Ambiente': 'Ambience',
      'Pago seguro': 'Secure payment',
      'Revisa tu seleccion, completa tus datos y finaliza el pedido con pago seguro.': 'Enter your details and Pay. Then you can track the order status from the website.',
      'Tu carrito esta vacio.': 'Your cart is empty.',
      'Total': 'Total',
      'Nombre': 'Name',
      'WhatsApp': 'WhatsApp',
      'Email': 'Email',
      'Mensaje': 'Message',
      'Tu nombre': 'Your name',
      'Talle, color, ciudad o aclaración del pedido': 'Size, color, city or order note',
      'Pagar': 'Pay',
      'Cerrar carrito': 'Close cart',
      'Cerrar detalle': 'Close details',
      'Agregar al carrito': 'Add to cart',
      'Agregar': 'Add',
      'Agregar kit': 'Add kit',
      'Quick View': 'Quick view',
      'Detalle de producto': 'Product detail',
      'Color': 'Color',
      'Talle': 'Size',
      'Quitar': 'Remove',
      'Producto VYNTRA': 'VYNTRA product',
      'Pieza seleccionada de la colección VYNTRA.': 'Selected piece from the VYNTRA collection.',
      'Agregá al menos un producto antes de enviar el pedido.': 'Add at least one product before submitting the order.',
      'Completá nombre, WhatsApp y email para enviar el pedido.': 'Complete name, WhatsApp and email to submit the order.',
      'Preparando pago seguro...': 'Preparing secure payment...',
      'No se pudo iniciar el pago.': 'Payment could not be started.',
      'No se pudo iniciar el pago. Revisá la configuración de Stripe.': 'Payment could not be started. Check the payment configuration.',
      'Drop Otoño — Invierno 2025': 'Fall — Winter 2025 Drop',
      'Silent Power': 'Silent Power',
      'Not For Everyone': 'Not For Everyone',
      'Prendas de edición limitada con estética limpia, presencia fuerte y detalles hechos para sentirse propios.': 'Limited-edition pieces with a clean aesthetic, strong presence and details made to feel personal.',
      'Explorar colección': 'Explore collection',
      'Ver Galeria': 'View Galeria',
      'Destacado': 'Featured',
      'Logo VYNTRA en el pecho. Tela premium, corte exclusivo. Edición limitada.': 'VYNTRA logo on the chest. Premium fabric, exclusive cut. Limited edition.',
      'La pieza central de la temporada. Estampado tonal sobre azul índigo. Signature en el dorso.': 'The centerpiece of the season. Tonal print on indigo blue. Signature on the back.',
      'Firma Vyntra estampada al frente. Corte oversized, tono gris pizarra.': 'Vyntra signature printed on the front. Oversized cut, slate grey tone.',
      'Diseños activos': 'Active designs',
      'Nichos disponibles': 'Available niches',
      'Personalizado': 'Customized',
      '01 — Sobre la marca': '01 — About the brand',
      'Diseño con intención, producción limitada.': 'Intentional design, limited production.',
      'VYNTRA nace para quienes buscan prendas limpias, fuertes y reconocibles sin caer en exceso visual. Cada drop se trabaja en series cortas, con gráfica precisa, siluetas amplias y detalles que sostienen identidad.': 'VYNTRA is made for those who want clean, strong and recognizable pieces without visual excess. Each drop is produced in short runs, with precise graphics, relaxed silhouettes and identity-driven details.',
      'Series cortas': 'Short runs',
      'Fit oversized': 'Oversized fit',
      'Detalles signature': 'Signature details',
      '02 — Galeria': '02 — Galeria',
      'Pieza Destacada — Otoño 2025': 'Featured Piece — Fall 2025',
      'Diseñado para quienes no se conforman. Estampado tonal sobre azul índigo con firma exclusiva en el dorso. Producción limitada a 50 unidades por temporada.': 'Designed for those who do not settle. Tonal print on indigo blue with an exclusive signature on the back. Limited to 50 units per season.',
      'Índigo': 'Indigo',
      'Blanco': 'White',
      'Gris': 'Grey',
      'Negro': 'Black',
      '04 — Proceso': '04 — Process',
      'Cómo se construye': 'How we build',
      'cada drop': 'each drop',
      'Concepto': 'Concept',
      'Definimos una dirección visual clara: tono, gráfica, fit y el tipo de presencia que debe tener la pieza.': 'We define a clear visual direction: tone, graphics, fit and the type of presence the piece should have.',
      'Selección': 'Selection',
      'Elegimos textiles, colores y accesorios que funcionen entre sí antes de liberar la cápsula.': 'We choose textiles, colors and accessories that work together before releasing the capsule.',
      'Producción': 'Production',
      'Trabajamos series limitadas para cuidar terminación, disponibilidad y sensación de exclusividad.': 'We work in limited runs to protect finish, availability and the sense of exclusivity.',
      'Entrega': 'Delivery',
      'Cada pedido sale revisado, empaquetado y listo para mantener la experiencia VYNTRA hasta el final.': 'Every order ships checked, packed and ready to carry the VYNTRA experience through to the end.',
      '03 — Extras de Temporada': '03 — Seasonal Extras',
      'de Temporada': 'Seasonal',
      'Colecciones curadas con ropa y accesorios seleccionados. Pensados para regalar o para vivir el estilo completo cada temporada.': 'Curated collections with selected clothing and accessories, made for gifting or experiencing the full style each season.',
      'Verano 2025': 'Summer 2025',
      'Otoño 2025': 'Fall 2025',
      'Invierno 2025': 'Winter 2025',
      'Edición Especial': 'Special Edition',
      'Camisa Oversized Blanca + Llavero + Perfume Solar': 'White Oversized Shirt + Keychain + Solar Perfume',
      'Camisa Not Your Average + Cadena + Dije Vyntra': 'Not Your Average Shirt + Chain + Vyntra Charm',
      'Camisa Signature Grey + Cadena + Perfume Intenso': 'Signature Grey Shirt + Chain + Intenso Perfume',
      '5 piezas — Caja exclusiva · Envío prioritario': '5 pieces — Exclusive box · Priority shipping',
      '05 — Envíos': '05 — Shipping',
      'Despacho cuidado': 'Careful dispatch',
      'Preparamos cada pedido con revisión previa y empaque protegido. Los kits incluyen caja rígida y prioridad de preparación.': 'We prepare each order with a prior check and protected packaging. Kits include a rigid box and priority preparation.',
      '06 — Cambios': '06 — Exchanges',
      'Proceso simple': 'Simple process',
      'Los cambios se gestionan dentro de los 10 días posteriores a la recepción, con la prenda sin uso y en su empaque original.': 'Exchanges are managed within 10 days after delivery, with the item unused and in its original packaging.',
      '07 — Personalización': '07 — Personalization',
      'Pedido a medida': 'Custom order',
      'Podemos orientar talles, armar kits y adaptar combinaciones según el estilo que quieras construir.': 'We can guide sizing, build kits and adapt combinations to the style you want to create.',
      '08 — Contacto': '08 — Contact',
      'Armemos tu próximo drop.': 'Let us build your next drop.',
      'Consultas de stock, talles, envíos o pedidos personalizados. Te orientamos antes de cerrar la compra.': 'Questions about stock, sizing, shipping or custom orders. We guide you before checkout.',
      'Enviar consulta': 'Send inquiry',
      'Prendas y accesorios de autor para construir identidad con intención.': 'Designer clothing and accessories to build identity with intention.',
      'Marca': 'Brand',
      'Proceso': 'Process',
      'Envíos': 'Shipping',
      'Tienda': 'Shop',
      '© 2025 VYNTRA — Todos los derechos reservados': '© 2025 VYNTRA — All rights reserved',
      '© 2025 VYNTRA - Todos los derechos reservados': '© 2025 VYNTRA - All rights reserved',
      'Colección activa': 'Active collection',
      'Ropa VYNTRA': 'VYNTRA Clothing',
      'Remeras oversized, piezas signature y drops limitados con una estética limpia, directa y pensada para uso diario.': 'Oversized tees, signature pieces and limited drops with a clean, direct aesthetic designed for daily wear.',
      'Prendas disponibles': 'Available pieces',
      'Filtrar prendas': 'Filter clothing',
      'Todo': 'All',
      'Oversized': 'Oversized',
      'Signature': 'Signature',
      'Limitado': 'Limited',
      'Fit oversized, color índigo y frase frontal tonal.': 'Oversized fit, indigo color and tonal front phrase.',
      'Logo VYNTRA al frente, caída amplia y tacto premium.': 'VYNTRA logo on the front, relaxed drape and premium feel.',
      'Firma frontal en tono pizarra con corte de hombro bajo.': 'Front signature in slate tone with dropped shoulders.',
      'Gráfica dorsal, frente limpio y presencia minimalista.': 'Back graphic, clean front and minimalist presence.',
      'Firma grande en espalda, edición limitada de temporada.': 'Large back signature, limited seasonal edition.',
      'Hoodie negro con detalles dorados y etiqueta inferior.': 'Black hoodie with gold details and lower label.',
      'Detalles de identidad': 'Identity details',
      'Piezas chicas con presencia grande: cadenas, dijes, perfumes y objetos de temporada para cerrar el outfit.': 'Small pieces with a strong presence: chains, charms, perfumes and seasonal objects to finish the outfit.',
      'Complementos': 'Complements',
      'Accesorios seleccionados': 'Selected accessories',
      'Filtrar accesorios': 'Filter accessories',
      'Metal': 'Metal',
      'Aroma': 'Scent',
      'Objeto': 'Object',
      'Dije dorado con emblema Pegasus, pensado para cadenas finas o kits signature.': 'Gold charm with Pegasus emblem, made for fine chains or signature kits.',
      'Pieza metálica negra con borde dorado y acabado premium para uso diario.': 'Black metal piece with a gold edge and premium finish for daily use.',
      'Notas cálidas, limpias y ambaradas para acompañar looks claros o de día.': 'Warm, clean amber notes to pair with light or daytime looks.',
      'Aroma nocturno con salida especiada, fondo amaderado y carácter más profundo.': 'Night scent with a spicy opening, woody base and deeper character.',
      'Cadena minimalista en tono oscuro con cierre dorado, ideal para usar sola o con dije.': 'Minimal dark-tone chain with gold clasp, ideal alone or with a charm.',
      'Bolso negro estructurado con emblema dorado, costuras reforzadas y presencia sobria.': 'Structured black tote with gold emblem, reinforced stitching and a restrained presence.',
      'Curados de temporada': 'Seasonal curation',
      'Combos cerrados para vestir, regalar o iniciar una colección con piezas que ya funcionan juntas.': 'Complete combos for wearing, gifting or starting a collection with pieces that already work together.',
      'Más pedido': 'Most requested',
      'Incluye remera Not Your Average, cadena Silent, dije Pegasus y packaging rígido de temporada.': 'Includes Not Your Average tee, Silent chain, Pegasus charm and rigid seasonal packaging.',
      'Camisa blanca, llavero signature y perfume Solar.': 'White shirt, signature keychain and Solar perfume.',
      'Remera gris, cadena y perfume Intenso.': 'Grey tee, chain and Intenso perfume.',
      'Hoodie negro, dije dorado, tote y caja premium.': 'Black hoodie, gold charm, tote and premium box.',
      'Otoño — Invierno 2025': 'Fall — Winter 2025',
      'Una cápsula de prendas limpias, tonos profundos y detalles de firma para quienes prefieren presencia sin exceso.': 'A capsule of clean pieces, deep tones and signature details for those who prefer presence without excess.',
      'Not for everyone': 'Not for everyone',
      'La temporada trabaja sobre tres ideas: silueta amplia, contraste contenido y gráfica precisa. Cada pieza está pensada para combinar con accesorios mínimos y sostener una identidad clara sin depender de tendencia.': 'The season works around three ideas: relaxed silhouettes, contained contrast and precise graphics. Each piece is designed to pair with minimal accessories and hold a clear identity without relying on trends.',
      'La cápsula': 'The capsule',
      'en uso': 'in use',
      'Indigo': 'Indigo',
      'Tono central del drop, trabajado en piezas oversized y firma dorsal.': 'The drop’s central tone, used across oversized pieces and back signatures.',
      'Base limpia para outfits de contraste con accesorios dorados.': 'Clean base for contrast outfits with gold accessories.',
      'Grey': 'Grey',
      'Versión pizarra para uso diario, sobria y fácil de combinar.': 'Slate version for daily wear, restrained and easy to combine.',
      'Atención personalizada': 'Personalized service',
      'Consultas de talle, pedidos personalizados, envíos y cambios. Te respondemos con la misma intención con la que hacemos cada drop.': 'Sizing questions, custom orders, shipping and exchanges. We respond with the same intention behind every drop.',
      'Sobre VYNTRA': 'About VYNTRA',
      'Identidad antes que tendencia': 'Identity before trend',
      'VYNTRA trabaja prendas y accesorios de autor en series cortas, con foco en siluetas limpias, detalles de firma y drops que no se repiten de forma masiva.': 'VYNTRA works with designer clothing and accessories in short runs, focused on clean silhouettes, signature details and drops that are not repeated at scale.',
      'Despachos de lunes a viernes. Los kits salen con packaging reforzado y prioridad de preparación.': 'Dispatches run Monday through Friday. Kits ship with reinforced packaging and priority preparation.',
      'Cambios y devoluciones': 'Exchanges and returns',
      'Para compras personalizadas, talles o disponibilidad, escribinos y te orientamos antes de cerrar el pedido.': 'For custom purchases, sizes or availability, write to us and we will guide you before completing the order.',
      'Consulta': 'Topic',
      'Pedido personalizado': 'Custom order',
      'Talles': 'Sizes',
      'Cambios': 'Exchanges',
      'Contanos qué necesitás': 'Tell us what you need',
      'Acceso VYNTRA': 'VYNTRA Access',
      'Ingresá a tu cuenta': 'Sign in to your account',
      'Usá tu cuenta para identificar pedidos, guardar datos de contacto y preparar el sitio para próximas funciones conectadas a la base de datos.': 'Use your account to identify orders, save contact details and prepare the site for upcoming database-connected features.',
      'Login': 'Login',
      'Bienvenido de nuevo': 'Welcome back',
      'Contraseña': 'Password',
      'Tu contraseña': 'Your password',
      '¿Todavía no tenés cuenta?': 'Do not have an account yet?',
      'Crear cuenta': 'Create account',
      'Registro VYNTRA': 'VYNTRA Registration',
      'Creá tu cuenta': 'Create your account',
      'El registro deja preparada la base para que el sitio pueda asociar pedidos, datos de contacto y futuras compras a cada usuario.': 'Registration prepares the site to associate orders, contact details and future purchases with each user.',
      'Nueva cuenta': 'New account',
      'Datos de acceso': 'Access details',
      'Mínimo 8 caracteres': 'Minimum 8 characters',
      'Confirmar contraseña': 'Confirm password',
      'Repetí la contraseña': 'Repeat the password',
      '¿Ya tenés cuenta?': 'Already have an account?',
      'Consulta el pago y el avance de cada compra.': 'Check the payment and progress of each purchase.',
      'Todavia no tenes pedidos guardados.': 'You do not have saved orders yet.',
      'Todavía no tenés pedidos guardados.': 'You do not have saved orders yet.',
      'Pedido': 'Order',
      'Pago': 'Payment',
      'Estado': 'Status',
      'Fecha': 'Date',
      'No encontramos ese pedido': 'We could not find that order',
      'Si acabas de pagar, espera unos segundos y actualiza. La confirmacion del pago puede tardar un momento.': 'If you just paid, wait a few seconds and refresh. Payment confirmation can take a moment.',
      'Seguimiento del pedido': 'Order tracking',
      'Pago:': 'Payment:',
      '· Total:': '· Total:',
      'Tu pago todavia esta pendiente. Si ya pagaste, la confirmacion puede demorar unos segundos.': 'Your payment is still pending. If you already paid, confirmation can take a few seconds.',
      'Productos': 'Products',
      'Producto': 'Product',
      'Variante': 'Variant',
      'Cantidad': 'Quantity',
      'Subtotal': 'Subtotal',
      'Dashboard': 'Dashboard',
      'Carga masiva': 'Bulk upload',
      'Compras': 'Purchases',
      'Personas': 'People',
      'Ver sitio': 'View site',
      'Panel administrador': 'Admin panel'
    }
  };

  const dynamicLabels = {
    pt: {
      clothes: 'Roupas',
      accessory: 'Acessório',
      order: 'Pedido',
      color: 'Cor',
      size: 'Tamanho',
      remove: 'Remover',
      addStatus: 'foi adicionado ao pedido.',
      decrease: 'Diminuir',
      increase: 'Aumentar',
      hello: 'Olá'
    },
    en: {
      clothes: 'Clothing',
      accessory: 'Accessory',
      order: 'Order',
      color: 'Color',
      size: 'Size',
      remove: 'Remove',
      addStatus: 'was added to the order.',
      decrease: 'Decrease',
      increase: 'Increase',
      hello: 'Hi'
    }
  };

  const textOriginals = new WeakMap();
  const attrOriginals = new WeakMap();
  let currentLanguage = normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  let applying = false;
  let queued = 0;

  function normalizeLanguage(language) {
    return Object.prototype.hasOwnProperty.call(LANGUAGES, language) ? language : DEFAULT_LANGUAGE;
  }

  function dictionary(language) {
    return COPY[language] || {};
  }

  function translateDynamic(value, language) {
    if (language === DEFAULT_LANGUAGE) return value;
    const labels = dynamicLabels[language];

    let match = value.match(/^Ropa\s+[—-]\s+(.+)$/);
    if (match) return `${labels.clothes} — ${match[1]}`;

    match = value.match(/^Accesorio\s+[—-]\s+(.+)$/);
    if (match) return `${labels.accessory} — ${match[1]}`;

    match = value.match(/^Pedido\s+#(.+)$/);
    if (match) return `${labels.order} #${match[1]}`;

    match = value.match(/^Color:\s*(.+)$/);
    if (match) return `${labels.color}: ${match[1]}`;

    match = value.match(/^Talle:\s*(.+)$/);
    if (match) return `${labels.size}: ${match[1]}`;

    match = value.match(/^(.+)\s+se agreg[oó]\s+al pedido\.$/i);
    if (match) return `${match[1]} ${labels.addStatus}`;

    match = value.match(/^Restar\s+(.+)$/);
    if (match) return `${labels.decrease} ${match[1]}`;

    match = value.match(/^Sumar\s+(.+)$/);
    if (match) return `${labels.increase} ${match[1]}`;

    match = value.match(/^Hola,\s+(.+)$/);
    if (match) return `${labels.hello}, ${match[1]}`;

    return value;
  }

  function translateValue(value, language) {
    const trimmed = String(value || '').trim();
    if (!trimmed) return value;
    if (language === DEFAULT_LANGUAGE) return value;

    const translated = dictionary(language)[trimmed] || translateDynamic(trimmed, language);
    return translated === trimmed ? value : String(value).replace(trimmed, translated);
  }

  function shouldSkipTextNode(node) {
    const element = node.parentElement;
    if (!element) return true;
    if (element.closest('script, style, noscript, .language-switcher')) return true;
    if (element.closest('.catalog-card, .prod, .kit, .feature-panel') && element.matches('h2, h3, .prod-name, .kit-name, .lb-label-text')) return true;
    return !node.nodeValue.trim();
  }

  function translateTextNode(node, language) {
    if (shouldSkipTextNode(node)) return;
    if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
    node.nodeValue = translateValue(textOriginals.get(node), language);
  }

  function translateAttributes(element, language) {
    if (!element || element.closest?.('.language-switcher')) return;

    const attrs = ['placeholder', 'aria-label', 'title'];
    attrs.forEach((attr) => {
      if (!element.hasAttribute(attr)) return;
      let originals = attrOriginals.get(element);
      if (!originals) {
        originals = {};
        attrOriginals.set(element, originals);
      }
      if (!Object.prototype.hasOwnProperty.call(originals, attr)) originals[attr] = element.getAttribute(attr);
      element.setAttribute(attr, translateValue(originals[attr], language));
    });
  }

  function translateTree(root, language) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root, language);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root, language);

    const elementRoot = root.nodeType === Node.ELEMENT_NODE ? root : document.body;
    elementRoot?.querySelectorAll?.('[placeholder], [aria-label], [title]').forEach((element) => translateAttributes(element, language));

    const walker = document.createTreeWalker(elementRoot, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      translateTextNode(node, language);
      node = walker.nextNode();
    }
  }

  function updateSwitchers(language) {
    document.querySelectorAll('.lang-button').forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function applyLanguage(language) {
    currentLanguage = normalizeLanguage(language);
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    document.documentElement.lang = LANGUAGES[currentLanguage].html;

    applying = true;
    const originalTitle = document.documentElement.dataset.i18nTitle || document.title;
    document.documentElement.dataset.i18nTitle = originalTitle;
    document.title = translateValue(originalTitle, currentLanguage);
    translateTree(document.body, currentLanguage);
    updateSwitchers(currentLanguage);
    applying = false;
  }

  function createSwitcher(context) {
    const switcher = document.createElement('div');
    switcher.className = `language-switcher language-switcher-${context}`;
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', dictionary(currentLanguage).Idioma || 'Idioma');
    const flagMeta = {
      es: { className: 'flag-es', short: 'ES' },
      pt: { className: 'flag-br', short: 'BR' },
      en: { className: 'flag-us', short: 'US' }
    };

    Object.entries(LANGUAGES).forEach(([code, config]) => {
      const flag = flagMeta[code] || { className: 'flag-generic', short: code.toUpperCase() };
      const button = document.createElement('button');
      button.className = 'lang-button';
      button.type = 'button';
      button.dataset.lang = code;
      button.title = config.label;
      button.setAttribute('aria-label', config.label);
      button.setAttribute('aria-pressed', 'false');
      button.innerHTML = `<span class="lang-flag ${flag.className}" aria-hidden="true"><span>${flag.short}</span></span><span class="lang-text">${config.label}</span>`;
      button.addEventListener('click', () => applyLanguage(code));
      switcher.appendChild(button);
    });

    return switcher;
  }

  function injectStyles() {
    if (document.getElementById('vyntra-i18n-style')) return;
    const style = document.createElement('style');
    style.id = 'vyntra-i18n-style';
    style.textContent = `
      .language-switcher {
        display: inline-flex;
        align-items: center;
        gap: .35rem;
      }

      .lang-button {
        width: 32px;
        height: 32px;
        display: inline-grid;
        place-items: center;
        border: 1px solid var(--g3, rgba(191, 160, 106, .14));
        background: transparent;
        color: var(--w2, #C8C4BA);
        cursor: pointer;
        font: inherit;
        line-height: 1;
        transition: border-color .24s ease, background .24s ease, transform .24s ease;
      }

      .lang-button:hover,
      .lang-button.is-active {
        border-color: var(--g, #BFA06A);
        background: var(--g4, rgba(191, 160, 106, .06));
        transform: translateY(-1px);
      }

      .lang-flag {
        width: 21px;
        height: 15px;
        position: relative;
        display: block;
        overflow: hidden;
        border: 1px solid rgba(240, 237, 230, .55);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, .22);
      }

      .lang-flag span {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: transparent;
        font-size: 0;
      }

      .flag-es {
        background: linear-gradient(#c60b1e 0 25%, #ffc400 25% 75%, #c60b1e 75%);
      }

      .flag-br {
        background: #009b3a;
      }

      .flag-br::before {
        content: '';
        position: absolute;
        inset: 3px 4px;
        background: #ffdf00;
        transform: rotate(45deg);
      }

      .flag-br::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: #002776;
        transform: translate(-50%, -50%);
      }

      .flag-us {
        background: repeating-linear-gradient(to bottom, #b22234 0 1.15px, #fff 1.15px 2.3px);
      }

      .flag-us::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 9px;
        height: 8px;
        background: #3c3b6e;
      }

      .flag-generic {
        background: var(--g, #BFA06A);
      }

      .lang-text {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .mob .language-switcher {
        order: -1;
        padding: 0 0 .8rem;
        border-bottom: 1px solid var(--b4, #1E1E1E);
      }

      .mob .lang-button {
        width: 40px;
        height: 36px;
      }

      .admin-sidebar .language-switcher {
        width: 100%;
        justify-content: space-between;
        margin: -1rem 0 1.2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--g3, rgba(191, 160, 106, .14));
      }

      @media(max-width: 600px) {
        .nav-end > .language-switcher {
          gap: .22rem;
        }

        .nav-end > .language-switcher .lang-button {
          width: 28px;
          height: 30px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function injectSwitchers() {
    const navEnd = document.querySelector('.nav-end');
    const cartButton = navEnd?.querySelector('.nav-cta');
    if (navEnd && !navEnd.querySelector('.language-switcher')) {
      navEnd.insertBefore(createSwitcher('desktop'), cartButton || navEnd.querySelector('.nav-ham') || null);
    }

    const mobileMenu = document.querySelector('.mob');
    if (mobileMenu && !mobileMenu.querySelector('.language-switcher')) {
      mobileMenu.insertBefore(createSwitcher('mobile'), mobileMenu.firstChild);
    }

    const adminSidebar = document.querySelector('.admin-sidebar');
    if (adminSidebar && !adminSidebar.querySelector('.language-switcher')) {
      const nav = adminSidebar.querySelector('nav');
      adminSidebar.insertBefore(createSwitcher('admin'), nav || adminSidebar.firstChild);
    }
  }

  function observeChanges() {
    const observer = new MutationObserver((mutations) => {
      if (applying) return;
      window.clearTimeout(queued);
      queued = window.setTimeout(() => {
        applying = true;
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => translateTree(node, currentLanguage));
          if (mutation.type === 'attributes') translateAttributes(mutation.target, currentLanguage);
        });
        updateSwitchers(currentLanguage);
        applying = false;
      }, 30);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['placeholder', 'aria-label', 'title']
    });
  }

  injectStyles();
  injectSwitchers();
  applyLanguage(currentLanguage);
  observeChanges();
})();

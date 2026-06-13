Estrutura de imagens — Produção visual
======================================

Cada projeto tem sua pasta:

  public/works/{slug}/
    cover.svg   → substitua por cover.webp (ou .jpg)
    01.svg      → substitua por 01.webp
    02.svg      → ...
    ...

Pasta de produção real (carrossel):
  public/works/producao-visual/
    cover.*   → capa do projeto no carrossel
    01.*      → imagens da galeria (02.*, 03.*, …)
  Depois de adicionar arquivos: npm run sync:producao

Projetos atuais:
  - boutique-estilo-urbano/     (capa + 01–06)
  - restaurante-sabor-praia/    (capa + 01–04)
  - clinica-odonto-vida/        (capa + 01–03)
  - catalogo-padaria-bairro/    (capa + 01–05)
  - landing-servicos-locais/    (capa + 01–03)
  - stories-promo-verao/        (capa + 01–04)

Depois de adicionar as imagens reais:
  1. Coloque os arquivos na pasta do projeto
  2. Atualize src/data/works.json trocando .svg por .webp (ou .jpg)
  3. Remova os .svg placeholder se quiser

Formato recomendado: WebP
  - Capa: 1600×1000 px (16:10)
  - Posts: 1080×1350 px (4:5)
  - Catálogo: 1080×1485 px (A4 proporcional)
  - Landing: 1400×900 px

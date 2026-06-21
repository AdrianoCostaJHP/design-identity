# Guia de Estilo e Design System

Este documento contém as diretrizes visuais extraídas para aplicação no desenvolvimento do site, com foco em uma estética minimalista, moderna e sofisticada.

## 🎨 Paleta de Cores

| Cor | Hexadecimal | Uso Recomendado |
| :--- | :--- | :--- |
| **Bege Escuro** | `#B8B3AC` | Fundos secundários, bordas suaves. |
| **Bege Claro / Areia** | `#D5CEC4` | Fundo principal (modo claro), cards. |
| **Cinza Ardósia** | `#767E7D` | Textos secundários, elementos de apoio. |
| **Chumbo / Asfalto** | `#202C2D` | Textos principais, fundos escuros (modo dark). |
| **Preto** | `#000000` | Títulos de alto contraste, detalhes mínimos. |
| **Dourado** | `#E6C97A` | Destaques, botões, ícones, links (Call to Action). |

### Variáveis CSS (Exemplo de Implementação)
```css
:root {
  --color-primary-dark: #202C2D;
  --color-primary-light: #D5CEC4;
  --color-accent-gold: #E6C97A;
  --color-text-main: #000000;
  --color-text-muted: #767E7D;
  --color-bg-alt: #B8B3AC;
}
```

## ✍️ Tipografia

A combinação tipográfica equilibra elegância e legibilidade.

* **Títulos (Headings - H1, H2, H3)**
    * **Fonte:** Playfair Display
    * **Peso Recomendado:** Regular (400)
    * **Uso:** Cabeçalhos, seções de destaque e chamadas principais.

* **Textos (Body - P, Span, Li)**
    * **Fonte:** Montserrat
    * **Peso Recomendado:** Regular (400)
    * **Uso:** Parágrafos, descrições, menus e textos de interface.

## 💠 Estilo Visual e Elementos Gráficos

A estética geral segue os seguintes princípios:
* **Clean e Sofisticado**
* **Profissional e Acessível**
* **Atemporal**

### Padrões e Texturas
* **Linhas:** Uso de linhas finas e curvas elegantes (na cor dourada ou chumbo) para separar seções ou guiar o olhar.
* **Formas:** Estrelas minimalistas de 4 pontas (✦), círculos vazados com bordas finas e malhas de pontos (dot grids) sutis para texturizar fundos sem poluir.
* **Ícones:** Estilo "line art" (linhas finas e limpas), preferencialmente centralizados em círculos com preenchimento nas cores da paleta. Exemplos de uso sugeridos na imagem: prancheta, lâmpada, gráfico de tendências e grupo de pessoas.

## 📦 Importação de Fontes (Frontend)

Para integrar rapidamente essas fontes no seu projeto, você pode importar os assets diretamente do Google Fonts:

```html
<link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
<link rel="preconnect" href="[https://fonts.gstatic.com](https://fonts.gstatic.com)" crossorigin>
<link href="[https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Playfair+Display:wght@400&display=swap](https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Playfair+Display:wght@400&display=swap)" rel="stylesheet">
```

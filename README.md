# App Weather AI

## 📖 Sobre o Projeto

Este é um aplicativo web de página única (SPA) que permite aos usuários consultar o tempo atual e a previsão para os próximos cinco dias para uma ou mais cidades simultaneamente. O aplicativo utiliza a API Open-Meteo para obter dados precisos e apresenta as informações em uma interface moderna, responsiva e visualmente atraente.

## ✨ Funcionalidades

* **Busca de Múltiplas Cidades**: Insira várias cidades separadas por vírgula para ver o clima de todas lado a lado.
* **Dados Climáticos Detalhados**: Exibe temperatura atual, descrição do clima (ex: "Parcialmente nublado"), umidade, volume de precipitação e velocidade do vento.
* **Previsão para 5 Dias**: Mostra a previsão de temperatura máxima e mínima para os próximos cinco dias.
* **Interface Dinâmica e Atraente**:
  * O plano de fundo da página muda de acordo com as condições climáticas da primeira cidade pesquisada.
  * Cards com efeito de "vidro fosco" para melhor legibilidade e um visual moderno.
* **Design Responsivo**: Totalmente funcional e visualmente agradável em desktops, tablets e dispositivos móveis.
* **Ícones Intuitivos**: Utiliza a biblioteca Phosphor Icons para representar visualmente as diferentes condições climáticas e dados.

## 🛠️ Tecnologias Utilizadas

* **HTML5**: Estrutura semântica do conteúdo.
* **CSS3**: Estilização, incluindo:
  * **Tailwind CSS**: Framework de utilitários para agilizar a criação do layout.
  * **CSS Customizado**: Para efeitos complexos como o `backdrop-filter` e as transições de imagem de fundo.
* **JavaScript (ES6+)**: Para toda a lógica da aplicação, incluindo:
  * **Fetch API**: Para realizar as chamadas às APIs externas.
  * **Async/Await**: Para lidar com a natureza assíncrona das requisições de rede.
* **APIs e Serviços Externos**:
  * **Open-Meteo**: Fornece os dados de geocodificação e previsão do tempo.
  * **Unsplash**: Fornece as imagens de alta qualidade para os planos de fundo dinâmicos.
  * **Phosphor Icons**: Biblioteca de ícones utilizada na interface.
  * **Google Fonts**: Para a fonte "Inter".

## 🚀 Como Executar

Para executar este projeto localmente, siga os passos abaixo:

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/viniciusoliveira-27/app-weather-ai
   ```


2. **Navegue até a Pasta do Projeto**:
   ```bash
   cd seu-repositorio
   ```

3. **Abra o Arquivo no Navegador**:
   Abra o arquivo `index.html` em qualquer navegador de internet moderno (Google Chrome, Mozilla Firefox, etc.).

E pronto! O aplicativo estará funcionando em sua máquina.

## 🗺️ Como Navegar

1. No campo de texto, insira o nome de uma cidade (ex: `Brasília`).
2. Para múltiplas cidades, separe os nomes com vírgula (ex: `Rio de Janeiro, Porto, Miami`).
3. Clique no botão **"Buscar"** ou pressione a tecla **"Enter"**.
4. Os resultados aparecerão em cards na tela.

## 🔮 Implementações Futuras

Este projeto tem potencial para crescer. Aqui estão algumas ideias para futuras funcionalidades:

* **Geolocalização Automática**: Utilizar a API de Geolocalização do navegador para detectar a localização do usuário e exibir o clima local ao carregar a página.
* **Salvar Cidades Favoritas**: Implementar `localStorage` para permitir que os usuários salvem uma lista de cidades favoritas para acesso rápido.
* **Alternância de Unidades**: Adicionar um botão para que o usuário possa alternar a exibição de temperatura entre Celsius (°C) e Fahrenheit (°F).
* **Gráficos de Previsão**: Exibir um gráfico interativo mostrando a variação da temperatura ao longo das próximas 24 horas.
* **Internacionalização (i18n)**: Adicionar suporte para múltiplos idiomas na interface.
* **Progressive Web App (PWA)**: Transformar o aplicativo em um PWA para que possa ser "instalado" no dispositivo do usuário e ter capacidades offline básicas.

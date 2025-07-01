// Selecionando os elementos do DOM
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherResult = document.getElementById('weatherResult');

/**
 * Função principal para buscar o clima.
 * A API Open-Meteo precisa de latitude e longitude.
 * Então, o processo tem duas etapas:
 * 1. Geocodificação: Converter o nome da cidade em coordenadas (latitude, longitude).
 * 2. Previsão do Tempo: Usar as coordenadas para obter os dados do clima.
 */
async function fetchWeather() {
    const cityName = cityInput.value.trim();

    if (!cityName) {
        weatherResult.innerHTML = `<p class="text-red-500 font-semibold">Por favor, digite o nome de uma cidade.</p>`;
        return;
    }

    // Exibe uma mensagem de carregamento
    weatherResult.innerHTML = `<p class="text-blue-500">Buscando...</p>`;

    try {
        // --- ETAPA 1: Geocodificação ---
        const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`;
        
        const geoResponse = await fetch(geoApiUrl);
        const geoData = await geoResponse.json();

        // Verifica se a cidade foi encontrada
        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.innerHTML = `<p class="text-red-500 font-semibold">Cidade não encontrada. Tente novamente.</p>`;
            return;
        }

        const location = geoData.results[0];
        const { latitude, longitude, name, admin1, country } = location;

        // --- ETAPA 2: Previsão do Tempo ---
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        
        // Extrai a temperatura dos dados recebidos
        const temperature = weatherData.current_weather.temperature;

        // Monta o HTML para exibir o resultado
        displayWeather(name, admin1, country, temperature);

    } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        weatherResult.innerHTML = `<p class="text-red-500 font-semibold">Ocorreu um erro ao buscar os dados. Verifique o console para mais detalhes.</p>`;
    }
}

/**
 * Função para formatar e exibir os resultados do clima no DOM.
 */
function displayWeather(city, state, country, temp) {
     const locationName = state ? `${city}, ${state} - ${country}` : `${city} - ${country}`;
     
     weatherResult.innerHTML = `
        <h2 class="text-xl font-bold text-gray-700">${locationName}</h2>
        <div class="mt-4 text-5xl font-bold text-gray-900">
            ${temp}°C
        </div>
        <p class="text-gray-500 mt-2">Temperatura Atual</p>
    `;
}

// Adiciona o evento de clique ao botão
searchButton.addEventListener('click', fetchWeather);

// Permite que o usuário pressione "Enter" no campo de input para buscar
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

// Selecionando os elementos do DOM do seu index.html
// (Removido: já declarado anteriormente)

/**
 * Converte um WMO weather code em uma descrição textual em português.
 * @param {number} code - O código do clima (WMO Weather interpretation codes).
 * @returns {string} Uma descrição amigável do clima.
 */
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Céu limpo',
        1: 'Quase limpo',
        2: 'Parcialmente nublado',
        3: 'Nublado',
        45: 'Nevoeiro',
        48: 'Nevoeiro com geada',
        51: 'Chuvisco leve',
        53: 'Chuvisco moderado',
        55: 'Chuvisco denso',
        61: 'Chuva leve',
        63: 'Chuva moderada',
        65: 'Chuva forte',
        80: 'Pancadas de chuva leves',
        81: 'Pancadas de chuva moderadas',
        82: 'Pancadas de chuva violentas',
        95: 'Trovoada',
    };
    return descriptions[code] || 'Condição desconhecida';
}

/**
 * Busca os dados do clima para uma cidade específica.
 * @param {string} cityName - O nome da cidade a ser pesquisada.
 * @returns {Promise<object>} Uma promessa que resolve com um objeto contendo os dados do clima.
 * @throws {Error} Lança um erro se a cidade não for encontrada ou se ocorrer um problema de rede/API.
 */
async function getWeatherByCityName(cityName) {
    // ETAPA 1: Validação da entrada
    if (!cityName || typeof cityName !== 'string' || cityName.trim() === '') {
        throw new Error('Nome da cidade inválido. Por favor, forneça um nome de cidade válido.');
    }

    try {
        // ETAPA 2: Geocodificação - Converter nome da cidade em coordenadas
        const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`;
        
        const geoResponse = await fetch(geoApiUrl);

        if (!geoResponse.ok) {
            throw new Error(`Erro de rede na geocodificação: ${geoResponse.statusText}`);
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Cidade "${cityName}" não encontrada.`);
        }

        const location = geoData.results[0];
        const { latitude, longitude, name: foundCityName, admin1, country } = location;

        // ETAPA 3: Busca do Clima - Usar coordenadas para obter dados meteorológicos
        const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        
        const weatherResponse = await fetch(weatherApiUrl);

        if (!weatherResponse.ok) {
            throw new Error(`Erro de rede na busca do clima: ${weatherResponse.statusText}`);
        }

        const weatherData = await weatherResponse.json();
        const { temperature, weathercode } = weatherData.current_weather;
        const description = getWeatherDescription(weathercode);

        // ETAPA 4: Retornar o objeto com os dados formatados
        return {
            cidade: foundCityName,
            estado: admin1,
            pais: country,
            temperatura: temperature,
            descricao: description,
        };

    } catch (error) {
        console.error('Erro no processo de busca do clima:', error);
        throw error;
    }
}

/**
 * Função para formatar e exibir os resultados do clima no DOM.
 * @param {object} weatherData - O objeto de dados do clima retornado por getWeatherByCityName.
 */
function displayWeather(weatherData) {
    const { cidade, estado, pais, temperatura, descricao } = weatherData;
    const locationName = estado ? `${cidade}, ${estado} - ${pais}` : `${cidade} - ${pais}`;
     
    weatherResult.innerHTML = `
        <h2 class="text-xl font-bold text-gray-700">${locationName}</h2>
        <div class="mt-4 text-5xl font-bold text-gray-900">
            ${temperatura}°C
        </div>
        <p class="text-gray-600 mt-2 text-lg">${descricao}</p>
    `;
}

/**
 * Lida com o evento de busca, chama a API e atualiza a UI.
 */
async function handleSearch() {
    const city = cityInput.value;
    weatherResult.innerHTML = `<p class="text-blue-500">Buscando...</p>`;

    try {
        const weatherData = await getWeatherByCityName(city);
        displayWeather(weatherData);
    } catch (error) {
        weatherResult.innerHTML = `<p class="text-red-500 font-semibold">Erro: ${error.message}</p>`;
    }
}

// Adiciona os eventos de clique ao botão e de "Enter" ao input
searchButton.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});


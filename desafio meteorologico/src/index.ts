// src/index.ts

import * as fs from 'fs';
import * as path from 'path';
import { Meteo, RawMeteoData } from './models/Meteo';

const DATA_FILE = path.join(process.cwd(), 'Desafio_Dados_Meteorologicos.csv');
const SEPARATOR = ';';

// ----------------------------------------------------------------------
// FUNÇÃO DE CARREGAMENTO, LIMPEZA E PARSEAMENTO DE DADOS
// ----------------------------------------------------------------------

/**
 * Lê o arquivo CSV, lida com o separador ';' e o decimal ',', 
 * e converte para o modelo Meteo.
 * @returns Um array de objetos Meteo.
 */
function loadAndCleanData(): Meteo[] {
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const lines = fileContent.trim().split('\r\n'); // Lida com quebras de linha comuns

        if (lines.length === 0) {
            console.error("Erro: O arquivo de dados está vazio.");
            return [];
        }

        const headers = lines[0].split(SEPARATOR).map(h => h.trim());
        const dataLines = lines.slice(1);
        const meteoData: Meteo[] = [];

        // Colunas que sabemos que precisam de tratamento de vírgula para ponto e conversão
        const numericColumns = ['Temp_C', 'Hum', 'Press_Bar', 'TempCabine_C', 'Charge', 'SR_Wm2', 
                                'WindPeak_ms', 'WindSpeed_Inst', 'WindSpeed_Avg', 'WindDir_Inst', 'WindDir_Avg'];

        for (const line of dataLines) {
            const values = line.split(SEPARATOR).map(v => v.trim());
            const rawData: any = {};

            // 1. Mapear valores para o objeto RawData e limpar vírgulas para pontos
            headers.forEach((header, index) => {
                let value = values[index];
                if (numericColumns.includes(header)) {
                    // Substitui vírgula por ponto para conversão correta de float em JS/TS
                    value = value.replace(',', '.');
                }
                rawData[header] = value;
            });
            
            // 2. Instanciar o modelo Meteo com os dados limpos
            meteoData.push(new Meteo(rawData as RawMeteoData));
        }

        console.log(`Dados carregados com sucesso: ${meteoData.length} registros.`);
        return meteoData;

    } catch (error) {
        console.error(`Erro ao carregar ou processar o arquivo ${DATA_FILE}:`, error);
        return [];
    }
}


// ----------------------------------------------------------------------
// FUNÇÕES DE ANÁLISE E RESOLUÇÃO DOS PROBLEMAS (C, D, E, F, G)
// ----------------------------------------------------------------------

function resolveMeteoChallenge(meteoData: Meteo[]) {
    if (meteoData.length === 0) return;

    console.log("\n=======================================================");
    console.log("             RESULTADOS DO DESAFIO EM TS               ");
    console.log("=======================================================");
    
    // ----------------------------------------------------------------------
    // d. Informar a média de todas as temperaturas cadastradas
    // ----------------------------------------------------------------------
    const averageTemperature = meteoData.reduce((sum, item) => sum + item.Temp_C, 0) / meteoData.length;
    console.log(`\nd. Média de todas as temperaturas cadastradas: **${averageTemperature.toFixed(2)} °C**`);

    // ----------------------------------------------------------------------
    // e. Informar a média geral das médias de vento cadastradas
    // ----------------------------------------------------------------------
    const averageWindSpeed = meteoData.reduce((sum, item) => sum + item.WindSpeed_Avg, 0) / meteoData.length;
    console.log(`\ne. Média geral das médias de vento cadastradas: **${averageWindSpeed.toFixed(2)} m/s**`);

    // ----------------------------------------------------------------------
    // g. Informar a média geral da medição do percentual de umidade do ar
    // ----------------------------------------------------------------------
    const averageHumidity = meteoData.reduce((sum, item) => sum + item.Hum_Percent, 0) / meteoData.length;
    console.log(`\ng. Média geral da medição do percentual de umidade do ar: **${averageHumidity.toFixed(2)} %**`);

    // ----------------------------------------------------------------------
    // FUNÇÕES AUXILIARES PARA C e F
    // ----------------------------------------------------------------------

    // Agrupa os dados por dia e retorna o valor máximo de uma chave específica
    const calculateDailyMax = (key: keyof Meteo): { date: string, value: number }[] => {
        const dailyMax = new Map<string, number>();
        for (const item of meteoData) {
            const date = item.Date;
            const value = item[key] as number;
            if (!dailyMax.has(date) || value > dailyMax.get(date)!) {
                dailyMax.set(date, value);
            }
        }
        return Array.from(dailyMax.entries()).map(([date, value]) => ({ date, value }));
    };

    // Função de ordenação: Decrescente por valor, e em caso de empate, crescente por data (DD/MM/AAAA)
    const sortByValueAndDate = (a: { date: string, value: number }, b: { date: string, value: number }) => {
        if (b.value !== a.value) {
            return b.value - a.value; // Decrescente por valor
        }
        // Conversão de data para formato comparável (AAAA-MM-DD)
        const dateStrToComparable = (d: string) => d.split('/').reverse().join('-');
        const dateA = dateStrToComparable(a.date);
        const dateB = dateStrToComparable(b.date);
        return dateA.localeCompare(dateB); // Crescente por data
    };
    
    // ----------------------------------------------------------------------
    // c. Top 5 dias com as mais altas temperaturas (e empates)
    // ----------------------------------------------------------------------
    const dailyMaxTemp = calculateDailyMax('Temp_C');
    dailyMaxTemp.sort(sortByValueAndDate);

    // Encontra a 5ª maior temperatura, considerando valores distintos
    const top5DistinctTemps = Array.from(new Set(dailyMaxTemp.map(item => item.value))).slice(0, 5);
    const fifthHighestTemp = top5DistinctTemps.length === 5 ? top5DistinctTemps[4] : top5DistinctTemps[top5DistinctTemps.length - 1];

    const topTempDays = dailyMaxTemp.filter(item => item.value >= fifthHighestTemp);

    console.log('\n\nc. Top 5 dias com as mais altas temperaturas (e empates):');
    topTempDays.forEach(item => {
        console.log(`- Dia ${item.date}: ${item.value.toFixed(2)} °C`);
    });

    // ----------------------------------------------------------------------
    // f. Top 3 dias com as maiores medições de pressão atmosférica (e empates)
    // ----------------------------------------------------------------------
    const dailyMaxPressure = calculateDailyMax('Press_Bar');
    dailyMaxPressure.sort(sortByValueAndDate);
    
    // Encontra a 3ª maior pressão, considerando valores distintos
    const top3DistinctPressures = Array.from(new Set(dailyMaxPressure.map(item => item.value))).slice(0, 3);
    const thirdHighestPressure = top3DistinctPressures.length === 3 ? top3DistinctPressures[2] : top3DistinctPressures[top3DistinctPressures.length - 1];
    
    const topPressureDays = dailyMaxPressure.filter(item => item.value >= thirdHighestPressure);

    console.log('\n\nf. Top 3 dias com as maiores medições de pressão atmosférica (e empates):');
    topPressureDays.forEach(item => {
        console.log(`- Dia ${item.date}: ${item.value.toFixed(2)} Bar`);
    });
    console.log("=======================================================\n");
}


// Execução principal
const meteoData = loadAndCleanData();
resolveMeteoChallenge(meteoData);
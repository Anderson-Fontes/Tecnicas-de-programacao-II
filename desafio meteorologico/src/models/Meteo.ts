// src/models/Meteo.ts

/**
 * Interface para os dados brutos de uma linha do CSV, facilitando o mapeamento.
 */
export interface RawMeteoData {
    Date: string;
    Time: string;
    Temp_C: string;
    Hum: string; // O CSV fornecido tem a coluna como 'Hum', não 'Hum_%'
    Press_Bar: string;
    TempCabine_C: string;
    Charge: string;
    SR_Wm2: string;
    WindPeak_ms: string;
    WindSpeed_Inst: string;
    WindSpeed_Avg: string;
    WindDir_Inst: string;
    WindDir_Avg: string;
}

/**
 * Classe de modelo para os Dados Meteorológicos.
 * Todos os valores numéricos são representados como number.
 */
export class Meteo {
    public Date: string;
    public Time: string;
    public Temp_C: number;
    public Hum_Percent: number; // Mapeado de 'Hum' do CSV, renomeado para 'Hum_Percent'
    public Press_Bar: number;
    public WindSpeed_Avg: number;

    // Outros campos
    public TempCabine_C: number;
    public Charge: number;
    public SR_Wm2: number;
    public WindPeak_ms: number;
    public WindSpeed_Inst: number;
    public WindDir_Inst: number;
    public WindDir_Avg: number;

    constructor(data: RawMeteoData) {
        // Conversões de string para número (feitas na função de carregamento)
        this.Date = data.Date;
        this.Time = data.Time;
        this.Temp_C = Number(data.Temp_C);
        this.Hum_Percent = Number(data.Hum);
        this.Press_Bar = Number(data.Press_Bar);
        this.WindSpeed_Avg = Number(data.WindSpeed_Avg);
        
        this.TempCabine_C = Number(data.TempCabine_C);
        this.Charge = Number(data.Charge);
        this.SR_Wm2 = Number(data.SR_Wm2);
        this.WindPeak_ms = Number(data.WindPeak_ms);
        this.WindSpeed_Inst = Number(data.WindSpeed_Inst);
        this.WindDir_Inst = Number(data.WindDir_Inst);
        this.WindDir_Avg = Number(data.WindDir_Avg);
    }
}
import { fromUnixTime, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export const formatPrice = (price:number) => {

    const params = {maximumFractionDigits:2, minimumFractionDigits: 2};
    return new Intl.NumberFormat('pt-BR', params).format(price);
}

export function limitText(text: string, limit : number) {
    const cut = text.substring(0, limit);
    if (text.length > limit) {
        return cut.concat("...");
    }
    return cut;
  }


  export function convertToBrazilianDateFormat(timestamp : number) {
    // Converte o timestamp Unix (em segundos) para um objeto Date
    const date = fromUnixTime(timestamp);
    
    // Formata a data no formato brasileiro
    return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
  }
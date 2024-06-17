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
import { format } from "date-fns";

export const setLocal = (docNumbers: any) => {
    // Put the object into storage
    localStorage.setItem("docNumbers", JSON.stringify(docNumbers));
};
export const getLocal = () => {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem("docNumbers");
    if (retrievedObject) {
        return JSON.parse(retrievedObject);
    }
    return null;
};
export const monthWords = [
    "sausio",
    "vasario",
    "kovo",
    "balandžio",
    "gegužės",
    "birželio",
    "liepos",
    "rugpjūčio",
    "rugsėjo",
    "spalio",
    "lapkričio",
    "gruodžio"
];
export const dateToWords = (date: Date) => {
    return `${date.getFullYear()} m. ${monthWords[date.getMonth()]} ${format(
        date,
        "dd"
    )} d.`;
};
export const priceToWordsHelper = (priceNumber: number): string => {
    var words = [];
    words[0] = "";
    words[1] = "vienas ";
    words[2] = "du ";
    words[3] = "trys ";
    words[4] = "keturi ";
    words[5] = "penki ";
    words[6] = "šeši ";
    words[7] = "septyni ";
    words[8] = "aštuoni ";
    words[9] = "devyni ";
    words[10] = "dešimt ";
    words[11] = "vienuolika ";
    words[12] = "dvylika ";
    words[13] = "trylika ";
    words[14] = "keturiuolika ";
    words[15] = "penkiolika ";
    words[16] = "šešiolika ";
    words[17] = "septyniolika ";
    words[18] = "aštuoniolika ";
    words[19] = "devyniolika ";
    words[20] = "dvidešimt ";
    words[30] = "trisdešimt ";
    words[40] = "keturiasdešimt ";
    words[50] = "penkiasdešimt ";
    words[60] = "šešiasdešimt ";
    words[70] = "septyniasdešimt ";
    words[80] = "aštuoniasdešimt ";
    words[90] = "devyniasdešimt ";
    words[100] = "šimtas ";
    words[101] = "šimtai ";
    words[1000] = "tūkstantis ";
    words[1001] = "tūkstančiai ";
    words[10000] = "tūkstančių ";

    let priceInWords = "";
    const eurWord = priceNumber
        ? priceNumber % 10 === 1 && priceNumber % 100 !== 11
            ? "euras"
            : priceNumber % 10 !== 0 &&
              (priceNumber % 100 < 10 || priceNumber % 100 > 20)
            ? "eurai"
            : "eurų"
        : "";
    let decimalNumberWord = "";
    const decimalNumber = priceNumber % 100;

    if (decimalNumber) {
        if (decimalNumber >= 10 && decimalNumber <= 20) {
            decimalNumberWord = words[decimalNumber];
            priceNumber -= decimalNumber;
        } else {
            decimalNumberWord = words[decimalNumber - (decimalNumber % 10)];
            priceNumber = priceNumber - decimalNumber + (decimalNumber % 10);
        }
    }

    const lastNumber = priceNumber % 10;
    let lastNumberWord = "";

    if (lastNumber) {
        lastNumberWord = words[priceNumber % 10];
        priceNumber -= lastNumber;
    }

    let hundredNumberWord = "";
    const hundredNumber = priceNumber % 1000;

    if (hundredNumber) {
        const hundredNumberFirstPosition = hundredNumber / 100;
        if (hundredNumberFirstPosition === 1) {
            hundredNumberWord = words[100];
        } else {
            hundredNumberWord = words[hundredNumberFirstPosition] + words[101];
        }
        priceNumber -= hundredNumber;
    }

    let tenThousandNumberWord = "";
    const tenThousandNumber = priceNumber % 100000;

    if (tenThousandNumber >= 10000) {
        const tenThousandNumberFirstPosition = tenThousandNumber / 1000;
        if (
            tenThousandNumberFirstPosition >= 10 &&
            tenThousandNumberFirstPosition <= 20
        ) {
            tenThousandNumberWord =
                words[tenThousandNumberFirstPosition] + words[10000];
            priceNumber -= tenThousandNumber;
        } else {
            const tempThousandNumber = (priceNumber % 10000) / 1000;
            tenThousandNumberWord =
                words[tenThousandNumberFirstPosition - tempThousandNumber];
            if (!tempThousandNumber) {
                tenThousandNumberWord += words[10000];
            }
            priceNumber =
                priceNumber - tenThousandNumber + (priceNumber % 10000);
        }
    }
    let thousandNumberWord = "";
    const thousandNumber = priceNumber % 10000;

    if (thousandNumber) {
        const thousandNumberFirstPosition = thousandNumber / 1000;
        if (thousandNumberFirstPosition === 1) {
            if (tenThousandNumberWord) {
                thousandNumberWord =
                    words[thousandNumberFirstPosition] + words[1000];
            } else {
                thousandNumberWord = words[1000];
            }
        } else {
            thousandNumberWord =
                words[thousandNumberFirstPosition] + words[1001];
        }
        priceNumber -= thousandNumber;
    }
    priceInWords =
        tenThousandNumberWord +
        thousandNumberWord +
        hundredNumberWord +
        decimalNumberWord +
        lastNumberWord +
        eurWord;

    return priceInWords;
};

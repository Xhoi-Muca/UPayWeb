/**
 * Fee data copied verbatim from https://upay.al/tarifa.html on 2026-11-09.
 * Row format: [Albanian label, English label, price (Albanian), price (English, optional)].
 * These are business-critical numbers: any change must be approved by UPay.
 */
export type FeeRow = [sq: string, en: string, priceSq: string, priceEn?: string];
export type FeeGroup = { sq: string; en: string; rows: FeeRow[] };

const L = "0 Lekë";
const L0 = "0 lek";

export const upayFees: FeeGroup[] = [
  { sq: "Llogaria juaj", en: "Your account", rows: [
    ["Hapje llogarie", "Account opening", L, L0],
    ["Transferta brenda llogarive UPay", "Transfers between UPay accounts", L, L0],
  ] },
  { sq: "Rimbushje llogarie", en: "Account top-up", rows: [
    ["Cash", "Cash", L, L0],
    ["Nga llogari bankare", "From a bank account", L, L0],
    ["Me kartë bankare", "With a bank card", "0 Lekë deri në limitin 30.000 lekë/muaj", "0 lek up to the limit of 30,000 lek/month"],
    ["Rimbushjet me vlerë mbi 30.000 lekë/muaj", "Top-ups above 30,000 lek/month", "3%"],
  ] },
  { sq: "Pagesat e faturave dhe abonimet", en: "Bill payments and subscriptions", rows: [
    ["FSHU (OSHEE)", "FSHU (OSHEE)", L, L0],
    ["ONE, Digicom, Abissnet", "ONE, Digicom, Abissnet", L, L0],
    ["Digitalb, Tring, Abcom", "Digitalb, Tring, Abcom", L, L0],
    ["UKD, UKSR", "UKD, UKSR", L, L0],
    ["UK të tjerë", "Other water utilities (UK)", "30 Lekë", "30 lek"],
    ["UKT", "UKT", "40 Lekë", "40 lek"],
    ["QEZHEF (kopshte, çerdhe)", "QEZHEF (kindergartens, nurseries)", "50 Lekë", "50 lek"],
    ["Gjoba të Policisë Rrugore", "Traffic Police fines", "50 Lekë", "50 lek"],
    ["Gjoba të Policisë Bashkiake Tiranë", "Tirana Municipal Police fines", "50 Lekë", "50 lek"],
    ["Taksat dhe tarifat e Bashkisë", "Municipal taxes and fees", "100 Lekë", "100 lek"],
  ] },
  { sq: "Shërbime të tjera", en: "Other services", rows: [
    ["Rimbushje dhe paketa celulare (One, Vodafone)", "Mobile top-ups and packages (One, Vodafone)", L, L0],
    ["Pagesa e kësteve të Kredisë iute", "Kredia iute instalment payments", L, L0],
    ["Pagesa e kësteve të Kredo.al", "Kredo.al instalment payments", "100 Lekë", "100 lek"],
    ["Link pagese", "Payment link", "2.5%"],
    ["Tërheqje nga llogaria Biznes", "Withdrawal from a Business account", "150 Lekë", "150 lek"],
    ["Tërheqje nga llogaria Individ", "Withdrawal from a Personal account", "2% min 100 Lekë", "2% min 100 lek"],
  ] },
];

export const cardFees: FeeRow[] = [
  ["Ofrimi i kartës kryesore", "Issuing the main card", L, L0],
  ["Komision mirëmbajtje për kartën", "Card maintenance fee", L, L0],
  ["Ofrimi i kartës dytësore", "Issuing a secondary card", "500 Lekë", "500 lek"],
  ["Ri-ofrimi i kartës pas skadencës", "Re-issuing the card after expiry", "500 Lekë", "500 lek"],
  ["Ri-lëshim PIN / PIN i ri", "PIN re-issue / new PIN", "500 Lekë", "500 lek"],
  ["Ri-shfaq PIN në aplikacionin UPay", "Re-display PIN in the UPay app", "50 Lekë", "50 lek"],
  ["Ri-ofrim karte si e dëmtuar/vjedhur/humbur", "Replacement of a damaged/stolen/lost card", "500 Lekë", "500 lek"],
  ["Kontroll balance në aplikacionin UPay", "Balance check in the UPay app", L, L0],
  ["Kontroll balance në ATM Union Bank", "Balance check at a Union Bank ATM", "25 Lekë", "25 lek"],
  ["Depozitim në ATM e Union Bank", "Deposit at a Union Bank ATM", L, L0],
  ["Tërheqje në ATM Union Bank deri në 30,000 ALL / muaj", "Withdrawal at a Union Bank ATM up to 30,000 ALL / month", L, L0],
  ["Tërheqje në ATM Union Bank mbi 30,000 ALL / muaj", "Withdrawal at a Union Bank ATM above 30,000 ALL / month", "2% e shumës së tërhequr (minimum 350 Lek)", "2% of the amount withdrawn (minimum 350 lek)"],
  ["Tërheqje në ATM brenda vendit (jo Union Bank)", "Withdrawal at a domestic ATM (not Union Bank)", "2% e shumës (minimum 350 Lek)", "2% of the amount (minimum 350 lek)"],
  ["Tërheqje në ATM jashtë vendit", "Withdrawal at an ATM abroad", "2% e shumës (minimum 350 Lek)", "2% of the amount (minimum 350 lek)"],
  ["Blerje në POS brenda/jashtë vendit", "Purchase at a POS in Albania/abroad", L, L0],
  ["Blerje online", "Online purchase", L, L0],
  ["Bllokimi i kartës", "Blocking the card", L, L0],
  ["Zhbllokimi i kartës", "Unblocking the card", L, L0],
  ["Ndryshimi i limitit të kartës", "Changing the card limit", L, L0],
];

export type WuTable = { sq: string; en: string; unit: "EUR" | "ALL"; rows: [string, string][] };

/** Receiving money with Western Union costs 0 lek (per the source page). */
export const wuReceiveFee = { sq: L, en: L0 };

export const wuTables: WuTable[] = [
  { sq: "Kosovë, Maqedoni e Veriut, Bosnje-Hercegovinë, Kroaci, Slloveni, Mal i Zi, Turqi, Serbi", en: "Kosovo, North Macedonia, Bosnia and Herzegovina, Croatia, Slovenia, Montenegro, Turkey, Serbia", unit: "EUR", rows: [
    ["0.00 – 100.00", "5.00"], ["100.01 – 200.00", "8.00"], ["200.01 – 300.00", "10.00"], ["300.01 – 500.00", "11.50"], ["500.01 – 700.00", "18.00"], ["700.01 – 750.00", "18.50"], ["750.01 – 800.00", "21.00"], ["800.01 – 1000.00", "22.00"], ["1000.01 – 1400.00", "27.00"], ["1400.01 – 1500.00", "28.50"], ["1500.01 – 2500.00", "30.00"], ["2500.01 – 3000.00", "37.00"], ["3000.01 – 7000.00", "40.00"],
  ] },
  { sq: "Itali, Gjermani, Greqi", en: "Italy, Germany, Greece", unit: "EUR", rows: [
    ["0.00 – 50.00", "5.00"], ["50.01 – 100.00", "6.00"], ["100.01 – 200.00", "11.00"], ["200.01 – 300.00", "15.00"], ["300.01 – 500.00", "20.00"], ["500.01 – 800.00", "25.00"], ["800.01 – 1000.00", "30.00"], ["1000.01 – 2100.00", "35.00"], ["2100.01 – 2500.00", "40.00"], ["2500.01 – 3000.00", "45.00"], ["3000.01 – 7000.00", "50.00"],
  ] },
  { sq: "Vendet e tjera", en: "Other countries", unit: "EUR", rows: [
    ["0.01 – 50.00", "5.00"], ["50.01 – 100.00", "7.00"], ["100.01 – 200.00", "13.00"], ["200.01 – 300.00", "19.00"], ["300.01 – 500.00", "26.00"], ["500.01 – 800.00", "35.00"], ["800.01 – 1000.00", "40.00"], ["1000.01 – 2000.00", "50.00"], ["2000.01 – 2500.00", "60.00"], ["2500.01+", "70.00"],
  ] },
  { sq: "Shqipëri, në euro (€)", en: "Albania, in euro (€)", unit: "EUR", rows: [
    ["0.01 – 50.00", "4.00"], ["50.01 – 150.00", "6.00"], ["150.01 – 300.00", "8.00"], ["300.01 – 500.00", "12.00"], ["500.01 – 700.00", "15.00"], ["700.01 – 1000.00", "20.00"], ["1000.01 – 2000.00", "25.00"], ["2000.01 – 7000.00", "40.00"],
  ] },
  { sq: "Shqipëri, në lekë (ALL)", en: "Albania, in lek (ALL)", unit: "ALL", rows: [
    ["0.01 – 5,500.00", "450.00"], ["5,500.01 – 15,000.00", "650.00"], ["15,000.01 – 30,000.00", "900.00"], ["30,000.01 – 50,000.00", "1,350.00"], ["50,000.01 – 60,000.00", "1,650.00"], ["60,000.01 – 100,000.00", "2,200.00"], ["100,000.01 – 200,000.00", "2,750.00"], ["200,000.01 – 770,000.00", "4,400.00"],
  ] },
];

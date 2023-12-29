const currencies = (
  [
    "usd", "eur", "gel", "try", "amd", "byn", "uah", "rub",
    "aed", "afn", "all", "ars", "aud", "azn", "bam", "bbd",
    "bdt", "bgn", "bhd", "bif", "bmd", "bnd", "bob", "brl",
    "btn", "bwp", "bzd", "cad", "cdf", "chf", "clp", "cny",
    "cop", "crc", "czk", "dkk", "dop", "dzd", "egp", "etb",
    "gbp", "ghs", "gmd", "gtq", "gyd", "hkd", "htg", "huf",
    "idr", "ils", "inr", "isk", "jmd", "jod", "jpy", "kes",
    "kgs", "khr", "krw", "kwd", "kyd", "kzt", "lak", "lkr",
    "lrd", "mad", "mdl", "mkd", "mmk", "mnt", "mur", "mwk",
    "mxn", "myr", "mzn", "nad", "ngn", "nio", "nok", "npr",
    "nzd", "omr", "pen", "pgk", "php", "pkr", "pln", "pyg",
    "qar", "ron", "rsd", "rwf", "sar", "scr", "sek", "sgd",
    "sos", "srd", "syp", "thb", "ttd", "twd", "tzs", "ugx",
    "uyu", "vef", "vnd", "xaf", "yer", "zar", "zmw",
  ] as const
).map((e) => e);
export type Currencies = typeof currencies[0];

export class Currency {
  constructor({ name }: { name: Currencies }) {
    this.name = name;
  }

  name: Currencies;

  static def: Currency = new Currency({ name: 'gel' });

  static fromString(str: string): Currency {
    const name = currencies.find((e) => e === str.toLowerCase());
    if (name) {
      return new Currency({ name });
    }
    throw new Error('Invalid type of the currency.');
  }

  static isValidString(str?: string): Boolean {
    const name = currencies.find((e) => e === str?.toLowerCase());
    return !!name;
  }

  toString(): string {
    return this.name.toUpperCase();
  }
}

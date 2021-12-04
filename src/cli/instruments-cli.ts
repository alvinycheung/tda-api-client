// Copyright (C) 2020-1  Aaron Satterlee

import {Arguments} from "yargs";
import {getInstrument, searchInstruments} from "../instruments";

export default {
    command: 'instruments <command>',
    desc: 'Search for an instrument with a text string, or get an instrument by CUSIP',
    builder: (yargs: any) => {
        return yargs
            .command('search <symbol> <projection> [apikey]',
                'Search for an instrument using search string <symbol> and search type indicated by <projection> (one of symbol-search, symbol-regex, desc-search, desc-regex, fundamental), can optionally use apikey for unauthenticated request',
                {},
                async (argv: Arguments) => {
                    if (argv.verbose) {
                        console.log(`searching instruments for ${argv.symbol} with search type ${argv.projection}`);
                    }
                    return searchInstruments({
                        symbol: argv.symbol,
                        projection: argv.projection,
                        verbose: argv.verbose || false,
                        apikey: argv.apikey
                    }).then(data => JSON.stringify(data, null, 2)).then(console.log).catch(console.log);
                })
            .command('get <cusip> [apikey]',
                'Get an instrument by CUSIP <cusip> (unique id number assigned to all stocks and registered bonds in US/CA). List here: https://www.sec.gov/divisions/investment/13flists.htm , can use <apikey> for delayed data',
                {},
                async (argv: Arguments) => {
                    if (argv.verbose) {
                        console.log(`getting instrument info for cusip ${argv.cusip}`);
                    }
                    return getInstrument({
                        cusip: argv.cusip,
                        apikey: argv.apikey || '',
                        verbose: argv.verbose || false
                    }).then(data => JSON.stringify(data, null, 2)).then(console.log).catch(console.log);
                });
    },
    handler: (argv: Arguments) => {},
};

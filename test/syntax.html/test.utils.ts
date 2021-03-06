import { Registry } from 'vscode-textmate';

let registry = new Registry();
registry.loadGrammarFromPathSync('./syntaxes/html.json');
let grammar = registry.grammarForScopeName('au.html');

export function tokenizeLine(line: string) {
  return grammar.tokenizeLine(line, undefined);
}

export function getTokenOnCharRange(
  lineToken,
  startIndex: number,
  endIndex: number) {

  let tokens = lineToken.tokens.filter(token => token.startIndex === startIndex && token.endIndex === endIndex);
  return tokens.length === 1 ? tokens[0] : null;
}

export function hasScope(scopes: Array<string>, scope: string) {
  let foundScopes = scopes.filter(s => s === scope);
  return foundScopes.length === 1;
}

export function writeOut(lineToken, text) {
  for (let lt of lineToken.tokens) {
    // tslint:disable-next-line:no-console
    console.log(`${lt.startIndex} - ${lt.endIndex} => ${text.substring(lt.startIndex, lt.endIndex)}`);
    for (let s of lt.scopes) {
      // tslint:disable-next-line:no-console
      console.log(`- ${s}`);
    }
  }
}

import { resolve } from 'path';
import Reader from './handlers/read-file';

async function run() {
    /**
     * [ ] - Ler arquivo
     *      [ ] - A medida que lê cada linha devemos validar
     * [ ] - Deixar em uma estrutura de dados padrão
     * [ ] - Retirar os dados dessa estrutura
     */

    const pathFromFile = resolve(__dirname, '..', 'files', 'input20082019.txt');
    await Reader.readFile(pathFromFile);
}

run();

import { eachLine } from 'line-reader';

class Reader {
    readFile(path) {
        eachLine(path, () => {});
    }
}

export default new Reader();

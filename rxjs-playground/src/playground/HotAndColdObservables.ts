import { Observable, fromEvent } from "rxjs";
import { printValue } from "../utils/printer";

/**
 * Um Observable tem um Producer que é a função que produz os dados da stream
 *    @ HOT OBSERVABLE:
 *        Toda vez que um novo observador se increver em um observable
 *        ele vai começar ouvindo de onde está (como se fosse uma live
 *        no youtube, em que no momento em que nos inscrevemos começamos
 *        de onde ela está) (share operator transforma em HOT)
 */

const createHotObservable = () => {
  const observable1 = fromEvent(document, "mousemove");

  setTimeout(() => {
    const subscription = observable1.subscribe((x: any) => {
      printValue(x);
    });
  }, 2000);
};

/*    @ COLD OBSERVABLE:
 *        Toda vez que alguem se inscrever vai começar a ouvir desde
 *        o primeiro dado da stream. (Como se fosse um vídeo comum no
 *        Youtube ao qual quando iniciamos nossa inscrição no vídeo,
 *        ou seja, começamos a assitir assitimos desde o inicio dele)
 */

const createColdObservable = () => {
  const observable2: Observable<any> = Observable.create((observer: any) => {
    setInterval(() => {
      observer.next("Ping");
    }, 1500);
  });

  const observer = observable2.subscribe((val: any) => printValue(val));

  setTimeout(() => observer.unsubscribe(), 6000);
};

export { createColdObservable, createHotObservable };

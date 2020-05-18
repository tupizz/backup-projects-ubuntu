import { Subject } from "rxjs";
import { printValue } from "./../utils/printer";

export class SubjectPlayground {
  constructor() {
    // Subject por padrão é um Observable HOT
    const subject = new Subject();

    const observer1 = subject.subscribe(
      data => printValue("Observer 1 " + data),
      err => printValue("Observer 1 " + err),
      () => printValue("Observer 1 Completed")
    );

    subject.next("The first thing has been sent");
    subject.next("The second thing has been sent");

    const observer2 = subject.subscribe(data =>
      printValue("Observer 2 " + data)
    );

    subject.next("The third thing has been sent");
    subject.next("The fourth thing has been sent");

    observer2.unsubscribe();

    subject.next("A final thing has been sent");
  }
}

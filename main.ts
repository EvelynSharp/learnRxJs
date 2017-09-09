import { Observable } from "rxjs";
//import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/map";
//import "rxjs/add/operator/filter";

//let numbers = [1, 5, 10];
//let source = Observable.from(numbers);
/*let source = Observable.create(observer => {
  let index = 0;
  let produceValue = () => {
    observer.next(numbers[index++]);
    if(index < numbers.length) {
      setTimeout(produceValue, 250);
    } else {
      observer.complete();
    }
  }
  produceValue();
}).map(n => n * 2)
  .filter( n => n > 4);
*/
let circle = document.getElementById("circle");
let source = Observable.fromEvent(document, "mousemove")
  .map( (e : MouseEvent) => {return { x: e.clientX, y: e.clientY } })
  .filter( value => value.x < 500 )
  .delay(300);

function onNext(value) {
  circle.style.left = value.x;
  circle.style.top = value.y;
}


class MyObserver {
  next(value) {
    console.log(`value: ${value}`);
  }
  error(e) {
    console.log(`error: ${e}`);
  }
  complete() {
    console.log("complete");
  }
}
//source.subscribe(new MyObserver())


source.subscribe(
//  value => console.log(value),
  onNext,
  e => console.log(`error: ${e}`),
  () => console.log("complete")
)

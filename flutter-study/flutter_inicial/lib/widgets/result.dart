import 'package:flutter/material.dart';

class Result extends StatelessWidget {
  final int resultScore;
  final Function resetHandler;

  Result({this.resultScore, this.resetHandler});

  String get resultPrase {
    var resultText = 'You did it';
    if (resultScore <= 8) {
      resultText = 'WTF?!';
    } else if (resultScore <= 12) {
      resultText = 'Legalzinho';
    } else if (resultScore <= 20) {
      resultText = 'Legalzinho';
    } else {
      resultText = 'Você finalizou muito bem!';
    }

    return resultText;
  }

  /***
   * 
   * CRTL + .
   * 
   */

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text(
            resultPrase,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black38,
            ),
          ),
          RaisedButton(
            child: Text(
              'Restart',
              style: TextStyle(color: Colors.white),
            ),
            color: Colors.blue,
            onPressed: resetHandler,
          )
        ],
      ),
    );
  }
}

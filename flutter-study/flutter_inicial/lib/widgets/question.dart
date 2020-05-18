import 'package:flutter/material.dart';

class Question extends StatelessWidget {
  String questionText;

  // constructor recebendo e inicializando parametros
  Question(this.questionText);

  // Create custom constructor
  // você consegue ter diferentes tipos de constructor(dart feat)
  Question.defaultText() {
    this.questionText = "Default Text";
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        width: double.infinity, // pega a largura da tela
        margin: EdgeInsets.all(30), // usa a feat de custom constructor
        child: Text(
          questionText,
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 20),
        ));
  }
}

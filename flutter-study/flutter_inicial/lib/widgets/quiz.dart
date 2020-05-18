import 'package:flutter/material.dart';

import './question.dart';
import './answer.dart';

class Quiz extends StatelessWidget {
  final String questionText;
  final int questionIndex;
  final List<Map<String, Object>> possibleAnswers;
  final Function answerCallback;

  Quiz({
    @required this.questionText,
    @required this.questionIndex,
    @required this.possibleAnswers,
    @required this.answerCallback,
  });

  getListOfWidgets(index) {
    return (possibleAnswers).map((answer) {
      return Answer(answer['text'], () => answerCallback(answer['score']));
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Pergunta
        Question(questionText),
        // Respostas
        ...this.getListOfWidgets(this.questionIndex),
      ],
    );
  }
}

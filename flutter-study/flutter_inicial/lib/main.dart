import 'package:flutter/material.dart';

// Custom imports, widgets etc
import './widgets/quiz.dart';
import './widgets/result.dart';

void main() => runApp(MyApp());

// crtl shift r -- para transformar stateless to stateful
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final questions = const [
    {
      'questionText': 'Qual sua cor favorita?',
      'answers': [
        {'text': 'Verde', 'score': 10},
        {'text': 'Vermelho', 'score': 4},
        {'text': 'Preto', 'score': 5},
        {'text': 'Rosa', 'score': 20},
        {'text': 'Azul', 'score': 1},
      ],
    },
    {
      'questionText': 'Qual seu animal favorito?',
      'answers': [
        {'text': 'Gato', 'score': -20},
        {'text': 'Cachorro', 'score': 100},
        {'text': 'Vaca', 'score': 10},
        {'text': 'Carneiro', 'score': 50},
      ],
    },
    {
      'questionText': 'Qual sua comida favorita?',
      'answers': [
        {'text': 'Carne', 'score': 10},
        {'text': 'Mandioca', 'score': 25},
        {'text': 'Churrasco', 'score': 20},
        {'text': 'Não como', 'score': 0},
        {'text': 'Frutas', 'score': -10},
      ],
    },
    {
      'questionText': 'Qual sua faixa salarial?',
      'answers': [
        {'text': 'Menor que 10 reais', 'score': 1000},
        {'text': 'Menos que 10 reais', 'score': 100},
        {'text': '"Só" estudo', 'score': 10},
      ],
    }
  ];

  var _questionIndex = 0;
  var _totalScore = 0;

  void _answerQuestion(int score) {
    print("scorou $score");
    _totalScore += score;
    print("subtotal $_totalScore");

    if (_questionIndex < questions.length) {
      setState(() {
        _questionIndex++;
      });
    }
  }

  void _resetQuiz() {
    setState(() {
      _questionIndex = 0;
      _totalScore = 0;
    });
  }

  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My First App'),
        ),
        body: _questionIndex < questions.length
            ? Quiz(
                answerCallback: _answerQuestion,
                possibleAnswers: this.questions[_questionIndex]['answers'],
                questionIndex: _questionIndex,
                questionText: questions[_questionIndex]['questionText'],
              )
            : Result(
                resultScore: _totalScore,
                resetHandler: _resetQuiz,
              ),
      ),
    );
  }
}

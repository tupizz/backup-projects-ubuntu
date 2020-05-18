import 'package:flutter/material.dart';

class Answer extends StatelessWidget {
  final String _label;
  final Function _handleClick;

  Answer(this._label, this._handleClick);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: double.infinity,
        padding: EdgeInsets.fromLTRB(50, 2, 50, 2),
        child: RaisedButton(
          color: Colors.blue,
          textColor: Colors.white,
          child: Text(_label),
          onPressed: _handleClick,
        ));
  }
}

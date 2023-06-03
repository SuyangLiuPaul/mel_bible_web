import 'package:flutter/material.dart';

class BibleBody extends StatelessWidget {
  final AsyncSnapshot<void> snapshot;
  final List<dynamic> verses;
  final List<int> selectedIndices;
  final Function(int index) onVerseTap;

  BibleBody({
    required this.snapshot,
    required this.verses,
    required this.selectedIndices,
    required this.onVerseTap,
  });

  @override
  Widget build(BuildContext context) {
    if (snapshot.connectionState == ConnectionState.done) {
      if (verses.isEmpty) {
        return Center(
          child: Text('No Bibles found.'),
        );
      } else {
        return ListView.builder(
          itemCount: verses.length,
          itemBuilder: (BuildContext context, int index) {
            final verse = verses[index];
            return ListTile(
              tileColor: selectedIndices.contains(index)
                  ? Theme.of(context).primaryColor.withOpacity(0.2)
                  : null,
              title: Text(
                '${verse['verse']}. ${verse['text']}',
                style: TextStyle(
                  color: selectedIndices.contains(index)
                      ? Theme.of(context).primaryColor
                      : null,
                  backgroundColor: verse['highlightColor'] != null
                      ? Color(verse['highlightColor'])
                      : null,
                ),
              ),
              onTap: () => onVerseTap(index),
            );
          },
        );
      }
    } else {
      return Center(child: CircularProgressIndicator());
    }
  }
}

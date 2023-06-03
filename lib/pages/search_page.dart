import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter/services.dart';

class SearchPage extends StatefulWidget {
  final double fontSize;

  const SearchPage({Key? key, required this.fontSize}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}


class _SearchPageState extends State<SearchPage> {
  List<dynamic> _results = [];
  List<dynamic> _verses = [];

  List<String> bibleJsonFiles = [
    'assets/web.json',
    'assets/chinese_union_simp.json',
    'assets/chinese_union_trad.json',
    'assets/bible_simplified.json',
    'assets/bible_traditional.json',
  ];

  String _selectedVersion = 'All';
  String _selectedBook = 'All';
  int _selectedChapter = -1;

  List<String> _bookNames = [];
  List<int> _chapterNumbers = [];

  String _searchQuery = '';

  List<int> _selectedIndices = [];

  @override
  void initState() {
    super.initState();
    _fetchBibleVerses().then((verses) {
      setState(() {
        _verses = verses;
      });
      _populateBooksAndChapters();
    });
  }

  void _populateBooksAndChapters() {
    _bookNames =
        _verses.map((verse) => verse['book'] as String).toSet().toList();
    _chapterNumbers =
        _verses.map((verse) => verse['chapter'] as int).toSet().toList();
    _chapterNumbers.sort();
  }

  void _onSearchQueryChanged(String query) {
    _searchQuery = query;
  }

  void _onSearchPressed() {
    _executeSearch();
  }

  Future<List<dynamic>> _fetchBibleVerses() async {
    final bibleJsonData = await Future.wait([
      for (final file in bibleJsonFiles) rootBundle.loadString(file),
    ]);

    final List<dynamic> bibleData =
    bibleJsonData.map((jsonData) => json.decode(jsonData)).toList();

    final List<dynamic> verses = [];
    for (final bible in bibleData) {
      final shortname = bible['metadata']['shortname'];
      for (final book in bible['books']) {
        for (final verse in book['verses']) {
          verses.add({
            'shortname': shortname,
            'book': book['book_name'],
            'chapter': verse['chapter'],
            'verse': verse['verse'],
            'text': verse['text']
          });
        }
      }
    }

    return verses;
  }

  void _executeSearch() {
    List<dynamic> results = _verses.where((verse) {
      bool bookMatch = _selectedBook == 'All' || verse['book'] == _selectedBook;
      bool chapterMatch =
          _selectedChapter == -1 || verse['chapter'] == _selectedChapter;
      bool queryMatch =
      verse['text'].toLowerCase().contains(_searchQuery.toLowerCase());

      return bookMatch && chapterMatch && queryMatch;
    }).toList();

    setState(() {
      _results = results;
    });
  }

  Future<void> _copyVerses() async {
    String textToCopy = _selectedIndices.map((index) {
      final result = _results[index];
      return '${result['shortname']} (${result['book']} ${result['chapter']}:${result['verse']}) ${result['text']}';
    }).join('\n');

    await Clipboard.setData(ClipboardData(text: textToCopy));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Theme(
              data: ThemeData(
                canvasColor: Colors.black,
                textTheme: TextTheme(
                  subtitle1: TextStyle(color: Colors.white),
                ),
              ),
              child: DropdownButton<String>(
                value: _selectedBook,
                items: ['All', ..._bookNames].map((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedBook = newValue!;
                  });
                  _executeSearch();
                },
              ),
            ),
            SizedBox(width: 8),
            Theme(
              data: ThemeData(
                canvasColor: Colors.black,
                textTheme: TextTheme(
                  subtitle1: TextStyle(color: Colors.white),
                ),
              ),
              child: DropdownButton<int>(
                value: _selectedChapter,
                items: [-1, ..._chapterNumbers].map((int value) {
                  return DropdownMenuItem<int>(
                    value: value,
                    child: Text(value == -1 ? 'Chapter' : value.toString()),
                  );
                }).toList(),
                onChanged: (int? newValue) {
                  setState(() {
                    _selectedChapter = newValue!;
                  });
                  _executeSearch();
                },
              ),
            ),
          ],
        ),
      ),
      body: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: TextField(
              onChanged: _onSearchQueryChanged,
              onSubmitted: (_) => _onSearchPressed(),
              textInputAction: TextInputAction.search,
              decoration: InputDecoration(
                labelText: 'Search',
                suffixIcon: IconButton(
                  onPressed: _onSearchPressed,
                  icon: Icon(Icons.search),
                ),
              ),
              minLines: 1,
              maxLines: 3,
            ),
          ),
          Expanded(
            child: _results.isEmpty
                ? Center(
              child: Text('Select a book and/or chapter to view verses.'),
            )
                : ListView.builder(
              itemCount: _results.length,
              itemBuilder: (BuildContext context, int index) {
                final result = _results[index];
                return ListTile(
                  title: Text(
                    '${result['shortname']} (${result['book']} ${result['chapter']}:${result['verse']}) ${result['text']}',
                    style: TextStyle(
                      fontWeight: FontWeight.normal,
                      fontSize: widget.fontSize,
                    ),
                  ),
                  tileColor: _selectedIndices.contains(index)
                      ? Theme.of(context).primaryColor.withOpacity(0.2)
                      : null,
                  onTap: () {
                    setState(() {
                      if (_selectedIndices.contains(index)) {
                        _selectedIndices.remove(index);
                      } else {
                        _selectedIndices.add(index);
                      }
                    });
                  },
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: _selectedIndices.isEmpty
          ? null
          : FloatingActionButton(
        onPressed: () {
          _copyVerses();
          setState(() {
            _selectedIndices.clear();
          });
        },
        tooltip: 'Copy',
        child: Icon(Icons.copy),
      ),
    );
  }
}
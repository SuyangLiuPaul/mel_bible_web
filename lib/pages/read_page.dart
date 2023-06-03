import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart'
    show rootBundle, Clipboard, ClipboardData;
import '../services/preferences_service.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:mel_bible/widgets/custom_dropdown.dart';

class ReadPage extends StatefulWidget {
  final double fontSize;
  final ValueChanged<double> onFontSizeChange; // Add this line

  ReadPage({required this.fontSize, required this.onFontSizeChange}); // Update this line

  @override
  _ReadPageState createState() => _ReadPageState();
}

class _ReadPageState extends State<ReadPage> {
  Set<int> _selectedIndices = Set<int>();
  List<Map<String, dynamic>> _selectedVerses = [];
  List<Map<String, dynamic>> _bibles = [];
  List<String> _versionList = [];
  List<String> _bookList = [];
  String _selectedVersion = 'WEB Version';
  int _selectedChapter = 1;
  String? _selectedBook = 'Genesis';
  List<int> _chapterList = List.generate(50, (i) => i + 1);
  List<dynamic> _verses = [];
  double _verseFontSize = 16.0;
  Map<int, int> _highlightedVerses = {};
  List<Color> _highlightColors = [
    Colors.yellow,
    Colors.green,
    Colors.blue,
    Colors.pink,
    Colors.orange,
  ];
  double _fontSize = 16.0;

  Color _highlightColor = Colors.yellow;
  final GlobalKey _currentPageKey = GlobalKey();

  final _preferencesService = PreferencesService();
  final _pageController = PageController();

  late Future<void> _fetchBiblesFuture;

  bool _versionSelected = false;

  bool _highlightIconVisible = false;
  bool _copyIconVisible = false;

  @override
  void initState() {
    super.initState();
    _fetchBiblesFuture = _loadPreferencesAndFetchBibles().then((_) {
      _fetchBibles();
      _updateVerses();
    });
  }

  void _changeFontSize(double newSize) {
    setState(() {
      _fontSize = newSize;
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _versionSelected = true;
  }

  void _updateVerses() {
    if (_bibles.isEmpty) {
      return;
    }
    _fetchVerses().then((verses) {
      setState(() {
        _verses = verses;
      });
    });
  }

  void _onSwipe(int pageIndex) {
    if (pageIndex > _selectedChapter - 1) {
      if (_selectedChapter < _chapterList.length) {
        _pageController.nextPage(
          duration: Duration(milliseconds: 400),
          curve: Curves.easeInOut,
        );
      }
    } else {
      if (_selectedChapter > 1) {
        _pageController.previousPage(
          duration: Duration(milliseconds: 400),
          curve: Curves.easeInOut,
        );
      }
    }
  }

  void _handleCopyIconPressed() {
    _selectedVerses = [];
    List<int> sortedIndices = _selectedIndices.toList()
      ..sort(); // Sort the indices
    for (int index in sortedIndices) {
      _selectedVerses.add(_verses[index]);
    }
    String versesToCopy = _selectedVerses
        .map<String>((verse) =>
    '(${_selectedBook}${verse['chapter']}:${verse['verse']}) ${verse['text']}')
        .join('\n');
    Clipboard.setData(ClipboardData(text: versesToCopy));

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Selected verses copied to clipboard.'),
      ),
    );
    WidgetsBinding.instance.addPostFrameCallback((_) {
      setState(() {
        _highlightIconVisible = false;
        _copyIconVisible = false;
        _selectedIndices.clear();
      });
    });
  }

  Future<void> _loadPreferencesAndFetchBibles() async {
    PreferencesService _preferencesService = PreferencesService();
    double? fontSize = await _preferencesService.loadFontSize();
    if (fontSize != null) {
      _changeFontSize(fontSize);
    }
    String? loadedVersion = await _preferencesService.loadSelectedVersion();
    await _fetchBibles();

    _versionList = _bibles
        .map<String>((bible) => '${bible['metadata']['shortname']}')
        .toList();
    _selectedVersion = loadedVersion ?? _versionList.first;

    _bookList = _bibles
        .firstWhere((bible) =>
    bible['metadata']['shortname'] == _selectedVersion)['books']
        .map<String>((book) => book['metadata']['shortname'])
        .toList();
    _selectedBook = await _preferencesService.loadSelectedBook();
    _selectedBook = _selectedBook ?? _bookList.first;

    _chapterList = List.generate(
        int.parse(_bibles.first['metadata']['chapters']['1']),
            (i) => i + 1);
    _selectedChapter = await _preferencesService.loadSelectedChapter() ?? 1;

    _highlightedVerses = await _preferencesService.loadHighlightedVerses();

    setState(() {});
  }

  Future<void> _fetchBibles() async {
    final List<String> bibleJsonFiles = [
      'assets/web.json',
      'assets/chinese_union_simp.json',
      'assets/chinese_union_trad.json',
      'assets/bible_simplified.json',
      'assets/bible_traditional.json',
    ];

    for (String jsonFile in bibleJsonFiles) {
      String jsonString = await rootBundle.loadString(jsonFile);
      Map<String, dynamic> jsonData = json.decode(jsonString);
      _bibles.add(jsonData);
    }

    setState(() {
      _versionList = _bibles
          .map<String>((bible) => '${bible['metadata']['shortname']}')
          .toList();
      _selectedVersion = _versionList.first;

      _bookList = _bibles
          .firstWhere((bible) =>
      bible['metadata']['shortname'] == _selectedVersion)['books']
          .map<String>((book) => book['book_name'] as String)
          .toList();

      _selectedBook = _bookList.first;

      final chapterList = _bibles
          .firstWhere((bible) =>
      bible['metadata']['shortname'] == _selectedVersion)['books']
          .firstWhere((book) => book['book_name'] == _selectedBook)['verses']
          .map<int>((verse) => verse['chapter'])
          .toSet()
          .toList();
      _chapterList = chapterList;
      _selectedChapter = _chapterList.first;
    });

    _updateVerses();
  }

  void _onVersionChanged(String? newVersion) {
    if (newVersion == null) return;

    setState(() {
      _selectedVersion = newVersion;
      _versionSelected = true;

      final bible = _bibles.firstWhere(
              (bible) => bible['metadata']['shortname'] == _selectedVersion,
          orElse: () => {'books': []});

      if (bible.isNotEmpty) {
        List<String> newBookList = bible['books']
            .map<String>((book) => book['book_name'] as String)
            .toList();

        // Get the book number of the selected book
        final selectedBookNumber = _selectedBook != null
            ? bible['books'].firstWhere(
                (book) => book['book_name'] == _selectedBook,
            orElse: () => {'book': -1})['book']
            : -1;

        if (selectedBookNumber != -1) {
          // Keep the current book
          _bookList = newBookList;
        } else {
          // If the current book is not present in the new version, set the first book as the selected book
          _bookList = newBookList;
          _selectedBook = _bookList.first;
        }

        final chaptersInBook = bible['books'].firstWhere(
                (book) => book['book_name'] == _selectedBook,
            orElse: () => {'verses': []});

        if (chaptersInBook.isNotEmpty) {
          _chapterList = chaptersInBook['verses']
              .map<int>((verse) => verse['chapter'] as int)
              .toSet()
              .toList();

          // Check if the current chapter is present in the new version
          if (_chapterList.contains(_selectedChapter)) {
            // Keep the current chapter
          } else {
            // If the current chapter is not present in the new version, set the first chapter as the selected chapter
            _selectedChapter = _chapterList.first;
          }
        }
      }
    });
    _updateVerses();

    PreferencesService().saveSelectedVersion(newVersion);

  }

  void _onBookChanged(String? newBook) {
    if (newBook == null) return;

    setState(() {
      _selectedBook = newBook;

      final bible = _bibles.firstWhere(
              (bible) => bible['metadata']['shortname'] == _selectedVersion,
          orElse: () => {'books': []});

      if (bible.isNotEmpty) {
        final chaptersInBook = bible['books'].firstWhere(
                (book) => book['book_name'] == _selectedBook,
            orElse: () => {'verses': []});

        if (chaptersInBook.isNotEmpty) {
          _chapterList = chaptersInBook['verses']
              .map<int>((verse) => verse['chapter'] as int)
              .toSet()
              .toList();

          _selectedChapter = _chapterList.first;
        }
      }
    });
    _updateVerses();

    PreferencesService().saveSelectedBook(newBook);

  }

  void _onChapterChanged(int? newChapter) {
    if (newChapter == null) return;

    setState(() {
      _selectedChapter = newChapter;
      _pageController.jumpToPage(newChapter - 1);  // Add this line
    });

    _updateVerses();
    PreferencesService().saveSelectedChapter(newChapter);
  }

  Future<List<dynamic>> _fetchVerses() async {
    final book = _bibles
        .firstWhere((bible) =>
    bible['metadata']['shortname'] == _selectedVersion)['books']
        .firstWhere((book) => book['book_name'] == _selectedBook,
        orElse: () => {});
    final List<dynamic> verses = book['verses']
        .where((verse) => verse['chapter'] == _selectedChapter)
        .toList();
    return verses;
  }

  void _handleHighlightColorSelected(Color? color) {
    if (color == null) {
      for (int index in _selectedIndices) {
        setState(() {
          _verses[index]['highlightColor'] = null;
        });
      }
    } else {
      for (int index in _selectedIndices) {
        setState(() {
          _verses[index]['highlightColor'] = color.value;
        });
      }
    }
    setState(() {
      _highlightIconVisible = false;
      _copyIconVisible = false;
      _selectedIndices.clear();
    });
  }

  void _handleHighlightIconPressed() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return AlertDialog(
              title: const Text('Select a color'),
              content: SingleChildScrollView(
                child: Column(
                  children: [
                    BlockPicker(
                      pickerColor: _highlightColor,
                      onColorChanged: (Color color) {
                        setState(() {
                          _highlightColor = color;
                        });
                      },
                    ),
                    TextButton(
                      onPressed: () {
                        _handleHighlightColorSelected(null);
                        Navigator.of(context).pop(); // Close the window
                      },
                      child: const Text('Clear'),
                    ),
                  ],
                ),
              ),
              actions: <Widget>[
                TextButton(
                  onPressed: () {
                    _handleHighlightColorSelected(_highlightColor);
                    Navigator.of(context).pop();
                  },
                  child: const Text('Apply'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('Close'),
                ),
              ],
            );
          },
        );
      },
    ).then((_) {
      setState(() {
        _highlightIconVisible = false;
        _copyIconVisible = false;
        _selectedIndices.clear();
      });
    });
  }

  void _nextChapter() {
    if (_selectedChapter < _chapterList.length) {
      _pageController.nextPage(
        duration: Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    }
  }

  void _previousChapter() {
    if (_selectedChapter > 1) {
      _pageController.previousPage(
        duration: Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    }
  }


  void _onPageChanged(int pageIndex) {
    setState(() {
      _selectedChapter = pageIndex + 1;
    });
    _updateVerses();

  }

  void _handleSettingsIconPressed() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Font size'),
          content: StatefulBuilder(
            builder: (BuildContext context, StateSetter setState) {
              return Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                    icon: Icon(Icons.remove),
                    onPressed: () {
                      setState(() {
                        if (_fontSize > 5) {
                          _fontSize -= 1;
                          widget.onFontSizeChange(_fontSize); // Add this line
                        }
                      });
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: Text(
                      _fontSize.toStringAsFixed(0),
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.add),
                    onPressed: () {
                      setState(() {
                        if (_fontSize < 38) {
                          _fontSize += 1;
                          widget.onFontSizeChange(_fontSize); // Add this line
                        }
                      });
                    },
                  ),
                ],
              );
            },
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('OK'),
              onPressed: () {
                widget.onFontSizeChange(_fontSize);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          Expanded(
            child: Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                    // Add the Settings icon
                    icon: Icon(Icons.settings),
                    onPressed: _handleSettingsIconPressed,
                  ),
                  Theme(
                    data: Theme.of(context).copyWith(
                      textTheme: Theme.of(context).textTheme.copyWith(
                        subtitle1: TextStyle(
                          color:
                          Theme.of(context).appBarTheme.foregroundColor,
                        ),
                      ),
                    ),
                    child: Center(
                      child: CustomDropdown<String>(
                        value: _selectedVersion,
                        items: _versionList,
                        onChanged: _onVersionChanged,
                        selectedItemBuilder: (BuildContext context) {
                          return _versionList.map<Widget>((String version) {
                            return Text(
                              version,
                              style: TextStyle(color: Colors.white),
                            );
                          }).toList();
                        },
                        itemToString: (String version) => version,
                      ),
                    ),
                  ),
                  Theme(
                    data: Theme.of(context).copyWith(
                      textTheme: Theme.of(context).textTheme.copyWith(
                        subtitle1: TextStyle(
                          color:
                          Theme.of(context).appBarTheme.foregroundColor,
                        ),
                      ),
                    ),
                    child: Center(
                      child: CustomDropdown<String>(
                        value: _selectedBook!,
                        items: _bookList,
                        onChanged: _onBookChanged,
                        selectedItemBuilder: (BuildContext context) {
                          return _bookList.map<Widget>((String book) {
                            return Text(
                              book,
                              style: TextStyle(color: Colors.white),
                            );
                          }).toList();
                        },
                        itemToString: (String book) => book,
                      ),
                    ),
                  ),
                  Theme(
                    data: Theme.of(context).copyWith(
                      textTheme: Theme.of(context).textTheme.copyWith(
                        subtitle1: TextStyle(
                          color:
                          Theme.of(context).appBarTheme.foregroundColor,
                        ),
                      ),
                    ),
                    child: CustomDropdown<int>(
                      value: _selectedChapter,
                      items: _chapterList,
                      onChanged: _onChapterChanged,
                      selectedItemBuilder: (BuildContext context) {
                        return _chapterList.map<Widget>((int chapter) {
                          return Text(
                            chapter.toString(),
                            style: TextStyle(color: Colors.white),
                          );
                        }).toList();
                      },
                      itemToString: (int chapter) => chapter.toString(),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      body: FutureBuilder(
        future: _fetchBiblesFuture,
        builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (_versionList.isEmpty) {
              return Center(
                child: Text('No Bibles found.'),
              );
            } else {
              return PageView.builder(
                controller: _pageController,
                onPageChanged: (int pageIndex) {
                  _onPageChanged(pageIndex);
                },
                itemBuilder: (BuildContext context, int pageIndex) {
                  return GestureDetector(
                    onHorizontalDragEnd: (DragEndDetails details) {
                      if (details.primaryVelocity! < 0) {
                        _nextChapter();
                      } else if (details.primaryVelocity! > 0) {
                        _previousChapter();
                      }
                    },
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Expanded(
                            child: ScrollConfiguration(
                              behavior: ScrollConfiguration.of(context).copyWith(scrollbars: true),
                              child: ListView.builder(
                                itemCount: _verses.length,
                                itemBuilder: (BuildContext context, int index) {
                                  final verse = _verses[index];
                                  return ListTile(
                                    tileColor: _selectedIndices.contains(index)
                                        ? Theme.of(context)
                                        .primaryColor
                                        .withOpacity(0.2)
                                        : null,
                                    title: Text(
                                      '${verse['verse']}. ${verse['text']}',
                                      style: TextStyle(
                                        fontSize: widget.fontSize, // Use widget.fontSize here
                                        color: _selectedIndices.contains(index)
                                            ? Theme.of(context).primaryColor
                                            : null,
                                        backgroundColor:
                                        verse['highlightColor'] != null
                                            ? Color(verse['highlightColor'])
                                            : null,
                                      ),
                                    ),
                                    onTap: () {
                                      setState(() {
                                        if (_selectedIndices.contains(index)) {
                                          _selectedIndices.remove(index);
                                        } else {
                                          _selectedIndices.add(index);
                                        }
                                        _highlightIconVisible =
                                            _selectedIndices.isNotEmpty;
                                        _copyIconVisible =
                                            _selectedIndices.isNotEmpty;
                                      });
                                    },
                                  );
                                },
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              );
            }
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: _selectedIndices.isEmpty
          ? null
          : Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: _handleCopyIconPressed,
            tooltip: 'Copy',
            child: Icon(Icons.copy),
          ),
          SizedBox(width: 10),
          FloatingActionButton(
            onPressed: _handleHighlightIconPressed,
            tooltip: 'Highlight',
            child: Icon(Icons.format_color_fill),
          ),
        ],
      ),
    );
  }

}
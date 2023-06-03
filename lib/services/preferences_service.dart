import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class PreferencesService {
  static const String _fontSizeKey = 'fontSize';
  static const String _selectedVersionKey = 'selectedVersion';
  static const String _selectedBookKey = 'selectedBook';
  static const String _selectedChapterKey = 'selectedChapter';
  static const String _highlightedVersesKey = 'highlightedVerses';

  Future<void> saveFontSize(double fontSize) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble(_fontSizeKey, fontSize);
  }

  Future<double> loadFontSize() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getDouble(_fontSizeKey) ?? 16.0;
  }

  Future<void> saveSelectedVersion(String version) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_selectedVersionKey, version);
  }

  Future<String?> loadSelectedVersion() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_selectedVersionKey);
  }

  Future<void> saveSelectedBook(String book) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_selectedBookKey, book);
  }

  Future<String?> loadSelectedBook() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_selectedBookKey);
  }

  Future<void> saveSelectedChapter(int chapter) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_selectedChapterKey, chapter);
  }

  Future<int?> loadSelectedChapter() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_selectedChapterKey);
  }

  Future<void> saveHighlightedVerses(Map<int, int> highlightedVerses) async {
    final prefs = await SharedPreferences.getInstance();
    String jsonString = jsonEncode(highlightedVerses);
    await prefs.setString(_highlightedVersesKey, jsonString);
  }

  Future<Map<int, int>> loadHighlightedVerses() async {
    final prefs = await SharedPreferences.getInstance();
    String? jsonString = prefs.getString(_highlightedVersesKey);
    if (jsonString == null) {
      return {};
    } else {
      Map<String, dynamic> jsonMap = jsonDecode(jsonString);
      return jsonMap.map((key, value) => MapEntry(int.parse(key), value));
    }
  }
}

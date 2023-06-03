import 'chapter.dart';

class Book {
  final String title;
  final List<Chapter> chapters;

  Book({required this.title, required this.chapters});

  factory Book.fromMap(Map<String, dynamic> map) {
    List<dynamic> chaptersData = map['chapters'];
    List<Chapter> chapters = chaptersData.map<Chapter>((chapter) => Chapter.fromMap(chapter)).toList();

    return Book(
      title: map['title'],
      chapters: chapters,
    );
  }
}

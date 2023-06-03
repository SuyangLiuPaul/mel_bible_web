class Chapter {
  final String title;
  final String content;

  Chapter({required this.title, required this.content});

  factory Chapter.fromMap(Map<String, dynamic> map) {
    return Chapter(
      title: map['title'],
      content: map['content'],
    );
  }
}

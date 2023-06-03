import 'package:flutter/material.dart';
import 'package:mel_bible/widgets/custom_navigation_bar.dart';
import 'pages/read_page.dart';
import 'pages/search_page.dart';
import 'pages/welcome_page.dart';
import 'pages/loading_page.dart';
import '../services/preferences_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final preferencesService = PreferencesService();
  double? fontSize = await preferencesService.loadFontSize();
  runApp(MyApp(fontSize: 16));
}

class MyApp extends StatelessWidget {
  final double fontSize;

  MyApp({required this.fontSize});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: FutureBuilder(
        future: Future.delayed(Duration(seconds: 1)),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return LoadingPage();
          } else {
            return MainPage(initialFontSize: fontSize);
          }
        },
      ),
    );
  }
}

class MainPage extends StatefulWidget {
  final double initialFontSize;

  MainPage({required this.initialFontSize});

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentIndex = 0;
  late double _currentFontSize;

  @override
  void initState() {
    super.initState();
    _currentFontSize = widget.initialFontSize;
  }

  void _handleFontSizeChange(double newFontSize) {
    setState(() {
      _currentFontSize = newFontSize;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: [
          WelcomePage(onNavigate: (index) => setState(() => _currentIndex = index)),
          ReadPage(fontSize: _currentFontSize, onFontSizeChange: _handleFontSizeChange),
          SearchPage(fontSize: _currentFontSize),
        ],
      ),
      bottomNavigationBar: CustomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
      ),
    );
  }
}

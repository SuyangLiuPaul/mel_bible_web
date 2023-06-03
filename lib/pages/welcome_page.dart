import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class WelcomePage extends StatelessWidget {
  final Function(int) onNavigate;

  WelcomePage({required this.onNavigate});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              InkWell(
                onTap: () => launch('https://christiandiscipleschurch.org/'),
                child: SizedBox(
                  width: double.infinity,
                  child: Image.asset('assets/logo.jpg'),
                ),
              ),
              InkWell(
                onTap: () => launch('https://christiandiscipleschurch.org/'),
                child: SizedBox(
                  width: double.infinity,
                  child: Image.asset('assets/mountain.jpg'),
                ),
              ),
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => onNavigate(1),
                      child: Text('Read', style: TextStyle(fontSize: 24)),
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: 30),
                        minimumSize: Size(200, 0),
                      ),
                    ),
                  ),
                  SizedBox(height: 100),
                  SizedBox(width: 20),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => onNavigate(2),
                      child: Text('Search', style: TextStyle(fontSize: 24)),
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: 30),
                        minimumSize: Size(200, 0),
                      ),
                    ),
                  ),
                ],
              ),


              SizedBox(height: 10),
              InkWell(
                onTap: () => launch('https://goo.gl/maps/sFvofYyvmvmxEDwZA?coh=178572&entry=tt'),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.map),
                    SizedBox(width: 5),
                    Text('Visit us'),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
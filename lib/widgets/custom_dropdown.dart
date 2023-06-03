import 'package:flutter/material.dart';

class CustomDropdown<T> extends StatelessWidget {
  final T value;
  final List<T> items;
  final ValueChanged<T?>? onChanged;
  final List<Widget> Function(BuildContext)? selectedItemBuilder;
  final String Function(T) itemToString;

  const CustomDropdown({
    Key? key,
    required this.value,
    required this.items,
    this.onChanged,
    this.selectedItemBuilder,
    required this.itemToString,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IntrinsicWidth(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.only(left: 0, top: 18, right: 1, bottom: 0),
          child: DropdownButtonHideUnderline(
            child: ScrollConfiguration(
              behavior: ScrollConfiguration.of(context).copyWith(scrollbars: true),
              child: DropdownButton<T>(
                value: value,
                items: items.map<DropdownMenuItem<T>>(
                      (T item) {
                    return DropdownMenuItem<T>(
                      value: item,
                      child: Text(
                        itemToString(item),
                        style: TextStyle(color: Colors.black),
                      ),
                    );
                  },
                ).toList(),
                onChanged: onChanged,
                selectedItemBuilder: selectedItemBuilder,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

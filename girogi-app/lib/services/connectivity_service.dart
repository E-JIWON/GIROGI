import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';

class ConnectivityService {
  final Connectivity _connectivity = Connectivity();
  late StreamSubscription<List<ConnectivityResult>> _subscription;

  bool _isOnline = true;
  bool get isOnline => _isOnline;

  final StreamController<bool> _controller = StreamController<bool>.broadcast();
  Stream<bool> get onStatusChange => _controller.stream;

  Future<void> init() async {
    final results = await _connectivity.checkConnectivity();
    _isOnline = !results.contains(ConnectivityResult.none);

    _subscription = _connectivity.onConnectivityChanged.listen((results) {
      final online = !results.contains(ConnectivityResult.none);
      if (_isOnline != online) {
        _isOnline = online;
        _controller.add(online);
      }
    });
  }

  void dispose() {
    _subscription.cancel();
    _controller.close();
  }
}

/// Mock 일일 기록 Repository
///
/// 개발 단계에서 사용하는 가짜 데이터 저장소입니다.
/// 메모리 내 Map으로 데이터를 관리하며, 앱 재시작 시 초기화됩니다.
///
/// TODO: 실제 DB 연동 시 다음으로 전환
/// - Hive: lib/data/repositories/hive_daily_record_repository.dart
/// - SQLite: lib/data/repositories/sqlite_daily_record_repository.dart
/// - Firebase: lib/data/repositories/firebase_daily_record_repository.dart
library;

import 'package:girogi/data/models/daily_record.dart';
import 'package:girogi/data/models/enums.dart';
import 'package:girogi/data/models/meal_record.dart';
import 'package:girogi/data/repositories/daily_record_repository.dart';

/// Mock 일일 기록 Repository 구현체
///
/// 메모리 기반 임시 저장소로, 앱 재시작 시 데이터가 소실됩니다.
class MockDailyRecordRepository implements DailyRecordRepository {
  /// 메모리 내 데이터 저장소
  /// Key: 날짜 문자열 (yyyy-MM-dd), Value: DailyRecord
  final Map<String, DailyRecord> _records = {};

  /// 생성자 - 샘플 데이터 초기화
  MockDailyRecordRepository() {
    _initializeSampleData();
  }

  /// 샘플 데이터 초기화
  ///
  /// 앱 실행 시 테스트용 데이터를 생성합니다.
  /// 최근 7일간의 데이터를 생성하여 UI 테스트를 지원합니다.
  void _initializeSampleData() {
    final now = DateTime.now();

    // 최근 7일간의 샘플 데이터 생성
    for (int i = 0; i < 7; i++) {
      final date = now.subtract(Duration(days: i));
      final dateKey = _formatDateKey(date);

      _records[dateKey] = DailyRecord(
        id: 'record_$i',
        date: date,
        checklist: {
          'morning_water': i < 5, // 5일은 성공
          'lunch_salad': i < 4,
          'lunch_chew': i < 6,
          'afterwork_fruit': i < 5, // 핵심 미션
          'dinner_small_bowl': i < 4, // 핵심 미션
          'dinner_no_tv': i < 6,
          'dinner_chew': i < 5,
          'exercise_boxing': i == 0 || i == 3, // 핵심 미션
          'exercise_squat': i == 1 || i == 2,
        },
        meals: [
          MealRecord(
            id: 'meal_${i}_lunch',
            mealTime: MealTime.lunch,
            place: MealPlace.cafeteria,
            menu: '제육볶음, 밥',
            createdAt: date.add(const Duration(hours: 12)),
          ),
          MealRecord(
            id: 'meal_${i}_dinner',
            mealTime: MealTime.dinner,
            place: MealPlace.home,
            menu: '된장찌개, 계란',
            createdAt: date.add(const Duration(hours: 19)),
          ),
        ],
        exercise: i < 4 ? ExerciseType.boxing : ExerciseType.minimal,
        isSuccessDay: i < 5, // 최근 5일은 성공
        hadBinge: false,
        temptationResisted: i % 2, // 0, 1, 0, 1, ...
      );
    }
  }

  /// 날짜를 키 문자열로 변환
  ///
  /// [date]: DateTime 객체
  /// 반환: "yyyy-MM-dd" 형식의 문자열
  String _formatDateKey(DateTime date) {
    return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  }

  @override
  Future<DailyRecord?> getRecordByDate(DateTime date) async {
    // TODO: 실제 DB 조회로 전환
    // await _database.query('daily_records', where: 'date = ?', whereArgs: [date]);

    final dateKey = _formatDateKey(date);
    return _records[dateKey];
  }

  @override
  Future<List<DailyRecord>> getRecordsByDateRange(
    DateTime startDate,
    DateTime endDate,
  ) async {
    // TODO: 실제 DB 범위 조회로 전환
    // await _database.query('daily_records',
    //   where: 'date BETWEEN ? AND ?',
    //   whereArgs: [startDate, endDate]);

    final results = <DailyRecord>[];
    for (var record in _records.values) {
      if (record.date.isAfter(startDate.subtract(const Duration(days: 1))) &&
          record.date.isBefore(endDate.add(const Duration(days: 1)))) {
        results.add(record);
      }
    }
    // 날짜 오름차순 정렬
    results.sort((a, b) => a.date.compareTo(b.date));
    return results;
  }

  @override
  Future<DailyRecord> createRecord(DailyRecord record) async {
    // TODO: 실제 DB 삽입으로 전환
    // await _database.insert('daily_records', record.toJson());

    final dateKey = _formatDateKey(record.date);
    _records[dateKey] = record;
    return record;
  }

  @override
  Future<DailyRecord> updateRecord(DailyRecord record) async {
    // TODO: 실제 DB 업데이트로 전환
    // await _database.update('daily_records', record.toJson(),
    //   where: 'id = ?', whereArgs: [record.id]);

    final dateKey = _formatDateKey(record.date);
    _records[dateKey] = record;
    return record;
  }

  @override
  Future<void> deleteRecord(String id) async {
    // TODO: 실제 DB 삭제로 전환
    // await _database.delete('daily_records', where: 'id = ?', whereArgs: [id]);

    _records.removeWhere((key, record) => record.id == id);
  }

  @override
  Future<List<DailyRecord>> getRecentRecords(int days) async {
    // TODO: 실제 DB 조회로 전환
    // await _database.query('daily_records',
    //   orderBy: 'date DESC', limit: days);

    final now = DateTime.now();
    final startDate = now.subtract(Duration(days: days - 1));
    return getRecordsByDateRange(startDate, now);
  }

  @override
  Future<int> calculateCurrentStreak() async {
    // TODO: 실제 DB 쿼리 최적화 고려
    // 역순으로 조회하여 첫 실패 지점까지만 카운트

    final recentRecords = await getRecentRecords(365); // 최대 1년
    int streak = 0;

    // 최신 날짜부터 역순으로 확인
    for (int i = recentRecords.length - 1; i >= 0; i--) {
      final record = recentRecords[i];
      if (record.isSuccessDay && !record.hadBinge) {
        streak++;
      } else {
        break; // 실패한 날을 만나면 종료
      }
    }

    return streak;
  }

  @override
  Future<double> calculateWeeklySuccessRate(DateTime weekStart) async {
    // TODO: 실제 DB 집계 쿼리로 전환
    // SELECT COUNT(*) WHERE isSuccessDay = true AND date BETWEEN ...

    final weekEnd = weekStart.add(const Duration(days: 6));
    final weekRecords = await getRecordsByDateRange(weekStart, weekEnd);

    if (weekRecords.isEmpty) return 0.0;

    final successCount =
        weekRecords.where((r) => r.isSuccessDay && !r.hadBinge).length;
    return successCount / weekRecords.length;
  }
}

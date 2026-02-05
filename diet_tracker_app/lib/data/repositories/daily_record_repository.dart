/// 일일 기록 Repository
///
/// 일일 기록 데이터의 CRUD 작업을 추상화하는 인터페이스입니다.
/// Clean Architecture의 Repository 패턴을 적용하여 데이터 소스를 추상화합니다.
library;

import 'package:diet_tracker_app/data/models/daily_record.dart';

/// 일일 기록 Repository 인터페이스
///
/// 데이터 소스(Mock/Hive/SQLite/Firebase)에 독립적인 추상 계층입니다.
abstract class DailyRecordRepository {
  /// 특정 날짜의 일일 기록 조회
  ///
  /// [date]: 조회할 날짜
  /// 반환: 해당 날짜의 DailyRecord, 없으면 null
  Future<DailyRecord?> getRecordByDate(DateTime date);

  /// 날짜 범위의 일일 기록 목록 조회
  ///
  /// [startDate]: 시작 날짜
  /// [endDate]: 종료 날짜
  /// 반환: 기간 내 DailyRecord 목록
  Future<List<DailyRecord>> getRecordsByDateRange(
    DateTime startDate,
    DateTime endDate,
  );

  /// 일일 기록 생성
  ///
  /// [record]: 생성할 DailyRecord
  /// 반환: 생성된 DailyRecord
  Future<DailyRecord> createRecord(DailyRecord record);

  /// 일일 기록 수정
  ///
  /// [record]: 수정할 DailyRecord
  /// 반환: 수정된 DailyRecord
  Future<DailyRecord> updateRecord(DailyRecord record);

  /// 일일 기록 삭제
  ///
  /// [id]: 삭제할 기록 ID
  Future<void> deleteRecord(String id);

  /// 최근 N일간의 기록 조회
  ///
  /// [days]: 조회할 일수
  /// 반환: 최근 N일간의 DailyRecord 목록
  Future<List<DailyRecord>> getRecentRecords(int days);

  /// 연속 성공 일수 계산
  ///
  /// 가장 최근 날짜부터 역순으로 성공 일수를 카운트합니다.
  /// 반환: 현재 연속 성공 일수
  Future<int> calculateCurrentStreak();

  /// 주간 성공률 계산
  ///
  /// [weekStart]: 주의 시작 날짜 (월요일)
  /// 반환: 0.0 ~ 1.0 사이의 성공률
  Future<double> calculateWeeklySuccessRate(DateTime weekStart);
}

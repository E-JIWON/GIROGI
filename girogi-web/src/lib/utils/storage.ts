/** @desc localStorage 안전 래퍼 함수 */

/**
 * localStorage에서 값을 안전하게 읽기
 */
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * localStorage에 값을 안전하게 저장
 */
export const saveToStorage = <T>(key: string, value: T): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * localStorage에서 값을 안전하게 삭제
 */
export const removeFromStorage = (key: string): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * localStorage를 안전하게 초기화
 */
export const clearStorage = (): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

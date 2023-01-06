interface ErrorPatternValue<T> {
  value: T;
  message: string;
}

interface ErrorCondition {
  required: ErrorPatternValue<boolean>;
  pattern?: ErrorPatternValue<RegExp>;
  validate?: (value: string) => string | true;
  minLength?: ErrorPatternValue<number>;
  maxLength?: ErrorPatternValue<number>;
}

export const emailErrorPatterns: ErrorCondition = {
  required: { value: true, message: '' },
  pattern: {
    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,}/i,
    message: '올바른 이메일 형식이 아닙니다!',
  },
};

export const passwordErrorPatterns: ErrorCondition = {
  required: { value: true, message: '' },
  pattern: {
    value: /^[A-za-z0-9]{10,16}$/,
    message: '영어/숫자를 포함하여 10-16자로 입력해주세요!',
  },
};
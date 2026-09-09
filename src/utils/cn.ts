/** 조건부 클래스 이름을 합친다. false/undefined/null 은 걸러낸다. */
export const cn = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

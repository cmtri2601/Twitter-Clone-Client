/* eslint-disable @typescript-eslint/no-explicit-any */
export type PositiveInteger<T extends number> = `${T}` extends
  | '0'
  | `-${any}`
  | `${any}.${any}`
  ? never
  : T;

// func
function test<T extends number>(n: PositiveInteger<T>) {
  console.log(n);
}

type TestType<T extends number> = {
  s: string;
  p: PositiveInteger<T>;
};

// comp
const testComp = <T extends number>(props: TestType<T>) => {
  console.log(props.p);
};

// valid
test(12);
const validVar = 11;
test(validVar);
testComp({ s: '1', p: 1 });

// invalid
// test(-12);
// test(0);
// test(0.5);
// test(-0.5);
// const invalidVar = -11;
// test(invalidVar);
// testComp({ s: '1', p: -11 });
// testComp({ s: '1', p: 0.5 });

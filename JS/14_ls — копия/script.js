function a() {
  let count = 0;
  return function b() {
    count++;
    console.log(count);
  }()
  b();
}
a();
a();
a();

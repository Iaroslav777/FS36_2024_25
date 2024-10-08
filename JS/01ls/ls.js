 document.write("<h4>var, let, const:</h4>")
 document.write("var – ключове слово для оголошення змінної, не має блочноі області відимості та її можна повторно оголощувати, - що призводить до плутанини,змінні var бувають глобальні та по всій функціі відни, можуть повторно оголошуватись та змінювати значення.<br>");
 document.write("let – більш сучасний спосіб оголошення змінних з блочною областю видимості. Змінні, оголошені через let, не можуть бути повторно оголошені в тій самій області видимості.<br>");
 document.write("const – це ключове слово для оголошення констант, значення яких не може бути змінене після ініціалізації. Константи також мають блочну область видимості.<br><br>");
 document.write("<h4>Декларація та ініціалізація:</h4>");
 document.write("Декларація – це процес оголошення змінної, ініціалізація – це присвоєння значення змінній");



 var v1 = 123;
 var v2 = "Hello";
 var v3 = 456;
 var v4 = "JS";
 var v5 = 789;

 let l1 = "Yaroslav";
 let l2 = 100;
 let l3 = "bass guitar";
 let l4 = "jazz";
 let l5 = "JavaScript";

 const C1 = 9999;
 const C2 = 8888;
 const C3 = 7777;
 const C4 = 6666;
 const C5 = "Developer";

 console.log(v1, v2, v3, v4, v5);
 console.log(l1, l2, l3, l4, l5);
 console.log(C1, C2, C3, C4, C5);

 document.write("<h4>var, let, const:</h4>");
 document.write("v1: " + v1 + "<br>");
 document.write("v2: " + v2 + "<br>");
 document.write("v3: " + v3 + "<br>");
 document.write("v4: " + v4 + "<br>");
 document.write("v5: " + v5 + "<br>");
 document.write("l1: " + l1 + "<br>");
 document.write("l2: " + l2 + "<br>");
 document.write("l3: " + l3 + "<br>");
 document.write("l4: " + l4 + "<br>");
 document.write("l5: " + l5 + "<br>");
 document.write("C1: " + C1 + "<br>");
 document.write("C2: " + C2 + "<br>");
 document.write("C3: " + C3 + "<br>");
 document.write("C4: " + C4 + "<br>");
 document.write("C5: " + C5 + "<br><hr>");

 alert("v1: " + v1 + ", v2: " + v2);

 confirm("l1: " + l1 + "?");

 let l6 = prompt("Ваша мова програмування: ", l5);
 document.write("l3: " + l3 + "<br>");

 
// x = (type) => {
//     return new Promise(
//         (resolve, reject) => {
//             console.log("1111");
//             setTimeout(() => {
//                 if (type == 1) {
//                     resolve("33333");
//                 } else {
//                     reject("44444");
//                 }
//             }, 2000);
//         }
//     )
// }
// x(2).then((data) => {
//     console.log(data);
// }).catch((data) => {
//     console.log(data);
// });

// async function foo() {
//   const result1 = await new Promise((resolve) =>
//     setTimeout(() => resolve("1")),
//   );
//   console.log(result1);
//   const result2 = await new Promise((resolve) =>
//     setTimeout(() => resolve("2")),
//   );
//   console.log(result2);
// }
// foo();

const xx = async () => {
  return await new Promise((resolve) => {
    console.log("111111");
    setTimeout(() => resolve("1"), 2000);
  })
}

xx().then((data) => {
  console.log(data);
});
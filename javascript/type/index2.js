const icecream = {
  name: "체리쥬빌레",
  kcal: 500,
  flavor: "sweet",
  ingredients: ["cherry", "milk"],
  price: 3000,
  soldout: false,
};

console.log(icecream.kcal);
console.log(icecream.flavor);
console.log(icecream["flavor"]);
console.log(icecream.soldout);
console.log(icecream["soldout"]);

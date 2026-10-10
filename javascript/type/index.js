const conversionExamples = [
	["String(123)", String(123)],
	['Number("123")', Number("123")],
	['Number("안녕")', Number("안녕")],
	["Boolean(0)", Boolean(0)],
	['Boolean("false")', Boolean("false")],
	['parseInt("12px", 10)', parseInt("12px", 10)],
	['parseFloat("3.14원")', parseFloat("3.14원")],
	['"5" + 2', "5" + 2],
	['"5" - 2', "5" - 2],
];

const resultList = document.querySelector("#conversion-results");

for (const [expression, result] of conversionExamples) {
	const item = document.createElement("li");
	const code = document.createElement("code");
	const displayedResult = typeof result === "string" ? JSON.stringify(result) : String(result);
	code.textContent = `${expression} // ${displayedResult}`;
	item.append(code);
	resultList.append(item);
}

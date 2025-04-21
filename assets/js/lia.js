function calculate() {
    var salary = parseFloat(document.getElementById("salary").value);
    var days = parseFloat(document.getElementById("days").value);

    var impact = (salary * days) / 260.88 / 26;
    var totalCost = impact * 26;

    document.getElementById("result").innerHTML = "Impact on pay: Your biweekly paycheck will be reduced by $" + impact.toFixed(2) + " <br>The total cost of your leave will be $" + totalCost.toFixed(2);
}
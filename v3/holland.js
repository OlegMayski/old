let r = 0;
let a = 0;
let i_test = 0;
let s = 0;
let p = 0;
document.querySelector("#button2_form").onclick = () => {
    let i;
    for (i = 1; i <= 30; i++) {
        str = "#inputR" + i;
        str1= "#inputA" + i;
        str2= "#inputI" + i;
        str3= "#inputS" + i;
        str4= "#inputP" + i;
        let myCheckBox = document.querySelector(str);
        r += myCheckBox.checked;
        myCheckBox.checked = false;
        let myCheckBox1 = document.querySelector(str1);
        a += myCheckBox1.checked;
        myCheckBox1.checked = false;
        let myCheckBox2 = document.querySelector(str2);
        i_test += myCheckBox2.checked;
        myCheckBox2.checked = false;
        let myCheckBox3 = document.querySelector(str3);
        s += myCheckBox3.checked;
        myCheckBox3.checked = false;
        let myCheckBox4 = document.querySelector(str4);
        p += myCheckBox4.checked;
        myCheckBox4.checked = false;
        //console.log(document.querySelector(str));
    }
    console.log(document.querySelector("#inputR30").checked);
    console.log(r);
    document.querySelector("#main_form").style.display = "none";
    document.querySelector("#info-block2").style.display = "block";
    document.querySelector("#info-block2").innerHTML = `<div>Очков Р:${r}</div><div>Очков A:${a}</div><div>Очков И:${i_test}</div><div>Очков С:${s}</div><div>Очков С:${p}</div>`;
};
console.log("hi");

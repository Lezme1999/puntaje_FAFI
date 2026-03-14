function calcular(){
    let parcial1 = parseInt(document.getElementById("parcial1").value) || 0;
    let parcial2 = parseInt(document.getElementById("parcial2").value) || 0;
    let tp1      = parseInt(document.getElementById("TP1").value)      || 0;
    let tp2      = parseInt(document.getElementById("TP2").value)      || 0;
    let final    = parseInt(document.getElementById("final").value)    || 0;

    let puntajeParciales = parciales(parcial1, parcial2, tp1, tp2);
    let puntajeFinal = Exafinal(final);
    let resultado = puntajeParciales + puntajeFinal;

    let nota = 0;
    if      (resultado <= 59) nota = 1;
    else if (resultado <= 69) nota = 2;
    else if (resultado <= 80) nota = 3;
    else if (resultado <= 90) nota = 4;
    else                      nota = 5;

    document.getElementById("notaFinal").textContent =
        "Puntaje " + resultado + " → Nota: " + nota;
}

function parciales(parcial1, parcial2, tp1, tp2){
    let sumatoria = (parcial1 + parcial2 + tp1 + tp2) / 100;
    return Math.floor(sumatoria * 60);
}

function Exafinal(final){
    return Math.floor((final / 30) * 40);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("input[type='number']").forEach(input => {

        input.addEventListener("keydown", function (e) {
            if (e.key === "-" || e.key === "+" || e.key === "e") {
                e.preventDefault();
            }
            if (e.key === "Enter") {
                e.preventDefault();
                let inputs = Array.from(document.querySelectorAll("input[type='number']"));
                let index = inputs.indexOf(this);
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        input.addEventListener("input", function () {
            if (this.value < 0) this.value = 0;
            calcular();
        });

        input.addEventListener("blur", function () {
            let max = parseInt(this.getAttribute("max"));
            if (this.value > max) this.value = max;
            calcular();
        });
    });

    // ── Panel de temas ──
    document.getElementById("gear-btn").addEventListener("click", function () {
        document.getElementById("color-panel").classList.toggle("visible");
    });

    document.querySelectorAll(".color-option").forEach(option => {
        option.addEventListener("click", function () {
            const bg     = this.dataset.bg;
            const accent = this.dataset.accent;

            document.body.style.backgroundColor = bg;
            document.documentElement.style.setProperty("--accent", accent);
            document.documentElement.style.setProperty("--border", accent);
            document.documentElement.style.setProperty("--bg", bg);

            document.getElementById("color-panel").classList.remove("visible");
        });
    });
});

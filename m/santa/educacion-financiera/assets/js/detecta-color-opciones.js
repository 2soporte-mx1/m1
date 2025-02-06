$(document).ready(function () {
    $("#beneficios").click(function () {
        $("#beneficios").removeClass("noActiva").addClass("activa");
        $("#requisitos").removeClass("activa").addClass("noActiva");
        $("#comoObtenerla").removeClass("activa").addClass("noActiva");
        $("#activa").removeClass("activa").addClass("noActiva");
        $("#apoya").removeClass("activa").addClass("noActiva");
        $("#preguntas").removeClass("activa").addClass("noActiva");
    });
    $("#requisitos").click(function () {
        $("#requisitos").removeClass("noActiva").addClass("activa");
        $("#beneficios").removeClass("activa").addClass("noActiva");
        $("#comoObtenerla").removeClass("activa").addClass("noActiva");
        $("#activa").removeClass("activa").addClass("noActiva");
        $("#apoya").removeClass("activa").addClass("noActiva");
        $("#preguntas").removeClass("activa").addClass("noActiva");
    });
    $("#comoObtenerla").click(function () {
        $("#comoObtenerla").removeClass("noActiva").addClass("activa");
        $("#requisitos").removeClass("activa").addClass("noActiva");
        $("#beneficios").removeClass("activa").addClass("noActiva");
        $("#activa").removeClass("activa").addClass("noActiva");
        $("#apoya").removeClass("activa").addClass("noActiva");
        $("#preguntas").removeClass("activa").addClass("noActiva");

    });
    $("#activa").click(function () {
        $("#activa").removeClass("noActiva").addClass("activa");
        $("#comoObtenerla").removeClass("activa").addClass("noActiva");
        $("#requisitos").removeClass("activa").addClass("noActiva");
        $("#beneficios").removeClass("activa").addClass("noActiva");
        $("#apoya").removeClass("activa").addClass("noActiva");
        $("#preguntas").removeClass("activa").addClass("noActiva");
    });
    $("#apoya").click(function () {
        $("#apoya").removeClass("noActiva").addClass("activa");
        $("#activa").removeClass("activa").addClass("noActiva");
        $("#comoObtenerla").removeClass("activa").addClass("noActiva");
        $("#requisitos").removeClass("activa").addClass("noActiva");
        $("#beneficios").removeClass("activa").addClass("noActiva");
        $("#preguntas").removeClass("activa").addClass("noActiva");
    });
    $("#preguntas").click(function () {
        $("#preguntas").removeClass("noActiva").addClass("activa");
        $("#apoya").removeClass("activa").addClass("noActiva");
        $("#activa").removeClass("activa").addClass("noActiva");
        $("#comoObtenerla").removeClass("activa").addClass("noActiva");
        $("#requisitos").removeClass("activa").addClass("noActiva");
        $("#beneficios").removeClass("activa").addClass("noActiva");
    });
});
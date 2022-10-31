const InfoHtml = `<div id="info" class="bg-white h-screen w-[100%] grid grid-cols-10 grid-rows-10 hidden"><!--informace o comeniu-->
<div class="col-start-5 col-span-2 row-span-1 row-start-2 flex items-center justify-center"><!--nadpis a logo-->
    <h1 class='font-ubuntu text-[58px] text-ukrajinska font-bold'>
        Comenio
    </h1>
</div>
<div class="col-start-8 col-span-2 row-span-1 row-start-2 flex text-center items-center justify-center"><!--Zmena vlajecek-->
    <div class="mr-6 bg-blend-luminosity">
        <img src="./img/ua.png" id="vlajka1" data-jazyk="uk" class="w-16 border-2 border-comeniowhiteblue hover:border-sky-600">
    </div>
    <div class="mr-6 bg-blend-luminosity">
        <img src="./img/cz.png" id="vlajka2" data-jazyk="cz" class="w-16 border-2 border-comeniowhiteblue hover:border-sky-600">
    </div>
</div>
<div class="col-start-3 col-span-6 row-start-4 row-span-5 "><!--hlavni prostor-->
    <div class=""><!--obrazek-->
        <img src="./img/my.jpg" class="w-[60%] ml-[20%] justify-center">
    </div>
    <div class="justify-center px-16 mt-12"><!--text s informacemi-->
        <p id="textinfo" class="font-nunito text-black text-2xl text-center font-semi-bold">
            Webová aplikace Comenio pomáhá s integrací ukrajinských dětí nejen do výuky ve školách, ale dá se využít při jakékoliv komunikaci s lektorem, učitelem, vedoucím, školitelem či přednášejícím.

        </p>
    </div>
</div>
<div id="leve" class="col-start-2 col-span-1 row-start-9 row-span-1 bg-ukrajinska rounded-full h-24 w-24 justify-center items-center cursor-pointer hover:bg-comenioblue"><!--leve tlacitko-->
    <div class="">
        <svg class="h-16 w-16 mt-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
    </div>
</div>

<div id="startkviz" class="hidden col-start-5 col-span-2 row-start-9 row-span-1 flex justify-center items-center"><!--tlacitko start-->
    <div class="bg-ukrajinska w-44 h-16 rounded text-white text-2xl flex items-center justify-center hover:bg-comenioblue">
        Start kvízu
    </div>
</div>

<div id="prave" class="col-start-9 col-span-1 row-start-9 row-span-1 bg-ukrajinska rounded-full h-24 w-24 justify-center items-center cursor-pointer hover:bg-comenioblue"><!--prave tlacitko-->
    <div class="">
        <svg class="h-16 w-16 mt-4 ml-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          
    </div>
</div>
</div>
`

var KvizHtml = ``

var RozcestiHtml = ``
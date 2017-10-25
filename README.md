# Vue-ChartJs-Laravel

##Install

Download the Project from Github and unzip the file

Create a new laravel project with laravel new 'MyChart' or composer create-project --prefer-dist laravel/laravel 'MyChart'

Go into the new project folder 'MyChart' and replace the files mentioned below with those from the Github project in the following order:

1) Replace package.json from the root folder
2) Go into the folder ./resources/views and replace the file welcome.blade.php
3) Go into the folder ./resources/assets/js and Add the folder utils
   -> note that in utils there is two files : dateFormatter.js and downloadFormatter.js
4) Also here in ./resources/assets/js Replace app.js
4) Go into the folder ./resources/assets/js/components 
5) Replace Example.vue and Add LineChart.js
6) Install the packages with npm install 
7) Compile the css files and vue components with npm run dev or npm run watch-poll
8) Start the server with php artisan serve , by default the server starts on port http://localhost:8000

A live demo <a href="https://vuechart.000webhostapp.com/" >here</a> 
 

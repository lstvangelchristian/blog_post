<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
  </head>
  <body>
    
    <div class="container-fluid">

      <div class="row">

        <div class="col-3 shadow-sm">
          @include('partials.nav')
        </div>

        <div class="col-9 p-3">
          @yield('main-content')
        </div>

      </div>

    </div>

    @stack('scripts')
  </body>
</html>
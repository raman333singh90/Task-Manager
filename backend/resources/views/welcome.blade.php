<!-- resources/views/import.blade.php -->
<form method="POST" action="{{ route('csv.import') }}" enctype="multipart/form-data">
    @csrf
    <input type="file" name="csv_file" accept=".csv" required class="mb-2">
    <button type="submit" class="bg-blue-500 px-4 py-2 text-white">Import CSV</button>
</form>

@if(session('success'))
    <p class="text-green-600 mt-4">{{ session('success') }}</p>
@endif
@if(session('error'))
    <p class="text-red-600 mt-4">{{ session('error') }}</p>
@endif

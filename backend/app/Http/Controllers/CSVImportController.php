<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Str;

class CSVImportController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:51200', // Max 50MB
        ]);

        $file = $request->file('csv_file');
        $handle = fopen($file->getRealPath(), 'r');

        $header = fgetcsv($handle);

        if (!$header || count($header) > 1000) {
            return back()->with('error', 'Invalid CSV or too many columns (limit is 1000).');
        }

        $tableName = 'imported_' . time();

        // Dynamically create the table
        Schema::create($tableName, function (Blueprint $table) use ($header) {
            $table->id();
            foreach ($header as $column) {
                $columnName = Str::slug($column, '_');
                $table->text($columnName)->nullable(); // Use text for flexibility
            }
            $table->timestamps();
        });

        // Insert data
        $data = [];
        while (($row = fgetcsv($handle)) !== false) {
            $rowAssoc = [];
            foreach ($header as $index => $colName) {
                $column = Str::slug($colName, '_');
                $rowAssoc[$column] = $row[$index] ?? null;
            }
            $data[] = $rowAssoc;

            // Batch insert every 500 rows
            if (count($data) === 500) {
                DB::table($tableName)->insert($data);
                $data = [];
            }
        }

        if (!empty($data)) {
            DB::table($tableName)->insert($data);
        }

        fclose($handle);

        return back()->with('success', 'CSV imported successfully into table: ' . $tableName);
    }
}

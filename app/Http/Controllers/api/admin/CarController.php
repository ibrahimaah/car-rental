<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Error;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['code'=> 1,'data'=> Car::all()],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        if ($request->hasFile('photo')) 
        {

            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName); 

            $carRequest = $request->all();
            $carRequest['photo'] = $imageName;
            $carRequest['available'] = $carRequest['available'] == 'Yes' ? 1 : 0;

            Car::create($carRequest);
            
            return response()->json(['code' => 1 , 'data' => 'A New Car is added successfully'], 200);
        } else {
            return response()->json(['code' => 0], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   
        $car = Car::find($id);

        $car->brand = $request->brand;
        $car->fuel_type = $request->fuel_type;
        $car->gearbox = $request->gearbox;
        $car->model = $request->model;
        $car->price = $request->price;
        $car->available = $request->available == 'Yes' ? 1 : 0;

        if ($request->hasFile('photo')) {

            if(file_exists(public_path("images/$car->photo")))
            {
                unlink(public_path("images/$car->photo"));
            }

            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName); 
        
            $car->photo = $imageName;
        }
        
        
        if($car->save())
        {
            return response()->json(['code' => 1 , 'data' => 'Updated successfully'], 200);
        }
        return response()->json(['code' => 0], 400);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::find($id);
        
        if(file_exists(public_path("images/$car->photo")))
        {
            unlink(public_path("images/$car->photo"));
            $car->delete();
            return response()->json(['code' => 1 , 'data' => 'Deleted successfully'], 200);
        }
        return response()->json(['code' => 0], 400);
    }
}

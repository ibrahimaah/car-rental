import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import {  Button,
          Container,
          FormControl,
          InputLabel,
          MenuItem,
          Select,
          TextField,
          Typography
      } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { MuiFileInput } from 'mui-file-input'
import MAIN_ENDPOINT from '../../constants';
import axios from 'axios';
import { CarType } from './Cars';
import { ERROR_REQUIRED_MSG, FormValuesTypes } from './AddCar';
import { useForm,Controller } from 'react-hook-form';

type EditCarPropsType = {
    drawState : boolean
    handleDrawState : (drawState:boolean,id?:number) => void
    setIsProgress : (isProgress:boolean) => void
    selectedCar : CarType
} | {}

export default function EditCar(props:EditCarPropsType) {
    
  if ('drawState' in props && 'handleDrawState' in props) {
    
    const { drawState, handleDrawState, setIsProgress,selectedCar} = props;

    const addCarForm = useForm<FormValuesTypes>({
      defaultValues: {
        photo: null,
        brand: selectedCar?.brand,
        fuelType: selectedCar?.fuel_type,
        gearBox: selectedCar?.gearbox,
        model: selectedCar?.model,
        price: selectedCar?.price,
        isAvailable: selectedCar?.available == 1 ? 'Yes' : 'No'
      }
    });
    
    const { register,control, handleSubmit, formState:{errors}} = addCarForm;



  // const navigate = useNavigate()
  // const [photo, setPhoto] = useState<File | null>(null);
 
  // const [brand,setBrand] = useState(selectedCar?.brand);
  // const [fuelType,setFuelType] = useState(selectedCar?.fuel_type);
  // const [gearBox,setGearBox] = useState(selectedCar?.gearbox);
  // const [model,setModel] = useState(selectedCar?.model);
  // const [price,setPrice] = useState(selectedCar?.price+'');
  // const [isAvailable,setIsAvailable] = useState(selectedCar?.available == 1 ? 'Yes' : 'No');


  // const handleChangePhoto = (newPhoto: File | null) => {
  //   setPhoto(newPhoto)  
  // };
  const onSubmit = (data:FormValuesTypes) => {
    setIsProgress(true)
    
    const formData = new FormData();
    formData.append('photo', data.photo);
    formData.append('brand', data.brand);
    formData.append('fuel_type', data.fuelType);
    formData.append('gearbox', data.gearBox);
    formData.append('model', data.model);
    formData.append('price', data.price.toString());
    formData.append('available', data.isAvailable);

    axios.post(`${MAIN_ENDPOINT}cars/update/${selectedCar.id}`,formData)
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => {console.log(err)})
    .finally(()=>{setIsProgress(false)})
  }

 
  return (
    <div>
      
        <React.Fragment>
          

          <Drawer
            anchor="left"
            transitionDuration={500}
            open={drawState}
            onClose={()=>handleDrawState(false,selectedCar.id)}
            PaperProps={{
              sx: { width: "300px" },
            }}
          >
          
            <Container>
              <List>
                  
                  <ListItem disablePadding>
                  <Typography variant="h5" align='center' sx={{marginBottom:'10px'}}  color="primary">
                    Edit A Car
                  </Typography>
                  </ListItem>
               
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ListItem disablePadding>
                    <TextField 
                          sx={{marginBottom:'10px'}} 
                          label="Brand" 
                          variant="outlined" 
                          fullWidth 
                          { ...register('brand',{
                            required: true,
                          }) }
                          error={!!errors.brand}
                          helperText={errors.brand && ERROR_REQUIRED_MSG}
                      />
                  </ListItem>
                  
                  <ListItem disablePadding>

                    <FormControl fullWidth style={{marginBottom:'10px'}}>
                      <InputLabel>Fuel Type</InputLabel>
                      <Select
                        label="Fuel Type"
                        { ...register('fuelType',{
                          required: true,
                        }) }
                        error={!!errors.fuelType}
                        defaultValue={selectedCar?.fuel_type}
                      >
                        <MenuItem value='diesel'>Diesel</MenuItem>
                        <MenuItem value='petrol'>Petrol</MenuItem>
                      </Select>
                      <span className='error_msg'>{errors.brand && ERROR_REQUIRED_MSG}</span>
                    </FormControl> 

                    
                  </ListItem>

                  <ListItem disablePadding>
                    <FormControl fullWidth style={{marginBottom:'10px'}}>
                      <InputLabel>Gear Box</InputLabel>
                      <Select
                        { ...register('gearBox',{required:true}) }
                        error={!!errors.gearBox}
                        defaultValue={selectedCar?.gearbox}
                        label="Gear Box"
                      >
                        <MenuItem value='automatic'>Automatic</MenuItem>
                        <MenuItem value='manuel'>Manuel</MenuItem>
                      </Select>
                      <span className='error_msg'>{errors.gearBox && ERROR_REQUIRED_MSG}</span>
                    </FormControl>
                  </ListItem>

                  <ListItem disablePadding>
                      <TextField 
                        { ...register('model',{required:true}) }
                        error={!!errors.model}
                        sx={{marginBottom:'10px'}} 
                        label="Model" 
                        variant="outlined" 
                        fullWidth 
                        helperText={errors.model && ERROR_REQUIRED_MSG}
                      />
                      
                  </ListItem>

                  <ListItem disablePadding>
                      <TextField 
                        { ...register('price',{required:true}) }
                        error={!!errors.price}
                        sx={{marginBottom:'10px'}} 
                        label="Price" 
                        variant="outlined" 
                        fullWidth 
                        helperText={errors.price && ERROR_REQUIRED_MSG}
                      />
                  </ListItem>

                  <ListItem disablePadding>

                    <FormControl fullWidth>
                      <InputLabel>Available</InputLabel>
                      <Select
                        { ...register('isAvailable',{required:true}) }
                        error={!!errors.isAvailable}
                        defaultValue={selectedCar?.available == 1 ? 'Yes' : 'No'}
                        label="Available"
                      >
                        <MenuItem value='Yes'>Yes</MenuItem>
                        <MenuItem value='No'>No</MenuItem>
                      </Select>
                      <span className='error_msg'>{errors.isAvailable && ERROR_REQUIRED_MSG}</span>
                    </FormControl>

                  </ListItem>

                  <ListItem disablePadding>
                    

                    <Controller
                      name="photo"
                      control={control}
                      rules={{ validate: (value) => {
                        if (!value) {
                          return true
                        }
                        if (!value?.type.includes("image")) {
                          return "File type must be an image";
                        }
                        return true;
                      } }}
                      render={({ field, fieldState }) => (
                        <MuiFileInput
                          placeholder="Upload a car photo"
                          {...field }
                          inputProps={{ accept: '.png, .jpeg, .jpg, .jfif' }}
                          InputProps={{
                            startAdornment: <AttachFileIcon />
                          }}
                          sx={{width:'100%',marginBottom:'10px',marginTop:'10px'}}
                          helperText={fieldState.invalid ? fieldState.error?.message : ""}
                          error={fieldState.invalid}
                        />
                      )}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                      <Button type="submit" variant='contained'>Save</Button>
                  </ListItem>
                </form>
              </List>
            </Container>


          </Drawer>
        </React.Fragment>
      
    </div>
  );
  }
}
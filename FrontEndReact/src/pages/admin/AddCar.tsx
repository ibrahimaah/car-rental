
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import React from 'react';
import { Button,
         Container,
         FormControl,
         InputLabel,
         MenuItem,
         Select,
         TextField,
         Typography } from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile'
import { MuiFileInput } from 'mui-file-input'
import MAIN_ENDPOINT from '../../constants';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

type AddCarPropsType = {
    drawState : boolean
    handleDrawState : (drawState:boolean) => void
    setIsProgress : (isProgress:boolean) => void
} | {}

export type FormValuesTypes = {
  brand : string
  fuelType : string 
  gearBox : string 
  model : string 
  price : number 
  isAvailable: 'Yes' | 'No' | ''
  photo : File | null
}

export const ERROR_REQUIRED_MSG = 'This field is required'

export default function AddCar(props:AddCarPropsType) {

  if ('drawState' in props && 'handleDrawState' in props) {

    const addCarForm = useForm<FormValuesTypes>();
    const { register,control, handleSubmit, formState:{errors}} = addCarForm;

  const { drawState, handleDrawState, setIsProgress } = props;

  const onSubmit = (data:FormValuesTypes) => {
      setIsProgress(true)
      if (data.photo) {
      
          const formData = new FormData();
          formData.append('photo', data.photo);
          formData.append('brand', data.brand);
          formData.append('fuel_type', data.fuelType);
          formData.append('gearbox', data.gearBox);
          formData.append('model', data.model);
          formData.append('price', data.price.toString());
          formData.append('available', data.isAvailable);

          axios.post(`${MAIN_ENDPOINT}cars/store`,formData)
          .then(res => {
            console.log(res.data.data)
          })
          .catch(err => {console.log(err)})
          .finally(()=>{setIsProgress(false)})
        
        
      }else{
        alert('add photo please')
      }
  };
  return (
    <div>
      
        <React.Fragment>
          

          <Drawer
            anchor="right"
            transitionDuration={500}
            open={drawState}
            onClose={()=>handleDrawState(false)}
            PaperProps={{
              sx: { width: "300px" },
            }}
          >
          
            <Container>
              <List>
                  
                <Typography 
                  variant="h5" 
                  align='center' 
                  sx={{marginBottom:'10px'}}  
                  color="primary">
                  Add New Car
                </Typography>

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
                      rules={{ required: "File is required", validate: (value) => {
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
                      <Button type="submit" variant='contained'>Add</Button>
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